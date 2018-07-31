import React from 'react';
import Button from 'components/common/Button/Button';
import AddTaskContainer from 'components/common/Modal/AddTaskModal/AddTaskContainer';

interface IState {
  isAddTaskOpen: boolean;
  isCancelFormModalOpen: boolean;
  isPrimaryModalHidden: boolean;
}

class Planning extends React.PureComponent<IWithRouter, IState> {
  state = {
    isAddTaskOpen: false,
    isCancelFormModalOpen: false,
    isPrimaryModalHidden: false,
  };

  openAddTaskModalHandler = () => {
    this.setState({
      isAddTaskOpen: true,
    });
  };

  cancelFormModalHandler = () => {
    this.setState(({ isCancelFormModalOpen, isPrimaryModalHidden }) => ({
      isCancelFormModalOpen: !isCancelFormModalOpen,
      isPrimaryModalHidden: !isPrimaryModalHidden,
    }));
  };

  closeCancelModal = () => {
    this.setState({
      isCancelFormModalOpen: false,
      isAddTaskOpen: false,
      isPrimaryModalHidden: false,
    });
  };

  render() {
    return (
      <div className="page-content">
        <div>
          <Button
            className="btn btn-inventor btn-lime m-t-15 m-l-15"
            onClick={this.openAddTaskModalHandler}
          >
            <img className="header-plus" src="/images/plus.svg" alt="plus" />
            <span className="title-header-btn">New Task</span>
          </Button>
        </div>
        <AddTaskContainer
          {...this.state}
          cancelFormModalHandler={this.cancelFormModalHandler}
          closeCancelModal={this.closeCancelModal}
        />
      </div>
    );
  }
}

export default Planning;
