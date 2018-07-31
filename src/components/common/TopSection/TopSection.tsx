import React from 'react';
import cn from 'classnames';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

class TopSection extends React.PureComponent<IProps> {
  render() {
    const { children, className } = this.props;

    return <div className={cn('wrap-header', className)}>{children}</div>;
  }
}

export default TopSection;
