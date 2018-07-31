import React from 'react';
import DropdownMenu from 'components/common/DropdownMenu/DropdownMenu';
import { Link } from 'react-router-dom';

interface IProps {
  location: ILocationData;
  className?: string;
  onEdit(location: ILocationData): void;
}

interface IState {
  isMenuOpen: boolean;
}

class LocationCard extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outsideClick);
  }

  openDropdownMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isMenuOpen: true });

    document.addEventListener('click', this.outsideClick);
    return false;
  };

  outsideClick = () => {
    this.setState({ isMenuOpen: false });
    document.removeEventListener('click', this.outsideClick);
  };

  getMenuOptions = (): IMenuOption[] => {
    const { location, onEdit } = this.props;
    return [
      {
        label: 'Edit',
        onClick: () => onEdit(location),
      },
      {
        label: 'Rename',
        disabled: true,
      },
      {
        label: 'Create Inventory',
        disabled: true,
      },
    ];
  };

  render() {
    const { location, className } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <div className={className}>
        <Link
          to={`/structure/locations/${location.public_id}`}
          className="structure-element"
        >
          <div className="structure-element-top-row">
            <span className="structure-element-title">{location.name}</span>
            <div
              className="structure-element-control relative"
              onClick={this.openDropdownMenu}
            >
              <img
                className="control"
                src="/images/control.svg"
                alt="control"
              />
              <DropdownMenu
                isOpen={isMenuOpen}
                options={this.getMenuOptions()}
              />
            </div>
          </div>
          <div className="structure-element-bottom">
            <span className="structure-element-items">
              {location.items_count || 0} items
            </span>
            <span className="structure-element-colaborators">
              {location.collaborators_count || 0} colaborators
            </span>
          </div>
        </Link>
      </div>
    );
  }
}

export default LocationCard;
