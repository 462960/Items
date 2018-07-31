import React from 'react';
import CollaboratorModal from 'components/common/Modal/CollaboratorModal/CollaboratorModal';
import RemoveConfirmModal from 'components/common/Modal/RemoveConfirmModal';
import TopSection from 'components/common/TopSection/TopSection';
import withPromise from 'helpers/withPromise';
import { createSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import {
  getCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from 'reducers/collaborators/collaborator/reducer';
import { collaboratorSelector } from 'reducers/collaborators/collaborator/selectors';
import Items from './Items/Items';

interface IProps extends IWithRouter {
  getCollaborator(id: string, promise?: IPromiseCallback): IAction;
  currentCollaborator: ICollaboratorData;
  updateCollaborator(
    data: ICollaboratorData,
    promise: IPromiseCallback
  ): IAction;
  deleteCollaborator(id: string, promise: IPromiseCallback): IAction;
}

interface IState {
  collaboratorId: string;
  isEditCollaboratorModalOpen: boolean;
  isRemoveCollaboratorModalOpen: boolean;
}

class CollaboratorShow extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      collaboratorId: get(props.match, 'params.id'),
      isEditCollaboratorModalOpen: false,
      isRemoveCollaboratorModalOpen: false,
    };
  }

  componentDidMount() {
    const { getCollaborator } = this.props;
    const { collaboratorId } = this.state;
    getCollaborator(collaboratorId);
  }

  private changeEditModalState = (value: boolean) => () => {
    this.setState({
      isEditCollaboratorModalOpen: value,
    });
  };

  private changeRemoveModalState = (value: boolean) => () => {
    this.setState({
      isRemoveCollaboratorModalOpen: value,
    });
  };

  private renderTopSectionContent = () => {
    const { currentCollaborator, history } = this.props;
    return (
      <>
        <div className="df-sb">
          <button className="style-btn-non" onClick={history.goBack}>
            <svg className="svg-arrow-r svg-arrow-r--gray">
              <use xlinkHref="/images/sprite.svg#left-arrow" />
            </svg>
            <span className="header-search">Back</span>
          </button>
          <div className="d-flex align-items-center">
            <button
              className="p-r-10 style-btn-non"
              onClick={this.changeEditModalState(true)}
            >
              <svg className="svg-small-icon">
                <use xlinkHref="/images/sprite.svg#pen-new" />
              </svg>
            </button>
            <button
              className="p-r-10 style-btn-non"
              onClick={this.changeRemoveModalState(true)}
            >
              <svg className="svg-small-icon">
                <use xlinkHref="/images/sprite.svg#cart-trash" />
              </svg>
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="p-r-30">
            <img
              className="avatar-colaborator"
              src="/images/vg.jpg"
              alt="account-avatar"
            />
          </div>
          <div className="d-flex-c--c w-100">
            <div className="df-sb bord-b-gray--colab">
              <div>
                <p className="header-title m-b-0">{currentCollaborator.name}</p>
                <span className="text-list">
                  {currentCollaborator.position || '-'}
                </span>
              </div>
              <div className="d-flex-c--c al-i-fl-end p-t-10">
                <span className="header-text">
                  {currentCollaborator.birthday || '-'}
                </span>
                <span className="header-text">
                  {currentCollaborator.items_count || '?'} Items
                </span>
              </div>
            </div>
            <div className="df-sb p-t-10-colaborator">
              <div className="w-50">
                <ul className="list-horizont">
                  <li>
                    <span className="text-gray-light">Phone:</span>
                    <span className="title-mk--light">
                      {currentCollaborator.phone_number || '-'}
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-light">Birthday:</span>
                    <span className="title-mk--light">
                      {currentCollaborator.birthday || '-'}
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-light">Email:</span>
                    <span className="title-mk--light">
                      {currentCollaborator.email || '-'}
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-light">Code:</span>
                    <span className="title-mk--light">
                      {currentCollaborator.code || '000'}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-list">
                  Last update:{' '}
                  {currentCollaborator.updated_at || 'once upon a time'} by{' '}
                  {currentCollaborator.updated_by || 'Anonym'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  private onDelete = () => {
    const { deleteCollaborator, history, currentCollaborator } = this.props;
    return withPromise(deleteCollaborator, currentCollaborator.public_id)
      .then(() => {
        this.changeRemoveModalState(false);
        history.replace('/structure/collaborators');
      })
      .catch(() => {
        this.changeRemoveModalState(false);
      });
  };

  private renderModals = () => {
    const {
      updateCollaborator,
      deleteCollaborator,
      currentCollaborator,
    } = this.props;
    const {
      isEditCollaboratorModalOpen,
      isRemoveCollaboratorModalOpen,
    } = this.state;

    const initialFormData = {
      name: currentCollaborator.name,
      public_id: currentCollaborator.public_id,
      phone_number: currentCollaborator.phone_number,
      email: currentCollaborator.email,
      birthday: currentCollaborator.birthday,
      position: currentCollaborator.position,
      location: get(currentCollaborator, 'location.public_id'),
    };

    return (
      <>
        <CollaboratorModal
          key="edit"
          edit
          isOpen={isEditCollaboratorModalOpen}
          initialValues={initialFormData}
          onDelete={deleteCollaborator}
          onSubmit={updateCollaborator}
          onClose={this.changeEditModalState(false)}
        />
        <RemoveConfirmModal
          isOpen={isRemoveCollaboratorModalOpen}
          onCancel={this.changeRemoveModalState(false)}
          onContinue={this.onDelete}
        />
      </>
    );
  };

  render() {
    const { collaboratorId } = this.state;

    return (
      <>
        <TopSection className="p-t-back">
          {this.renderTopSectionContent()}
        </TopSection>

        {this.renderModals()}

        <Items collaboratorId={collaboratorId} />
      </>
    );
  }
}

const enhance = compose<React.ComponentClass<{}>>(
  connect(
    createSelector(collaboratorSelector, (currentCollaborator) => ({
      currentCollaborator,
    })),
    {
      getCollaborator,
      updateCollaborator,
      deleteCollaborator,
    }
  )
);

export default enhance(CollaboratorShow);
