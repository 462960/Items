import React from 'react';
import Modal from 'components/common/Modal/Modal';
import RemoveConfirmModal from 'components/common/Modal/RemoveConfirmModal';
import CancelFormModal from 'components/common/Modal/CancelFormModal';
import CollaboratorForm from './CollaboratorForm';
import withPromise from 'helpers/withPromise';
import get from 'lodash.get';
import uuid from 'uuid/v4';
import { Button } from 'components/common/Button/Button';
import dateConverter from 'helpers/dateConverter';

interface IProps {
  edit?: boolean;
  initialValues?: ICollaboratorData;
  isOpen: boolean;
  onClose(): void;
  onDelete?(id: string, promise: IPromiseCallback): IAction;
  onSubmit(values: ICollaboratorData, promise?: IPromiseCallback): IAction;
}

interface IState {
  isCancelModalOpen: boolean;
  isRemoveModalOpen?: boolean;
  isSecondaryModalExiting: boolean;
  submitting: boolean;
  location?: string | number;
  name?: string;
  phone_number?: string;
  email?: string;
  birthday?: string;
  position?: string;
  currentDate?: object;
  date?: any;
  isNameSkipped?: boolean;
  [other: string]: any;
  isDatepickerOpen: boolean;
}

class CollaboratorModal extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isRemoveModalOpen: false,
      isCancelModalOpen: false,
      isSecondaryModalExiting: false,
      submitting: false,
      location: get(props.initialValues, 'location', ''),
      name: get(props.initialValues, 'name', ''),
      phone_number: get(props.initialValues, 'phone_number', ''),
      position: get(props.initialValues, 'position', ''),
      email: get(props.initialValues, 'email', ''),
      birthday: get(props.initialValues, 'birthday', ''),
      description: get(props.initialValues, 'description', ''),
      isNameSkipped: false,
      currentDate: new Date(),
      date: '',
      isDatepickerOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.initialValues ||
      this.props.initialValues === prevProps.initialValues
    ) {
      return;
    }
    this.setState({
      location: get(this.props.initialValues, 'location', ''),
      name: get(this.props.initialValues, 'name', ''),
      phone_number: get(this.props.initialValues, 'phone_number', ''),
      position: get(this.props.initialValues, 'position', ''),
      email: get(this.props.initialValues, 'email', ''),
      birthday: get(this.props.initialValues, 'birthday', ''),
      description: get(this.props.initialValues, 'description', ''),
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleDatepicker = () => {
    this.setState(({ isDatepickerOpen }) => ({
      isDatepickerOpen: !isDatepickerOpen,
    }));
  };

  pickDate = (currentDate) => {
    // global.console.log('I am pick date');
    this.setState(
      () => ({
        currentDate,
      }),
      () => {
        this.setState({
          date: dateConverter(currentDate),
          isDatepickerOpen: false,
        });
      }
    );
  };

  resetDatepicker = () => {
    this.setState(
      () => ({
        date: '',
      }),
      () => {
        this.setState({
          isDatepickerOpen: false,
        });
      }
    );
  };

  onSubmit = () => {
    const { onSubmit, initialValues } = this.props;
    const { name, location, position, phone_number, email } = this.state;

    if (name.length > 0 && position.length > 0 && location) {
      this.setState({
        submitting: true,
      });

      withPromise(onSubmit, {
        name,
        location,
        position,
        phone_number,
        email,
        public_id: get(initialValues, 'public_id', uuid()),
        birthday: '1900.01.01',
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
    } else {
      this.setState({
        isNameSkipped: true,
      });

      setTimeout(
        () =>
          this.setState({
            isNameSkipped: false,
          }),
        2000
      );
    }
  };

  private closeModal = () => {
    const { onClose } = this.props;
    const { isCancelModalOpen, isRemoveModalOpen } = this.state;

    this.setState({
      addCollaboratorIsOpen: false,
      isCancelModalOpen: false,
      isRemoveModalOpen: false,
      isSecondaryModalExiting: isRemoveModalOpen || isCancelModalOpen,
      location: '',
      name: '',
      phone_number: '',
      position: '',
      email: '',
      birthday: '',
    });
    onClose();
  };

  private onSecondaryModalExited = () => {
    this.setState({ isSecondaryModalExiting: false });
  };

  private onCancel = () => {
    const { name, location, position, phone_number, birthday } = this.state;
    if (name || location || position || phone_number || birthday) {
      this.setState({ isCancelModalOpen: true });
    } else {
      this.closeModal();
    }
  };

  private changeState = (field, newValue) => () => {
    this.setState({ [field]: newValue });
  };

  private onDelete = () => {
    const { initialValues, onDelete } = this.props;

    this.setState({
      submitting: true,
    });
    return withPromise(onDelete, initialValues.public_id).then(
      (res?: ISubmitFormError) => {
        this.setState({
          submitting: false,
        });
        if (res && res.error) {
          // TODO:
        }
        this.closeModal();
      }
    );
  };

  private renderSecondaryModals = () => {
    const { isOpen, edit } = this.props;
    const {
      isCancelModalOpen,
      isSecondaryModalExiting,
      isRemoveModalOpen,
    } = this.state;

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
        {edit && (
          <RemoveConfirmModal
            secondary
            isOpen={isOpen && isRemoveModalOpen}
            onCancel={this.changeState('isRemoveModalOpen', false)}
            onContinue={this.onDelete}
            onTransitionEnd={
              isSecondaryModalExiting ? this.onSecondaryModalExited : null
            }
          />
        )}
      </>
    );
  };

  private renderTitleIcon = () => {
    const { edit } = this.props;

    if (!edit) return null;
    return (
      <svg
        className="svg-cart-red pointer"
        onClick={this.changeState('isRemoveModalOpen', true)}
      >
        <use xlinkHref="/images/sprite.svg#cart-trash" />
      </svg>
    );
  };

  render() {
    const { edit, initialValues, isOpen } = this.props;
    const {
      isNameSkipped,
      isRemoveModalOpen,
      isCancelModalOpen,
      isSecondaryModalExiting,
      submitting,
      isDatepickerOpen,
      currentDate,
      date,
    } = this.state;
    const isPrimaryModalHidden =
      isRemoveModalOpen || isCancelModalOpen || isSecondaryModalExiting;
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
                <span className="title-header-btn">{action} collaborator</span>
              </Button>
            </>
          }
          title={`${action} collaborator`}
          titleIcon={this.renderTitleIcon()}
        >
          <CollaboratorForm
            edit={edit}
            isNameSkipped={isNameSkipped}
            handleSubmit={this.onSubmit}
            onChange={this.onChange}
            initialValues={initialValues}
            toggleDatepicker={this.toggleDatepicker}
            isDatepickerOpen={isDatepickerOpen}
            pickDate={this.pickDate}
            currentDate={currentDate}
            date={date}
            resetDatepicker={this.resetDatepicker}
          />
        </Modal>
        {this.renderSecondaryModals()}
      </>
    );
  }
}

export default CollaboratorModal;
