import React from 'react';
import { connect } from 'react-redux';
import { getLocations } from 'reducers/locations/locationsList/reducer';
import { locationsSelector } from 'reducers/locations/locationsList/selectors';
import { createSelector } from 'reselect';
import LocationCard from 'components/structure/LocationCard/LocationCard';
import LocationModal from 'components/common/Modal/LocationModal/LocationModal';
import { editLocation, addLocation } from 'reducers/locations/location/reducer';
import Button from 'components/common/Button/Button';
import CoffeeSpinner from 'components/common/CoffeeSpinner/CoffeeSpinner';
import AbsoluteLayer from 'components/common/AbsoluteLayer/AbsoluteLayer';
import LocationsEmptyState from './LocationsEmptyState';
import withPromise from 'helpers/withPromise';

interface IProps {
  locations: ILocationData[];
  getLocations(): IAction;
  editLocation(values: ILocationData, promise?: IPromiseCallback): IAction;
  addLocation(formValues: ILocationData, promise?: IPromiseCallback): IAction;
}

interface IState {
  editableLocation?: ILocationData;
  isAddLocationModalOpen: boolean;
  loading: boolean;
}

class LocationGrid extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      editableLocation: null,
      isAddLocationModalOpen: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { getLocations } = this.props;
    this.setState({ loading: true });
    withPromise(getLocations)
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  closeLocationModal = () => {
    this.setState({ editableLocation: null });
  };

  onEdit = (location: ILocationData) => {
    this.setState({ editableLocation: location });
  };

  toggleAddLocationModal = (isOpen) => () => {
    this.setState({
      isAddLocationModalOpen: isOpen,
    });
  };

  render() {
    const { locations, editLocation, addLocation } = this.props;
    const { editableLocation, isAddLocationModalOpen, loading } = this.state;

    return (
      <div className="wrap-adaptive-content">
        <AbsoluteLayer className="table-loding-layer" show={loading}>
          <CoffeeSpinner />
        </AbsoluteLayer>
        {!loading && !locations.length && <LocationsEmptyState />}
        {Boolean(locations.length) && (
          <div>
            <div>
              <Button
                className="btn btn-inventor btn-white m-t-15 m-b-15"
                onClick={this.toggleAddLocationModal(true)}
              >
                <svg className="svg-bookmark">
                  <use xlinkHref="/images/sprite.svg#add" />
                </svg>
                <span className="title-header-btn m-r-10 m-l-10">
                  Add Location
                </span>
              </Button>
            </div>

            <LocationModal
              isOpen={isAddLocationModalOpen}
              onSubmit={addLocation}
              onClose={this.toggleAddLocationModal(false)}
            />
            <div className="container-fluid pad-0">
              <LocationModal
                edit
                initialValues={editableLocation}
                isOpen={Boolean(editableLocation)}
                onSubmit={editLocation}
                onClose={this.closeLocationModal}
              />
              <div className="row">
                {locations.map((location) => (
                  <LocationCard
                    onEdit={this.onEdit}
                    location={location}
                    className="col-xl-4 col-lg-6 col-md-12"
                    key={location.public_id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const enhance: any = connect(
  createSelector(locationsSelector, (locations) => ({
    locations,
  })),
  { getLocations, editLocation, addLocation }
);

export default enhance(LocationGrid);
