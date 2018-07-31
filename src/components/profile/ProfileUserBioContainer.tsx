import React from 'react';
import ProfileUserBio from 'components/profile/ProfileUserBio';
import ChangePhotoModal from 'components/profile/ChangePhotoModal';
import { connect } from 'react-redux';
import {
  updateProfile,
  updatePhoto,
  deletePhoto,
  updateEmail,
  updatePassword,
  fetchProfile,
} from 'reducers/profile/reducer';
import RemoveConfirmModal from 'components/common/Modal/RemoveConfirmModal';
import { PHOTO_VALID } from '../../constants/index';
import { Route, Switch } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import ProfileHeader from './ProfileHeader';
import ProfileUserChangeEmail from 'components/profile/ProfileUserChangeEmail';
import ProfileUserChangePassword from 'components/profile/ProfileUserChangePassword';

interface IState {
  secondary: boolean;
  amIdeletePhotoButton: boolean;
  isChangePhotoModalOpen: boolean;
  photo?: {
    size: any;
    type: any;
  };
  photoInvalidated: boolean;
  [x: string]: any;
  data?: {
    fullname: string;
    location: string;
    phone: string;
    company_name: string;
    position: string;
  };
  password?: string;
  new_password?: string;
  repeat_password?: string;
  new_email?: string;
  isPasswordSkipped?: boolean;
  isRepeatPasswordSkipped?: boolean;
  isNewPasswordSkipped?: boolean;
  isEmailSkipped?: boolean;
  isFullnameSkipped?: boolean;
  isLocationSkipped?: boolean;
  isPhoneSkipped?: boolean;
  isCompanySkipped?: boolean;
  isPositionSkipped?: boolean;
}

class ProfileUserBioContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.userData.data,
      isCancelModalOpen: false,
      secondary: false,
      amIdeletePhotoButton: false,
      isChangePhotoModalOpen: false,
      photo: {
        size: null,
        type: '',
      },
      photoInvalidated: false,
      password: '',
      new_password: '',
      repeat_password: '',
      new_email: '',
      isPasswordSkipped: false,
      isRepeatPasswordSkipped: false,
      isNewPasswordSkipped: false,
      isEmailSkipped: false,
      isFullnameSkipped: false,
      isLocationSkipped: false,
      isPhoneSkipped: false,
      isCompanySkipped: false,
      isPositionSkipped: false,
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userData !== prevProps.userData) {
      this.setState({
        data: this.props.userData.data,
      });
    }
  }

  onChange = (e) => {
    // Update User data object
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });

    // Update User photo
    if (Boolean(e.target.files)) {
      this.setState({
        photo: e.target.files[0],
      });
    }

    // Update Password/Email
    if (
      e.target.name === 'new_email' ||
      e.target.name === 'password' ||
      e.target.name === 'repeat_password' ||
      e.target.name === 'new_password'
    ) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  toggleTogglable = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.id]: !this.state.data[e.target.id],
      },
    });
  };

  openCancelModal = (e) => {
    if (e.target.id === 'delete' || e.target.id === 'deactivate')
      this.setState({
        isCancelModalOpen: true,
      });
    if (e.target.id === 'delete')
      this.setState({
        amIdeletePhotoButton: true,
      });
    if (e.target.id === 'photo')
      this.setState({
        isChangePhotoModalOpen: true,
      });
  };

  closeCancelModal = () => {
    this.setState({
      isCancelModalOpen: false,
      amIdeletePhotoButton: false,
      isChangePhotoModalOpen: false,
    });
  };

  deactivateAccount = () => {
    global.console.log('I am Deactivate account');
    this.setState({
      isCancelModalOpen: false,
    });
  };

  submitPhoto = () => {
    const { size, type } = this.state.photo;
    const { fileSize, fileType } = PHOTO_VALID;
    const isTypeValid = fileType.some((x) => x === type);

    if (size <= fileSize && isTypeValid) {
      this.props.updatePhoto(this.state.photo);
      this.closeCancelModal();
      this.setState({
        photo: {
          size: null,
          type: '',
        },
      });
      setTimeout(() => {
        this.props.fetchProfile();
      }, 1000);
    } else {
      this.setState({
        photoInvalidated: true,
      });
      setTimeout(
        () =>
          this.setState({
            photoInvalidated: false,
          }),
        3000
      );
    }
  };

  photoDelete = () => {
    this.props.deletePhoto();
    this.setState({
      isCancelModalOpen: false,
      amIdeletePhotoButton: false,
    });

    setTimeout(() => {
      this.props.fetchProfile();
    }, 1000);
  };

  handleSubmit = () => {
    const { updateProfile, updateEmail, updatePassword } = this.props;

    const {
      fullname,
      location,
      phone,
      company_name,
      position,
    } = this.state.data;

    const { password, new_password, repeat_password, new_email } = this.state;
    const currentPathEnd = window.location.href.slice(-3);

    // Submits Profile Update
    if (
      !isEmpty(fullname) &&
      !isEmpty(location) &&
      !isEmpty(phone) &&
      !isEmpty(company_name) &&
      !isEmpty(position) &&
      currentPathEnd === 'bio'
    ) {
      updateProfile(this.state.data);
    }

    // Submits Email Change
    if (!isEmpty(password) && !isEmpty(new_email) && currentPathEnd === 'ail') {
      updateEmail({ password, new_email });
    }

    // Submits Password Change
    if (
      !isEmpty(password) &&
      new_password === repeat_password &&
      currentPathEnd === 'ord'
    ) {
      updatePassword({ password, new_password });
    }

    // Skipped Inputs Alerts
    if (isEmpty(password)) {
      this.setState({
        isPasswordSkipped: true,
      });
    }

    if (isEmpty(new_password)) {
      this.setState({
        isNewPasswordSkipped: true,
      });
    }

    if (isEmpty(repeat_password)) {
      this.setState({
        isRepeatPasswordSkipped: true,
      });
    }

    if (isEmpty(new_email)) {
      this.setState({
        isEmailSkipped: true,
      });
    }

    if (isEmpty(fullname)) {
      this.setState({
        isFullnameSkipped: true,
      });
    }

    if (isEmpty(location)) {
      this.setState({
        isLocationSkipped: true,
      });
    }

    if (isEmpty(phone)) {
      this.setState({
        isPhoneSkipped: true,
      });
    }

    if (isEmpty(company_name)) {
      this.setState({
        isCompanySkipped: true,
      });
    }

    if (isEmpty(position)) {
      this.setState({
        isPositionSkipped: true,
      });
    }

    // Reset all skipped
    setTimeout(() => {
      this.setState({
        isPasswordSkipped: false,
        isNewPasswordSkipped: false,
        isRepeatPasswordSkipped: false,
        isEmailSkipped: false,
        isFullnameSkipped: false,
        isLocationSkipped: false,
        isPhoneSkipped: false,
        isCompanySkipped: false,
        isPositionSkipped: false,
      });
    }, 2000);
  };

  renderProfileUser = () => {
    const {
      data,
      isFullnameSkipped,
      isLocationSkipped,
      isPhoneSkipped,
      isCompanySkipped,
      isPositionSkipped,
    } = this.state;
    return (
      <ProfileUserBio
        data={data}
        isFullnameSkipped={isFullnameSkipped}
        isLocationSkipped={isLocationSkipped}
        isPhoneSkipped={isPhoneSkipped}
        isCompanySkipped={isCompanySkipped}
        isPositionSkipped={isPositionSkipped}
        onChange={this.onChange}
        photoDelete={this.photoDelete}
        toggleTogglable={this.toggleTogglable}
        handleSubmit={this.handleSubmit}
      />
    );
  };

  renderProfileUserChangeEmail = () => {
    const { password, isPasswordSkipped, isEmailSkipped } = this.state;
    return (
      <ProfileUserChangeEmail
        password={password}
        isPasswordSkipped={isPasswordSkipped}
        isEmailSkipped={isEmailSkipped}
        onChange={this.onChange}
        handleSubmit={this.handleSubmit}
      />
    );
  };

  renderProfileUserChangePassword = () => {
    const {
      isPasswordSkipped,
      isRepeatPasswordSkipped,
      isNewPasswordSkipped,
    } = this.state;

    return (
      <ProfileUserChangePassword
        isPasswordSkipped={isPasswordSkipped}
        isRepeatPasswordSkipped={isRepeatPasswordSkipped}
        isNewPasswordSkipped={isNewPasswordSkipped}
        onChange={this.onChange}
        handleSubmit={this.handleSubmit}
      />
    );
  };

  render() {
    const {
      isCancelModalOpen,
      secondary,
      amIdeletePhotoButton,
      isChangePhotoModalOpen,
      photoInvalidated,
      data,
    } = this.state;

    return (
      <>
        <ChangePhotoModal
          isChangePhotoModalOpen={isChangePhotoModalOpen}
          onChange={this.onChange}
          photoInvalidated={photoInvalidated}
          closeCancelModal={this.closeCancelModal}
          submitPhoto={this.submitPhoto}
        />
        <RemoveConfirmModal
          secondary={secondary}
          isOpen={isCancelModalOpen}
          onCancel={this.closeCancelModal}
          onContinue={
            amIdeletePhotoButton ? this.photoDelete : this.deactivateAccount
          }
        />
        <div className="block-one-invectory-right pad-0">
          <ProfileHeader openCancelModal={this.openCancelModal} data={data} />
          <Switch>
            <Route path="/profile/bio" render={this.renderProfileUser} />
            <Route
              path="/profile/email"
              render={this.renderProfileUserChangeEmail}
            />
            <Route
              path="/profile/password"
              render={this.renderProfileUserChangePassword}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default connect(
  (state: any) => ({ userData: state.getIn(['profile', 'profile']).toJS() }),
  {
    updateProfile,
    updatePhoto,
    deletePhoto,
    updateEmail,
    updatePassword,
    fetchProfile,
  }
)(ProfileUserBioContainer);
