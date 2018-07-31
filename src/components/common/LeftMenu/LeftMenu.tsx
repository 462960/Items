import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from './translate';

interface IState {
  isCollapsed: boolean;
}

const menuContent = [
  {
    link: '/dashboard',
    alt: 'Dashboard',
    translateKey: 'dashboard',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#dashboard',
  },
  {
    link: '/structure',
    alt: 'Structure',
    translateKey: 'structure',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#structure',
  },
  {
    link: '/items',
    alt: 'Items',
    translateKey: 'items',
    svg: '/images/sprite.svg#item',
  },
  {
    link: '/inventory',
    alt: 'Inventory',
    translateKey: 'inventory',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#inventory',
  },
  {
    link: '/reports',
    alt: 'Reports',
    translateKey: 'reports',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#reports',
  },
  {
    link: '/planning',
    alt: 'Planning',
    translateKey: 'planning',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#planning',
  },
  {
    link: '/scanner',
    alt: 'Barcode Scanner',
    translateKey: 'scanner',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#scanner',
  },
  {
    link: '/admin',
    alt: 'Admin Panel',
    translateKey: 'adminPanel',
    className: 'left-menu-items__disabled',
    svg: '/images/sprite.svg#admin',
    iconClassName: '--pink',
  },
];

class LeftMenu extends React.PureComponent<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: false,
    };
  }

  private toggleCollapse = () => {
    this.setState((state) => ({ isCollapsed: !state.isCollapsed }));
  };

  private renderMenuItem = ({
    link,
    img,
    alt,
    translateKey,
    className,
    svg,
    iconClassName,
  }) => {
    return (
      <NavLink
        to={link}
        className={cn('left-menu-items color-main', className)}
        key={alt}
      >
        <div className="left-menu-items-icon">
          <div className="left-menu-items-icon-wrapper">
            {svg ? (
              <svg className={cn('left-menu-title-icon-inside', iconClassName)}>
                <use xlinkHref={svg} />
              </svg>
            ) : (
              <img
                className="left-menu-title-icon-inside"
                src={img}
                alt={alt}
              />
            )}
          </div>
        </div>
        <div className="left-menu-items-text">
          <div className="left-menu-items-text-wrapper font-default">
            <FormattedMessage {...messages[translateKey]} />
          </div>
        </div>
      </NavLink>
    );
  };

  render() {
    const { isCollapsed } = this.state;

    return (
      <div className={cn('wrap-left-menu', { '-collapsed': isCollapsed })}>
        <div className="left-menu-wrap-title">
          <div className="left-menu-title-icon" onClick={this.toggleCollapse}>
            <div>
              <img
                className="left-menu-title-icon-inside"
                src="/images/menu-icon.svg"
                alt="collapse menu"
              />
            </div>
          </div>
          <div className="left-menu-title-text">
            <NavLink to="/dashboard">
              <img
                className="left-menu-title-text-inside"
                src="/images/logo-white.svg"
                alt="Inventory"
              />
            </NavLink>
          </div>
        </div>

        {menuContent.map(this.renderMenuItem)}
      </div>
    );
  }
}

export default withRouter(LeftMenu);
