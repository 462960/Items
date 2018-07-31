import React from 'react';
import AddTask from 'components/common/Modal/AddTaskModal/AddTask';
import Modal from 'components/common/Modal/Modal';
import CancelFormModal from 'components/common/Modal/CancelFormModal';
import { createTask, fetchInventories } from 'reducers/createTask/reducer';
import { fetchUsers } from 'reducers/usersList/reducer';
import { fetchTasksStatuses } from 'reducers/statuses/tasksStatusesList/reducer';
import uuid from 'uuid/v4';
import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import dateConverter from 'helpers/dateConverter';
import { CSSTransition } from 'react-transition-group';

interface IState {
  isNotificationAdded?: boolean;
  isDateOpen?: boolean;
  isDeadlineOpen?: boolean;
  isDateChoiceCorrect?: boolean;
  isDeadlineChoiceCorrect?: boolean;
  isDateSkipped?: boolean;
  isDeadlineSkipped?: boolean;
  pickDateFirst?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
  currentDate?: object;
  currentDateDeadline?: object;
  deadline?: string;
  assignee?: string;
  status?: string;
  inventory?: string;
  date?: any;
}

class AddTaskContainer extends React.Component<any, IState> {
  state = {
    isNotificationAdded: true,
    isDateOpen: false,
    isDeadlineOpen: false,
    isDateChoiceCorrect: true,
    isDeadlineChoiceCorrect: true,
    isDateSkipped: false,
    isDeadlineSkipped: false,
    pickDateFirst: false,
    disabled: false,
    title: '',
    description: '',
    currentDate: new Date(),
    currentDateDeadline: new Date(),
    date: '',
    deadline: '',
    assignee: '',
    status: '',
    inventory: '',
  };

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchInventories();
    this.props.fetchTasksStatuses();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onBlur = () => {
    this.setState({
      isDateOpen: false,
      isDeadlineOpen: false,
      disabled: false,
    });
  };

  pickDate = (currentDate) => {
    // global.console.log('I am AddTask pickData');
    this.setState(
      () => ({
        currentDate,
      }),
      () => {
        const { currentDate, currentDateDeadline, deadline } = this.state;
        if (
          (currentDateDeadline >= currentDate && !isEmpty(deadline)) ||
          isEmpty(deadline)
        ) {
          this.setState({
            date: dateConverter(currentDate),
            isDateOpen: false,
            isDateSkipped: false,
            disabled: false,
          });
        } else {
          this.setState({ isDateChoiceCorrect: false });
          setTimeout(() => {
            this.setState({
              isDateChoiceCorrect: true,
            });
          }, 2000);
        }
      }
    );
  };

  pickDeadLine = (currentDate) => {
    this.setState(
      () => ({ currentDateDeadline: currentDate }),
      () => {
        if (this.state.currentDateDeadline >= this.state.currentDate) {
          this.setState({
            deadline: dateConverter(currentDate),
            isDeadlineSkipped: false,
            isDeadlineOpen: false,
            disabled: false,
          });
        } else {
          this.setState({ isDeadlineChoiceCorrect: false });
          setTimeout(() => {
            this.setState({
              isDeadlineChoiceCorrect: true,
            });
          }, 2000);
        }
      }
    );
  };

  toggleTogglable = (e) => {
    this.setState({
      [e.target.id]: !this.state[e.target.id],
    });
  };

  resetDatepicker = (e) => {
    if (e.target.id === 'deadlineReset') {
      this.setState({
        deadline: '',
        isDeadlineOpen: false,
        disabled: false,
      });
    } else {
      this.setState({
        date: '',
        isDateOpen: false,
        disabled: false,
      });
    }
  };

  openDatepickers = (e) => {
    const { isDateOpen, isDeadlineOpen, date } = this.state;
    if (e.target.id === 'isDateOpen') {
      this.setState({
        isDateOpen: true,
        isDeadlineOpen: false,
        disabled: true,
      });
    }
    if (e.target.id === 'isDateOpen' && isDateOpen === true) {
      this.setState({
        isDateOpen: false,
        isDateSkipped: true,
        disabled: false,
      });
    }

    if (e.target.id === 'isDeadlineOpen' && date.length > 0) {
      this.setState({
        isDeadlineOpen: true,
        isDateOpen: false,
        disabled: true,
      });
    } else if (e.target.id === 'isDeadlineOpen' && date.length === 0) {
      this.setState({
        pickDateFirst: true,
      });
      setTimeout(() => {
        this.setState({
          pickDateFirst: false,
        });
      }, 2000);
    }

    if (e.target.id === 'isDeadlineOpen' && isDeadlineOpen === true) {
      this.setState({
        isDeadlineOpen: false,
        isDeadlineSkipped: true,
        disabled: false,
      });
    }
  };

