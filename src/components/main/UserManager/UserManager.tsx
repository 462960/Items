import React from 'react';
import { connect } from 'react-redux';
import { refreshToken } from 'reducers/profile/reducer';

interface IProps {
  expiration?: number;
  refreshToken(): void;
}

class UserManager extends React.PureComponent<IProps> {
  debouncedRefreshTokenRequest?: any;

  componentDidMount() {
    this.updateDebouncedRefreshToken();
  }

  componentDidUpdate() {
    this.updateDebouncedRefreshToken();
  }

  updateDebouncedRefreshToken = (): void => {
    const { expiration, refreshToken } = this.props;
    clearTimeout(this.debouncedRefreshTokenRequest);

    if (!expiration) return;

    // We're going to refresh token when 30s earlier then current token expire
    const msBeforeExpire = 30000;
    const msToExpire = expiration * 1000 - Date.now();

    if (msToExpire - msBeforeExpire < 0) return;
    this.debouncedRefreshTokenRequest = setTimeout(
      refreshToken,
      msToExpire - msBeforeExpire
    );
  };

  render() {
    return null;
  }
}

const enhance: any = connect(
  (state: any) => ({
    expiration: state.getIn(['profile', 'jwtData', 'exp']),
  }),
  { refreshToken }
);

export default enhance(UserManager);
