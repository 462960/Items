import React from 'react';
import ProfileMenu from 'components/profile/ProfileMenu';
import ProfileUserBioContainer from 'components/profile/ProfileUserBioContainer';
import ProfileUserPrivacy from 'components/profile/ProfileUserPrivacy';
import ProfileUserPayment from 'components/profile/ProfileUserPayment';
import ProfileUserHelp from 'components/profile/ProfileUserHelp';
import { Route, Switch } from 'react-router-dom';

class ProfileRoute extends React.Component {
  render() {
    return (
      <div className="page-content">
        <div className="wrap-header">
          <span className="header-title">Название в хедере "Заглушка"</span>
          <p className="header-text">
            Cъешь ещё этих мягких французских булок <span>69</span>, да выпей
            чаю
          </p>
        </div>
        <div className="wrap-inventory-block">
          <div className="wrap-top-row-one-inventory">
            <ProfileMenu />
            <Switch>
              <Route path="/profile/privacy" component={ProfileUserPrivacy} />
              <Route path="/profile/payment" component={ProfileUserPayment} />
              <Route path="/profile/help" component={ProfileUserHelp} />
              <Route
                path="/profile/:path"
                component={ProfileUserBioContainer}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileRoute;
