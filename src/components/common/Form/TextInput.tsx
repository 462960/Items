import React from 'react';
import cn from 'classnames';
import Error from './Error';

const propsForType = {
  integer: {
    type: 'number',
    pattern: '[0-9]*',
  },
};

class TextInput extends React.PureComponent<IInput> {
  static defaultProps = {
    type: 'text',
  };

  private getAdditionalPropsForType = () => {
    const { type } = this.props;
    return propsForType[type] || {};
  };

  render() {
    const {
      input,
      meta: { touched, error: validationError, submitError, active },
      type,
      className,
      wrapperClassName,
      placeholder,
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
        <input
          {...input}
          type={type}
          {...this.getAdditionalPropsForType()}
          className={cn('form-control', className, { invalid })}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Error {...this.props} />
      </div>
    );
  }
}

export default TextInput;
