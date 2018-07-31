import React from 'react';
import cn from 'classnames';
import Error from './Error';

interface IProps extends IInput {
  options: ISelectOption[];
}

class DefaultSelect extends React.PureComponent<IProps> {
  render() {
    const {
      options,
      input,
      meta: { touched, error: validationError, submitError, active },
      className,
      wrapperClassName,
      disabled,
    } = this.props;
    const error = validationError || submitError;
    const invalid = Boolean(touched && error && !active);

    return (
      <div
        className={cn('form-group mb-0', wrapperClassName, {
          active,
          invalid,
        })}
      >
        <select
          className={cn(
            'form-control form-control-sm select-custom-arrow',
            className,
            { invalid }
          )}
          {...input}
          disabled={disabled}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Error {...this.props} />
      </div>
    );
  }
}

export default DefaultSelect;
