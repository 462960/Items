import React, { PureComponent } from 'react';
import { Button } from 'components/common/Button/Button';
import CollaboratorModal from 'components/common/Modal/CollaboratorModal/CollaboratorModal';
import { createCollaborator } from 'reducers/collaborators/collaborator/reducer';
import { connect } from 'react-redux';

interface IProps {
  createCollaborator(
    values: ICollaboratorData,
    promise: IPromiseCallback
  ): IAction;
}

interface IState {
  isCollaboratorModalOpen: boolean;
}

class CollaboratorsTableEmptyState extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isCollaboratorModalOpen: false,
    };
  }

  toggleModal = (isOpen) => () => {
    this.setState({
      isCollaboratorModalOpen: isOpen,
    });
  };

  render() {
    const { createCollaborator } = this.props;
    const { isCollaboratorModalOpen } = this.state;

    return (
      <div className="wrap-page-letter wrap-page-letter--no-items">
        <CollaboratorModal
          isOpen={isCollaboratorModalOpen}
          onSubmit={createCollaborator}
          onClose={this.toggleModal(false)}
        />
        <div className="page-letter-block">
          <div className="page-letter-block-box-img">
            <img
              className="page-letter-block-img"
              src="/images/monitor-barcode.png"
              alt="barcode"
            />
          </div>
          <h1 className="header-title title-pb">No collaborators yet</h1>
          <div className="button-centr">
            <Button
              className="btn btn-inventor btn-lime"
              onClick={this.toggleModal(true)}
            >
              <img className="header-plus" src="/images/plus.svg" alt="plus" />
              <span className="title-header-btn">Create collaborator</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const enhance = connect(null, { createCollaborator });

export default enhance(CollaboratorsTableEmptyState);
