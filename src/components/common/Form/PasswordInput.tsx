import React from 'react';
import cn from 'classnames';
import Error from './Error';

interface IState {
  isPasswordShown: boolean;
}

class PasswordInput extends React.PureComponent<IPasswordInput, IState> {
  static defaultProps = {
    allowShowPassword: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isPasswordShown: false,
    };
  }

  private togglePaswordShown = () => {
    this.setState((state) => ({
      isPasswordShown: !state.isPasswordShown,
    }));
  };

  render() {
    const {
      input,
      meta: { touched, error: validationError, submitError, active },
      className,
      wrapperClassName,
      placeholder,
      allowShowPassword,
    } = this.props;
    const { isPasswordShown } = this.state;
    const error = validationError || submitError;
    const invalid = Boolean(touched && error && !active);

    return (
      <div className={cn('form-group', wrapperClassName, { active, invalid })}>
        <input
          {...input}
          type={isPasswordShown ? 'text' : 'password'}
          className={cn('form-control password-input', { invalid }, className)}
          placeholder={placeholder}
        />
        {allowShowPassword && (
          <img
            src={`/images/${isPasswordShown ? 'eye-slash.svg' : 'eye.png'}`}
            className="eays-login"
            alt="Show"
            onClick={this.togglePaswordShown}
          />
        )}
        <Error {...this.props} />
      </div>
    );
  }
}

export default PasswordInput;
