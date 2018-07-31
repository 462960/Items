import React from 'react';
import uuid from 'uuid/v4';
import get from 'lodash.get';
import Button from 'components/common/Button/Button';
import Modal from 'components/common/Modal/Modal';
import AbsoluteLayer from 'components/common/AbsoluteLayer/AbsoluteLayer';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import CancelFormModal from 'components/common/Modal/CancelFormModal';
import RemoveConfirmModal from 'components/common/Modal/RemoveConfirmModal';
import ItemModalForm from './ItemModalForm';
import { FormattedMessage } from 'react-intl';
import messages from './translate';
import withPromise from 'helpers/withPromise';

const formId = 'ItemForm';

interface IProps {
  edit?: boolean;
  initialValues?: IItemData;
  isOpen: boolean;
  onClose(): void;
  onSubmit(values: IItemData, promise: IPromiseCallback): IAction;
  onDelete?(id: string, promise: IPromiseCallback): IAction;
}

interface IState {
  isCancelModalOpen?: boolean;
  isRemoveModalOpen?: boolean;
  isFormDirty?: boolean;
  isSecondaryModalExiting?: boolean;
  submitting?: boolean;
  uploadPercentComplete?: number;
}

class ItemModal extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isRemoveModalOpen: false,
      isCancelModalOpen: false,
      isFormDirty: false,
      isSecondaryModalExiting: false,
      submitting: false,
      uploadPercentComplete: 0,
    };
  }

  submitForm = () => {
    document
      .getElementById(formId)
      .dispatchEvent(new Event('submit', { cancelable: true }));
  };

  onUploadProgress = (event) => {
    if (event.lengthComputable) {
      const uploadPercentComplete = Math.ceil(event.loaded / event.total * 100);
      if (uploadPercentComplete === 100) {
        this.setState({
          submitting: false,
          uploadPercentComplete: 0,
        });
      } else {
        this.setState({ uploadPercentComplete });
      }
    }
  };

  onSubmit = (values: IItemData) => {
    const { initialValues } = this.props;

    this.setState({
      submitting: true,
      uploadPercentComplete: 0,
    });
    return withPromise(
      this.props.onSubmit,
      {
        ...values,
        public_id: get(initialValues, 'public_id', uuid()),
      },
      {
        onUploadProgress: this.onUploadProgress,
      }
    ).then((res?: ISubmitFormError) => {
      this.setState({
        submitting: false,
      });
      if (res && res.error) return Promise.resolve(res);
      this.onExit();
    });
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
        this.onExit();
      }
    );
  };

  private changeState = (field, newValue) => () => {
    this.setState({ [field]: newValue });
  };

  private onExit = () => {
    const { onClose } = this.props;
    const { isCancelModalOpen, isRemoveModalOpen } = this.state;

    this.setState({
      isCancelModalOpen: false,
      isRemoveModalOpen: false,
      isSecondaryModalExiting: isRemoveModalOpen || isCancelModalOpen,
    });
    onClose();
  };

  private onSecondaryModalExited = () => {
    this.setState({ isSecondaryModalExiting: false });
  };

  private onFormChange = () => {
    const { isFormDirty } = this.state;
    if (!isFormDirty) this.setState({ isFormDirty: true });
  };

  private onCancel = () => {
    const { isFormDirty } = this.state;
    if (isFormDirty) {
      this.setState({ isCancelModalOpen: true });
    } else {
      this.onExit();
    }
  };

  private renderTitle = () => {
    const { edit } = this.props;

    if (edit) return <FormattedMessage {...messages.editItem} />;
    return <FormattedMessage {...messages.newItem} />;
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
          onContinue={this.onExit}
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

  render() {
    const { isOpen, initialValues, edit } = this.props;
    const {
      submitting,
      uploadPercentComplete,
      isCancelModalOpen,
      isRemoveModalOpen,
      isSecondaryModalExiting,
    } = this.state;
    const isPrimaryModalHidden =
      isRemoveModalOpen || isCancelModalOpen || isSecondaryModalExiting;

    return (
      <>
        <Modal
          isOpen={isOpen}
          title={this.renderTitle()}
          titleIcon={this.renderTitleIcon()}
          hide={isPrimaryModalHidden}
          actions={[
            <Button
              className="btn btn-inventor btn-white"
              key="cancel"
              onClick={this.onCancel}
            >
              <img
                className="header-plus"
                src="/images/cancel.svg"
                alt="cancel"
              />
              <span className="title-header-btn">
                <FormattedMessage {...messages.cancel} />
              </span>
            </Button>,
            <Button
              className="btn btn-inventor btn-lime"
              key="addItem"
              onClick={this.submitForm}
              disabled={submitting}
            >
              {!edit && (
                <img
                  className="header-plus"
                  src="/images/plus.svg"
                  alt="plus"
                />
              )}
              <span className="title-header-btn">
                <FormattedMessage
                  {...messages[edit ? 'editItem' : 'addItem']}
                />
              </span>
            </Button>,
          ]}
        >
          <>
            <AbsoluteLayer
              className="progress-layer"
              show={submitting && Boolean(uploadPercentComplete)}
            >
              <ProgressBar
                percent={uploadPercentComplete}
                label={<FormattedMessage {...messages.uploading} />}
              />
            </AbsoluteLayer>
            <ItemModalForm
              onChange={this.onFormChange}
              onSubmit={this.onSubmit}
              formId={formId}
              initialValues={initialValues}
            />
          </>
        </Modal>
        {this.renderSecondaryModals()}
      </>
    );
  }
}

export default ItemModal;
