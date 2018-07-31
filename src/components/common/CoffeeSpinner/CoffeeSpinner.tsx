import React from 'react';
import cn from 'classnames';

interface IProps {
  className?: string;
}

class CoffeeSpinner extends React.PureComponent<IProps> {
  render() {
    const { className } = this.props;

    return <div className={cn('coffee-spinner', className)} />;
  }
}

export default CoffeeSpinner;