  validateForm = () => {
    const { date, deadline } = this.state;

    if (isEmpty(date)) {
      this.setState({
        isDateSkipped: true,
      });
    }

    if (isEmpty(deadline)) {
      this.setState({
        isDeadlineSkipped: true,
      });
    }

    if (isEmpty(date) && isEmpty(deadline)) {
      this.setState({
        isDateSkipped: true,
        isDeadlineSkipped: true,
      });
    }

    document
      .getElementById('addTaskForm')
      .dispatchEvent(new Event('submit', { cancelable: true }));
  };

  handleSubmit = () => {
    const { closeCancelModal, createTask } = this.props;

    const {
      title,
      description,
      date,
      deadline,
      assignee,
      status,
      inventory,
    } = this.state;

    const public_id = uuid();

    if (!isEmpty(date) && !isEmpty(deadline)) {
      createTask({
        title,
        description,
        date,
        deadline,
        assignee,
        status,
        inventory,
        public_id,
      });
      closeCancelModal();
      this.setState({
        title: '',
        description: '',
        date: '',
        deadline: '',
        assignee: '',
        status: '',
        inventory: '',
      });
    }
  };

  clearFormOnCancelConfirm = () => {
    this.setState({
      title: '',
      description: '',
      date: '',
      deadline: '',
      assignee: '',
      status: '',
      inventory: '',
      isDateOpen: false,
      isDeadlineOpen: false,
      disabled: false,
    });
    this.props.closeCancelModal();
  };

  render() {
    const {
      isAddTaskOpen,
      isPrimaryModalHidden,
      cancelFormModalHandler,
      isCancelFormModalOpen,
      usersList,
      inventoriesList,
      tasksStatusesList,
    } = this.props;

    const { isDateChoiceCorrect, isDeadlineChoiceCorrect } = this.state;

    return (
      <>
        <CancelFormModal
          isOpen={isCancelFormModalOpen}
          onCancel={cancelFormModalHandler}
          onContinue={this.clearFormOnCancelConfirm}
        />
        <Modal
          isOpen={isAddTaskOpen}
          hide={isPrimaryModalHidden}
          actions={
            <>
              <button
                type="button"
                onClick={cancelFormModalHandler}
                className="btn btn-inventor btn-white"
              >
                <img
                  className="header-plus"
                  src="/images/cancel.svg"
                  alt="cancel"
                />
                <span className="title-header-btn">Cancel</span>
              </button>
              <button
                type="button"
                onClick={this.validateForm}
                className="btn btn-inventor btn-lime"
              >
                <img
                  className="header-plus"
                  src="/images/plus.svg"
                  alt="plus"
                />
                <span className="title-header-btn">Create task</span>
              </button>
            </>
          }
          title={'Add task'}
        >
          <CSSTransition
            in={!isDateChoiceCorrect}
            classNames="fade"
            timeout={650}
          >
            {!isDateChoiceCorrect ? (
              <div className="add_task-notification">
                Date should be before deadline{' '}
              </div>
            ) : (
              <div />
            )}
          </CSSTransition>
          <CSSTransition
            in={!isDeadlineChoiceCorrect}
            classNames="fade"
            timeout={650}
          >
            {!isDeadlineChoiceCorrect ? (
              <div className="add_task-notification">
                Deadline should not be before the date{' '}
              </div>
            ) : (
              <div />
            )}
          </CSSTransition>
          <AddTask
            {...this.state}
            usersList={usersList}
            tasksStatusesList={tasksStatusesList}
            inventoriesList={inventoriesList}
            toggleTogglable={this.toggleTogglable}
            resetDatepicker={this.resetDatepicker}
            openDatepickers={this.openDatepickers}
            onChange={this.onChange}
            pickDate={this.pickDate}
            pickDeadLine={this.pickDeadLine}
            onBlur={this.onBlur}
            handleSubmit={this.handleSubmit}
          />
        </Modal>
      </>
    );
  }
}

export default connect(
  (state: any) => ({
    inventoriesList: state.getIn(['inventories', 'inventories']).toJS(),
    usersList: state.getIn(['users', 'users']).toJS(),
    tasksStatusesList: state.getIn(['tasksStatuses', 'tasksStatuses']).toJS(),
  }),
  { createTask, fetchInventories, fetchUsers, fetchTasksStatuses }
)(AddTaskContainer) as any;
