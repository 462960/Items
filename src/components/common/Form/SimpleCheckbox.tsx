import React, { ChangeEvent } from 'react';
import cn from 'classnames';

interface IProps {
  className?: string;
  checked?: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): any;
}

class SimpleCheckbox extends React.PureComponent<IProps> {
  render() {
    const { onChange, className, checked } = this.props;

    return (
      <label className={cn('form-control-checkbox', className)}>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="pseudocheckbox" />
      </label>
    );
  }
}

export default SimpleCheckbox;
