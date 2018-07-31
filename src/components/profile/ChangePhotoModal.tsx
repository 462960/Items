import React from 'react';
import Button from 'components/common/Button/Button';
import Modal from 'components/common/Modal/Modal';
import { PHOTO_VALID } from '../../constants/index';
// import { FormattedMessage } from 'react-intl';
// import messages from './translate';

const ChangePhotoModal = ({
  isChangePhotoModalOpen,
  onChange,
  closeCancelModal,
  submitPhoto,
  photoInvalidated,
}) => (
  <Modal
    isOpen={isChangePhotoModalOpen}
    actions={[
      <input
        className="btn btn-inventor btn-white"
        style={{ marginRight: '20px' }}
        onChange={onChange}
        type="file"
        name="photo"
        key="photo"
      />,
      <Button
        className="btn btn-inventor btn-red"
        key="cancel"
        onClick={closeCancelModal}
      >
        <svg className="m-r-10 svg-cancel fill-white">
          <use xlinkHref="/images/sprite.svg#delete" />
        </svg>
        <span className="title-header-btn">
          {/* <FormattedMessage {...messages.cancel} /> */}
          Cancel
        </span>
      </Button>,
      <Button
        className="btn btn-inventor btn-white"
        key="continue"
        onClick={submitPhoto}
      >
        <svg className="m-r-10 svg-arrow-r">
          <use xlinkHref="/images/sprite.svg#arrow-r" />
        </svg>
        <span className="title-header-btn">
          {/* <FormattedMessage {...messages.continue} /> */}
          Submit photo
        </span>
      </Button>,
    ]}
  >
    <>
      Upload new profile photo
      {photoInvalidated ? (
        <div style={{ color: 'red', textAlign: 'center' }}>
          {`Please, choose ${PHOTO_VALID.userInfo.fileType} file, up to ${
            PHOTO_VALID.userInfo.fileSize
          } size`}
        </div>
      ) : null}
    </>
  </Modal>
);

export default ChangePhotoModal;
