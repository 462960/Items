import React from 'react';
import LocationGrid from 'components/structure/LocationGrid/LocationGrid';

class Locations extends React.PureComponent {
  render() {
    return (
      <div className="wrap-inventory-block">
        <LocationGrid />
      </div>
    );
  }
}

export default Locations;
