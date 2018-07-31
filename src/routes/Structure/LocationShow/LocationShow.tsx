import React from 'react';
import TopSection from 'components/common/TopSection/TopSection';
import Tabs from 'components/common/Tabs/Tabs';
import { Switch, Redirect, Route, Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { getLocation } from 'reducers/locations/location/reducer';
import { locationSelector } from 'reducers/locations/location/selectors';
import Items from './Items/Items';
import Collaborators from './Collaborators/Collaborators';

interface IProps extends IWithRouter {
  getLocation(id: string, promise?: IPromiseCallback): IAction;
  currentLocation: ILocationData;
}

interface IState {
  locationId: string;
}

class LocationShow extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      locationId: get(props.match, 'params.id'),
    };
  }
  componentDidMount() {
    const { getLocation } = this.props;
    const { locationId } = this.state;
    getLocation(locationId);
  }

  private renderTopSectionContent = () => {
    const { currentLocation } = this.props;
    return (
      <div className="header-left-block-easy--df">
        <div className="p-r-45">
          <Link className="style-btn-non p-b-15" to="/structure">
            <svg className="svg-arrow-r svg-arrow-r--gray">
              <use xlinkHref="/images/sprite.svg#left-arrow" />
            </svg>
            <span className="header-search">Back</span>
          </Link>
          <h1 className="header-title m-b-0 p-t-5">{currentLocation.name}</h1>
          <p className="header-text">{currentLocation.description}</p>
        </div>
        <div className="df-cc m-t-20">
          <div className="info-block p-r-45">
            <div className="p-r-10">
              <svg className="svg-icon-big">
                <use xlinkHref="/images/sprite.svg#cube-gray" />
              </svg>
            </div>
            <div>
              <span className="big-number line-h-1">
                {currentLocation.items_count}
              </span>
              <span className="text-list line-h-1">Items</span>
            </div>
          </div>
          <div className="info-block">
            <div className="p-r-10">
              <svg className="svg-icon-big">
                <use xlinkHref="/images/sprite.svg#people-gray" />
              </svg>
            </div>
            <div>
              <span className="big-number line-h-1">
                {currentLocation.collaborators_count}
              </span>
              <span className="text-list line-h-1">Collaborators</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  private renderItems = (props) => (
    <Items locationId={this.state.locationId} {...props} />
  );

  private renderCollaborators = (props) => (
    <Collaborators locationId={this.state.locationId} {...props} />
  );

  render() {
    const { match } = this.props;

    return (
      <>
        <TopSection className="pb-0">
          {this.renderTopSectionContent()}
          <Tabs
            tabs={[
              { label: 'Items', to: match.url + '/items' },
              { label: 'Collaborators', to: match.url + '/collaborators' },
            ]}
          />
        </TopSection>
        <Switch>
          <Redirect exact from={match.url} to={match.url + '/items'} />
          <Route path={match.url + '/items'} render={this.renderItems} />
          <Route
            path={match.url + '/collaborators'}
            render={this.renderCollaborators}
          />
        </Switch>
      </>
    );
  }
}

const enhance: any = compose(
  connect(
    createSelector(locationSelector, (currentLocation) => ({
      currentLocation,
    })),
    {
      getLocation,
    }
  )
);

export default enhance(LocationShow);
