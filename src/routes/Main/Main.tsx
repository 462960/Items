import React from 'react';
import T from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ProfileRoute from 'routes/Profile';
import AuthRoute from 'routes/Auth/Auth';
import ItemsRoute from 'routes/Items/Items';
import DashboardRoute from 'routes/Dashboard/Dashboard';
import InventoryRoute from 'routes/Inventory/Inventory';
import SearchRoute from 'routes/Search/Search';
import NotificationsRoute from 'routes/Notifications/Notifications';
import PlanningRoute from 'routes/Planning/Planning';
import ReportsRoute from 'routes/Reports/Reports';
import ScannerRoute from 'routes/Scanner/Scanner';
import AdminPanelRoute from 'routes/AdminPanel/AdminPanel';
import StructureRoute from 'routes/Structure/Structure';
import NotFoundRoute from 'routes/NotFound/NotFound';
import { fetchProfile, setJWTData } from 'reducers/profile/reducer';
// import withPromise from 'helpers/withPromise';
// import decodeJWT from 'helpers/decodeJWT';
import UserManager from 'components/main/UserManager/UserManager';
import DefaultLayout from 'components/layouts/DefaultLayout/DefaultLayout';

interface IProps {
  fetchProfile(): void;
}

class Main extends React.Component<IProps> {
  static contextTypes = {
    router: T.shape({
      history: T.shape({
        push: T.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentWillMount() {
    // const { fetchProfile } = this.props;
    const { router } = this.context;

    if (localStorage.getItem('token')) {
      if (this.isOnLoginRoute()) router.history.replace('/items'); // delete when fetchProfile will exist

      // disable until fetchProfile doesn't exist
      // withPromise(fetchProfile)
      //   .then(() => {
      //     setJWTData(decodeJWT(localStorage.getItem('token')));

      //     if (this.isOnLoginRoute()) {
      //       router.history.replace('/items');
      //     }
      //   })
      //   .catch(() => {
      //     localStorage.removeItem('token');
      //     localStorage.removeItem('refresh_token');
      //     router.history.replace('/login');
      //   });
    }
  }

  componentDidMount() {
    this.checkAuthorized();
  }

  componentDidUpdate() {
    this.checkAuthorized();
  }

  private checkAuthorized = (): void => {
    const { router } = this.context;

    if (!localStorage.getItem('token') && !this.isOnLoginRoute()) {
      router.history.replace('/login');
    }
  };

  private isOnLoginRoute = (): boolean => {
    return Boolean(window.location.href.match('/login'));
  };

  private renderDefaultLayout = (Component) => (props) => {
    return (
      <DefaultLayout>
        <Component {...props} />
      </DefaultLayout>
    );
  };

  render() {
    return (
      <>
        <UserManager />
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={AuthRoute} />
          <Route path="/items" render={this.renderDefaultLayout(ItemsRoute)} />
          {/* Profile */}
          <Route
            path="/profile"
            render={this.renderDefaultLayout(ProfileRoute)}
          />

          <Route
            path="/dashboard"
            render={this.renderDefaultLayout(DashboardRoute)}
          />
          <Route
            path="/inventory"
            render={this.renderDefaultLayout(InventoryRoute)}
          />
          {/* Search */}
          <Route
            path="/search/items"
            render={this.renderDefaultLayout(SearchRoute)}
          />

          <Route
            path="/notifications"
            render={this.renderDefaultLayout(NotificationsRoute)}
          />
          <Route
            path="/planning"
            render={this.renderDefaultLayout(PlanningRoute)}
          />
          <Route
            path="/reports"
            render={this.renderDefaultLayout(ReportsRoute)}
          />
          <Route
            path="/scanner"
            render={this.renderDefaultLayout(ScannerRoute)}
          />
          <Route
            path="/admin"
            render={this.renderDefaultLayout(AdminPanelRoute)}
          />
          <Route
            path="/structure"
            render={this.renderDefaultLayout(StructureRoute)}
          />
          <Route component={NotFoundRoute} />
        </Switch>
      </>
    );
  }
}

const enhance: any = compose(
  withRouter,
  connect(
    (state: any) => ({
      jwtData: state.getIn(['profile', 'jwtData']),
    }),
    { fetchProfile, setJWTData }
  )
);

export default enhance(Main);
