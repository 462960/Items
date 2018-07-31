import React, { ReactNode } from 'react';
import cn from 'classnames';

interface IProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): any;
  [x: string]: any;
}

export class Button extends React.PureComponent<IProps> {
  static defaultProps = {
    disabled: false,
  };

  render() {
    const { onClick, className, disabled, children } = this.props;

    return (
      <button
        onClick={onClick}
        className={cn(className, { disabled })}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default Button;
