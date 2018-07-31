import React from 'react';
import cn from 'classnames';
import { PHOTO_VALID } from '../../constants/index';

const ProfileHeader = (props) => {
  const { openCancelModal } = props;
  const { photo_url, user_group, registered_at, updated_at } = props.data;

  return (
    <div className="table-head-account">
      <div className="wrap-account-header-left">
        <a href="#">
          <img
            className="account-avatar"
            src={Boolean(photo_url) ? photo_url : '/images/vg.jpg'}
            alt="account-avatar"
          />
        </a>
        <div className="wrap-account-content">
          <span className="text-gray p-b-10">Profile Photo</span>
          <div className="wrap-btn-row p-b-10">
            <button
              type="button"
              id="photo"
              onClick={openCancelModal}
              className="btn btn-inventor btn-white m-r-10"
            >
              <svg style={{ pointerEvents: 'none' }} className="svg-pen">
                <use xlinkHref="/images/sprite.svg#pen-new" />
              </svg>
              <span
                style={{ pointerEvents: 'none' }}
                className="title-header-btn p-l-10"
              >
                Change
              </span>
            </button>
            <button
              type="button"
              id="delete"
              onClick={Boolean(photo_url) ? openCancelModal : null}
              className={cn('btn btn-inventor btn-white', {
                disabled: !Boolean(photo_url),
              })}
            >
              <svg style={{ pointerEvents: 'none' }} className="svg-cart">
                <use xlinkHref="/images/sprite.svg#cart-trash" />
              </svg>
              <span
                style={{ pointerEvents: 'none' }}
                className="title-header-btn p-l-10"
              >
                Delete
              </span>
            </button>
          </div>
          <span className="text-gray">
            {`${PHOTO_VALID.userInfo.fileType}. Maximum size ${
              PHOTO_VALID.userInfo.fileSize
            }`}
          </span>
        </div>
      </div>
      <div className="wrap-account-header-right">
        <button className="wrap-row wrap-row-hov">
          <svg className="svg-cart-red">
            <use xlinkHref="/images/sprite.svg#cart-trash" />
          </svg>
          <span
            id="deactivate"
            onClick={openCancelModal}
            className="text-red m-l-10"
          >
            Deactivate account
          </span>
        </button>
        <div className="wrap-account-content-left">
          <span className="text-gray ta-r p-b-5">User Group: {user_group}</span>
          <span className="text-gray ta-r p-b-5">
            Date of Registration: {registered_at}
          </span>
          <span className="text-gray ta-r">Last update: {updated_at}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
