import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface ITab {
  to: string;
  label: string | IntlMessage;
}

interface IProps {
  tabs: ITab[];
  className?: string;
}

class TopSection extends React.PureComponent<IProps> {
  private isTabActive = (path) => ({}, location) => {
    return location.pathname + location.search === path;
  };

  render() {
    const { tabs, className } = this.props;

    return (
      <div className={cn('wrap-header-nav', className)}>
        {tabs.map((tab, i) => (
          <NavLink key={i} to={tab.to} isActive={this.isTabActive(tab.to)}>
            {tab.label}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default TopSection;
