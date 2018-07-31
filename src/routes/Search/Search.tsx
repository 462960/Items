import React from 'react';
import SearchContainer from 'components/search/SearchContainer';
import { Route, Switch } from 'react-router-dom';

class Search extends React.PureComponent<IWithRouter> {
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
            {/* <ProfileMenu /> */}
            <Switch>
              <Route path="/search/items" component={SearchContainer} />
              {/* <Route
                  path="/profile/email"
                  component={ProfileUserChangeEmail}
                />
                <Route
                  path="/profile/password"
                  component={ProfileUserChangePassword}
                /> */}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
