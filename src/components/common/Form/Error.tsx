import React from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';

class Error extends React.PureComponent<IInput> {
  static defaultProps = {
    allowShowPassword: false,
  };

  render() {
    const {
      meta: { touched, error: validationError, submitError, active },
      placeholder,
      errorStyle = {},
    } = this.props;
    const error = validationError || submitError;

    if (!touched || !error || active) return null;

    const errorMsg =
      typeof error === 'object' ? (
        <FormattedMessage
          {...error}
          values={{
            fieldName: placeholder,
            ...error.values,
          }}
        />
      ) : (
        error
      );

    return (
      <div className={cn('error')} style={errorStyle}>
        {errorMsg}
      </div>
    );
  }
}

export default Error;
