import React from 'react';
import cn from 'classnames';

interface IProps {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
}

export class AbsoluteLayer extends React.PureComponent<IProps> {
  render() {
    const { className, children, show } = this.props;

    return (
      <div
        className={cn('absolute-layer', className, {
          '-show': show,
        })}
      >
        {children}
      </div>
    );
  }
}

export default AbsoluteLayer;
