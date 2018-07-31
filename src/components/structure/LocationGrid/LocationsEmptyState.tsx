import React, { PureComponent } from 'react';
import { Button } from 'components/common/Button/Button';
import LocationModal from 'components/common/Modal/LocationModal/LocationModal';
import { addLocation } from 'reducers/locations/location/reducer';
import { connect } from 'react-redux';

interface IProps {
  addLocation(values: IItemData, promise: IPromiseCallback): IAction;
}

interface IState {
  isLocationModalOpen: boolean;
}

class LocationsEmptyState extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isLocationModalOpen: false,
    };
  }

  toggleModal = (isOpen) => () => {
    this.setState({
      isLocationModalOpen: isOpen,
    });
  };

  render() {
    const { addLocation } = this.props;
    const { isLocationModalOpen } = this.state;

    return (
      <div className="wrap-page-letter wrap-page-letter--no-items">
        <LocationModal
          isOpen={isLocationModalOpen}
          onSubmit={addLocation}
          onClose={this.toggleModal(false)}
        />

        <div className="wrap-page-letter wrap-page-letter--no-location">
          <div className="page-letter-block">
            <div className="page-letter-block-box-img">
              <img
                className="page-letter-block-img"
                src="/images/lamp-table.png"
                alt="barcode"
              />
            </div>
            <h1 className="header-title title-pb">No locations yet</h1>
            <div className="button-centr">
              <Button
                className="btn btn-inventor btn-lime"
                onClick={this.toggleModal(true)}
              >
                <img
                  className="header-plus"
                  src="/images/plus.svg"
                  alt="plus"
                />
                <span className="title-header-btn">Create location</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const enhance = connect(null, { addLocation });

export default enhance(LocationsEmptyState);
