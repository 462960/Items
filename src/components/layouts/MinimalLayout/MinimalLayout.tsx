import React from 'react';
import cn from 'classnames';

interface IProps {
  children: any;
  className?: string;
}

class MinimalLayout extends React.PureComponent<IProps> {
  render() {
    const { children, className } = this.props;

    return <div className={cn('wrap-login', className)}>{children}</div>;
  }
}

export default MinimalLayout;
