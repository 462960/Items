import React from 'react';
import Button from 'components/common/Button/Button';
import Modal from 'components/common/Modal/Modal';
import AbsoluteLayer from 'components/common/AbsoluteLayer/AbsoluteLayer';
import ProgressBar from 'components/common/ProgressBar/ProgressBar';
import { FormattedMessage } from 'react-intl';
import ImportFileForm from './ImportFileForm';
import messages from './translate';
import withPromise from 'helpers/withPromise';

const formId = 'importFileForm';

interface IProps {
  title?: React.ReactNode;
  isOpen: boolean;
  onClose(): void;
  onSubmit(values: IItemData, promise: IPromiseCallback): IAction;
}

interface IState {
  submitting?: boolean;
  uploadPercentComplete?: number;
}

class ImportFileModal extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      uploadPercentComplete: 0,
    };
  }

  private submitForm = () => {
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

  onSubmit = (values: object) => {
    const { onClose } = this.props;

    this.setState({
      submitting: true,
      uploadPercentComplete: 0,
    });
    return withPromise(this.props.onSubmit, values, {
      onUploadProgress: this.onUploadProgress,
    }).then((res?: ISubmitFormError) => {
      this.setState({
        submitting: false,
      });
      if (res && res.error) return Promise.resolve(res);
      onClose();
    });
  };

  render() {
    const { isOpen, title, onClose } = this.props;
    const { submitting, uploadPercentComplete } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        title={title}
        actions={[
          <Button
            className="btn btn-inventor btn-white"
            key="cancel"
            onClick={onClose}
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
            <span className="title-header-btn">
              <FormattedMessage {...messages.continue} />
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
          <ImportFileForm onSubmit={this.onSubmit} formId={formId} />
        </>
      </Modal>
    );
  }
}

export default ImportFileModal;
