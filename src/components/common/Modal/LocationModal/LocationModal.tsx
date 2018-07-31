import React from 'react';
import Modal from 'components/common/Modal/Modal';
import CancelFormModal from 'components/common/Modal/CancelFormModal';
import LocationForm from './LocationForm';
import withPromise from 'helpers/withPromise';
import get from 'lodash.get';
import uuid from 'uuid/v4';
import { Button } from 'components/common/Button/Button';
import { getLocationCollaborators } from 'reducers/locations/location/reducer';
import { connect } from 'react-redux';
import { locationCollaboratorsSelector } from 'reducers/locations/location/selectors';
import { createSelector } from 'reselect';

interface IProps {
  edit?: boolean;
  initialValues?: ILocationData;
  isOpen: boolean;
  onClose(): void;
  onSubmit(values: ILocationData, promise?: IPromiseCallback): IAction;
  getLocationCollaborators(id: string, promise?: IPromiseCallback): IAction;
  collaborators: ICollaboratorData[];
}

interface IState {
  isCancelModalOpen: boolean;
  isSecondaryModalExiting: boolean;
  submitting: boolean;
  collaboratorsListIsOpen: boolean;
  name: string;
  description: string;
  collaborator_ids: string[];
  [other: string]: any;
  isNameSkipped?: boolean;
  isDescriptionSkipped?: boolean;
}

class LocationModal extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isCancelModalOpen: false,
      isSecondaryModalExiting: false,
      name: get(props.initialValues, 'name', ''),
      description: get(props.initialValues, 'description', ''),
      collaborator_ids: [],
      submitting: false,
      collaboratorsListIsOpen: false,
      isNameSkipped: false,
      isDescriptionSkipped: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      initialValues,
      edit,
      getLocationCollaborators,
      collaborators,
    } = this.props;
    if (initialValues && !prevProps.initialValues && edit) {
      getLocationCollaborators(initialValues.public_id);
    }

    if (initialValues && !prevProps.initialValues) {
      this.setState({
        name: get(initialValues, 'name', ''),
        description: get(initialValues, 'description', ''),
      });
    }

    if (collaborators.length && !prevProps.collaborators.length) {
      this.setState({
        collaborator_ids: collaborators.map((col) => col.public_id),
      });
    }
  }

  onSubmit = () => {
    const { name, description, collaborator_ids } = this.state;
    const { initialValues, onSubmit } = this.props;

    if (name && description) {
      this.setState({
        submitting: true,
      });

      return withPromise(onSubmit, {
        name,
        description,
        collaborator_ids,
        public_id: get(initialValues, 'public_id', uuid()),
      })
        .then((res?: ISubmitFormError) => {
          this.setState({
            submitting: false,
          });
          if (res && res.error) return Promise.resolve(res);
          this.closeModal();
        })
        .catch(() => {
          this.setState({
            submitting: false,
          });
        });
    }

    if (!name) {
      this.setState({
        isNameSkipped: true,
      });
    }

    if (!description) {
      this.setState({
        isDescriptionSkipped: true,
      });
    }

    // Reset validator warnings
    setTimeout(() => {
      this.setState({
        isNameSkipped: false,
        isDescriptionSkipped: false,
      });
    }, 2000);
  };

  private changeState = (field, newValue) => () => {
    this.setState({ [field]: newValue });
  };

  private closeModal = () => {
    const { onClose } = this.props;
    const { isCancelModalOpen } = this.state;

    this.setState({
      isCancelModalOpen: false,
      isSecondaryModalExiting: isCancelModalOpen,
    });
    onClose();
  };

  private onSecondaryModalExited = () => {
    this.setState({ isSecondaryModalExiting: false });
  };

  private onCancel = () => {
    const { name, description, collaborator_ids } = this.state;
    if (name || description || collaborator_ids.length > 0) {
      this.setState({ isCancelModalOpen: true });
    } else {
      this.closeModal();
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleCollaboratorsList = () => {
    this.setState(({ collaboratorsListIsOpen }) => ({
      collaboratorsListIsOpen: !collaboratorsListIsOpen,
    }));
  };

  updateCollaboratorsList = (e) => {
    const { collaborator_ids } = this.state;

    if (!collaborator_ids.includes(e.target.id)) {
      this.setState({
        collaborator_ids: collaborator_ids.concat(e.target.id),
      });
    } else {
      this.setState({
        collaborator_ids: collaborator_ids.filter((x) => x !== e.target.id),
      });
    }
  };

  clearCollaboratorsList = () => {
    this.setState({
      collaborator_ids: [],
      collaboratorsListIsOpen: false,
    });
  };

  private renderSecondaryModals = () => {
    const { isOpen } = this.props;
    const { isCancelModalOpen, isSecondaryModalExiting } = this.state;

    return (
      <>
        <CancelFormModal
          isOpen={isOpen && isCancelModalOpen}
          onCancel={this.changeState('isCancelModalOpen', false)}
          onContinue={this.closeModal}
          onTransitionEnd={
            isSecondaryModalExiting ? this.onSecondaryModalExited : null
          }
        />
      </>
    );
  };

  render() {
    const { edit, initialValues, isOpen } = this.props;
    const {
      isCancelModalOpen,
      isSecondaryModalExiting,
      collaboratorsListIsOpen,
      collaborator_ids,
      submitting,
      isNameSkipped,
      isDescriptionSkipped,
    } = this.state;
    const isPrimaryModalHidden = isCancelModalOpen || isSecondaryModalExiting;
    const action = edit ? 'Edit' : 'Add';

    return (
      <>
        <Modal
          isOpen={isOpen}
          hide={isPrimaryModalHidden}
          className="-no-overflow"
          actions={
            <>
              <Button
                type="button"
                onClick={this.onCancel}
                className="btn btn-inventor btn-white"
              >
                <img
                  className="header-plus"
                  src="/images/cancel.svg"
                  alt="cancel"
                />
                <span className="title-header-btn">Cancel</span>
              </Button>
              <Button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-inventor btn-lime"
                disabled={submitting}
              >
                {!edit && (
                  <img
                    className="header-plus"
                    src="/images/plus.svg"
                    alt="plus"
                  />
                )}
                <span className="title-header-btn">{action} location</span>
              </Button>
            </>
          }
          title={`${action} location`}
        >
          <LocationForm
            edit={edit}
            handleSubmit={this.onSubmit}
            onChange={this.onChange}
            collaboratorsListIsOpen={collaboratorsListIsOpen}
            toggleCollaboratorsList={this.toggleCollaboratorsList}
            collaborator_ids={collaborator_ids}
            updateCollaboratorsList={this.updateCollaboratorsList}
            clearCollaboratorsList={this.clearCollaboratorsList}
            initialValues={initialValues}
            isNameSkipped={isNameSkipped}
            isDescriptionSkipped={isDescriptionSkipped}
          />
        </Modal>
        {this.renderSecondaryModals()}
      </>
    );
  }
}

const enhance: any = connect(
  createSelector(locationCollaboratorsSelector, (collaborators) => ({
    collaborators,
  })),
  {
    getLocationCollaborators,
  }
);

export default enhance(LocationModal);
