import React from 'react';
import Button from 'components/common/Button/Button';
import Modal from 'components/common/Modal/Modal';
import { FormattedMessage } from 'react-intl';
import messages from './translate';

interface IProps {
  isOpen: boolean;
  secondary?: boolean; // means secondary modal
  onTransitionEnd?(): any;
  onCancel(): any;
  onContinue(): any;
}

class RemoveConfirmModal extends React.PureComponent<IProps> {
  render() {
    const {
      isOpen,
      onCancel,
      onContinue,
      onTransitionEnd,
      secondary,
    } = this.props;

    return (
      <Modal
        secondary={secondary}
        onTransitionEnd={onTransitionEnd}
        isOpen={isOpen}
        className="modal-content-inventor--small"
        title={<div className="red">Are you sure?</div>}
        actions={[
          <Button
            className="btn btn-inventor btn-white"
            key="cancel"
            onClick={onCancel}
          >
            <svg className="m-r-10 svg-cancel">
              <use xlinkHref="/images/sprite.svg#delete" />
            </svg>
            <span className="title-header-btn">
              <FormattedMessage {...messages.cancel} />
            </span>
          </Button>,
          <Button
            className="btn btn-inventor btn-red"
            key="continue"
            onClick={onContinue}
          >
            <svg className="m-r-10 svg-arrow-r fill-white">
              <use xlinkHref="/images/sprite.svg#arrow-r" />
            </svg>
            <span className="title-header-btn">
              <FormattedMessage {...messages.continue} />
            </span>
          </Button>,
        ]}
      >
        <div className="text-smaller text-grey">
          It can't be undone. Do you want to continue?
        </div>
      </Modal>
    );
  }
}

export default RemoveConfirmModal;
