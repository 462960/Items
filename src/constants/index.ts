export const RESET_STORE = 'global/RESET_STORE';

export const PATTERN_EMAIL = /^[A-Z0-9a-z._-]+@[A-Z0-9a-z._-]+$/;
export const PATTERN_PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\\$%\\^&*\\-_.]).{8,}$/;

export const SORT_ORDER = Object.freeze({
  ASC: 'ASC',
  DESC: 'DESC',
});

export const DEFAULT_PER_PAGE = 3;

export const PHOTO_VALID = {
  fileSize: 2097152,
  fileType: ['image/png', 'image/jpg'],
  userInfo: {
    fileSize: '2Mb',
    fileType: '.PNG or .JPG',
  },
};
