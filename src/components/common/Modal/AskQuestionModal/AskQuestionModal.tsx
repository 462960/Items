import React from 'react';
import Modal from 'components/common/Modal/Modal';
import CancelFormModal from 'components/common/Modal/CancelFormModal';
import AskQuestionForm from './AskQuestionForm';
import { connect } from 'react-redux';
import { Button } from 'components/common/Button/Button';

interface IConnectedProps {
  userData: any;
}

interface IProps extends IConnectedProps {
  edit?: boolean;
  initialValues?: ICollaboratorData;
  isOpen: boolean;
  onClose(): void;
  closeModal(): void;
  onDelete?(id: string, promise: IPromiseCallback): IAction;
  onSubmit(values: ICollaboratorData, promise?: IPromiseCallback): IAction;
}

interface IState {
  isCancelModalOpen: boolean;
  isRemoveModalOpen?: boolean;
  isSecondaryModalExiting: boolean;
  name?: string;
  email?: string;
  comment?: string;
  [x: string]: any;
  submitting: boolean;
  isNameSkipped?: boolean;
  isEmailSkipped?: boolean;
  isCommentSkipped?: boolean;
  isPrimaryModalHidden?: boolean;
  isConfirmCancelOpen?: boolean;
}

class AskQuestionModal extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isRemoveModalOpen: false,
      isCancelModalOpen: false,
      isSecondaryModalExiting: true,
      name: this.props.userData.data.fullname,
      email: '',
      comment: '',
      submitting: false,
      isNameSkipped: false,
      isEmailSkipped: false,
      isCommentSkipped: false,
      isPrimaryModalHidden: false,
      isConfirmCancelOpen: false
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = () => {
    // const {
    //   onSubmit,
    //   // initialValues
    // } = this.props;

    const { name, email, comment } = this.state;

    if (name && email && comment) {
      global.console.log(name, email, comment);

      this.setState({
        name: '',
        email: '',
        comment: '',
      });
    }

    if (!name) {
      this.setState({
        isNameSkipped: true,
      });
    }

    if (!email) {
      this.setState({
        isEmailSkipped: true,
      });
    }

    if (!comment) {
      this.setState({
        isCommentSkipped: true,
      });
    }

    setTimeout(
      () =>
        this.setState({
          isNameSkipped: false,
          isEmailSkipped: false,
          isCommentSkipped: false,
        }),
      2000
    );
    // this.setState({
    //   submitting: true,
    // });

    //   withPromise(onSubmit, {
    //     name,
    //     email,
    //     comment,
    //   })
    //     .then((res?: ISubmitFormError) => {
    //       this.setState({
    //         submitting: false,
    //       });
    //       if (res && res.error) return Promise.resolve(res);
    //       this.closeModal();
    //     })
    //     .catch(() => {
    //       this.setState({
    //         submitting: false,
    //       });
    //     });
    // } else {
    //   this.setState({
    //     isNameSkipped: true,
    //   });
  };

  private closeModal = () => {
    const { onClose } = this.props;
    const {
      isCancelModalOpen,
      isRemoveModalOpen
    } = this.state;

    this.setState({
      isCancelModalOpen: false,
      isRemoveModalOpen: false,
      isSecondaryModalExiting: isRemoveModalOpen || isCancelModalOpen,
      name: '',
      comment: '',
    });
    onClose();
  };

  private onSecondaryModalExited = () => {
    this.setState({ isSecondaryModalExiting: false });
  };

  // private onCancel = () => {
  //   const { name, location, position, phone_number, birthday } = this.state;
  //   if (name || location || position || phone_number || birthday) {
  //     this.setState({ isCancelModalOpen: true });
  //   } else {
  //     this.closeModal();
  //   }
  // };

  hidePrimaryModal = () => {
    this.setState({
      isCancelModalOpen: false,
      isConfirmCancelOpen: true

    })
  }

  private changeState = (field, newValue) => () => {
    this.setState({ [field]: newValue });
  };

  private renderSecondaryModals = () => {
      const { isOpen } = this.props;
    const {
      isCancelModalOpen,
      isSecondaryModalExiting,
    } = this.state;

    return (
      <CancelFormModal
       // isOpen={isCancelModalOpen}
         isOpen={isOpen && isCancelModalOpen}
        onCancel={this.changeState('isCancelModalOpen', false)}
        onContinue={this.closeModal}
        onTransitionEnd={
          isSecondaryModalExiting ? this.onSecondaryModalExited : null
        }
      />
    );
  };

  // private renderTitleIcon = () => {
  //   const { edit } = this.props;

  //   if (!edit) return null;
  //   return (
  //     <svg
  //       className="svg-cart-red pointer"
  //       onClick={this.changeState('isRemoveModalOpen', true)}
  //     >
  //       <use xlinkHref="/images/sprite.svg#cart-trash" />
  //     </svg>
  //   );
  // };

  render() {
    const {
      isOpen,
      closeModal,
    } = this.props;

    // const isPrimaryModalHidden =
    //   isRemoveModalOpen || isCancelModalOpen || isSecondaryModalExiting;
    // const action = edit ? 'Edit' : 'Add';

    return (
      <>
        <Modal
          isOpen={isOpen}
          //  hide={isPrimaryModalHidden}
          className="-no-overflow"
          actions={
            <>
              <Button
                type="button"
                onClick={closeModal}
                // onClick={this.hidePrimaryModal}
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
              >
                <img className="header-plus" src="/images/que.svg" alt="plus" />
                <span className="title-header-btn">Ask a question</span>
              </Button>
            </>
          }
          title="Ask a question"
        //  titleIcon={this.renderTitleIcon()}
        >
          <AskQuestionForm
            {...this.state}
            handleSubmit={this.onSubmit}
            onChange={this.onChange}
           // initialValues={initialValues}
          />
        </Modal>
        {this.renderSecondaryModals()}
      </>
    );
  }
}

const enhance: any = connect<IConnectedProps>((state: any) => ({
  userData: state.getIn(['profile', 'profile']).toJS(),
}));

export default enhance(AskQuestionModal);
