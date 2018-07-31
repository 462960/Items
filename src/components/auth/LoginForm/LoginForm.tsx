import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import { FormattedMessage, injectIntl } from 'react-intl';
import TextInput from 'components/common/Form/TextInput';
import PasswordInput from 'components/common/Form/PasswordInput';
import Button from 'components/common/Button/Button';
import {
  required,
  validateEmail,
  validatePassword,
  composeValidators,
} from 'helpers/validators';
import messages from './translate';
import { logout } from 'reducers/profile/reducer';
import { connect } from 'react-redux';

interface IProps {
  onSubmit(values: ILoginFormData): Promise<any>;
  logout(): any;
}

class LoginForm extends React.PureComponent<IProps & IWithIntl> {
  componentDidMount() {
    this.props.logout();
  }

  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;

    return (
      <form onSubmit={handleSubmit} className="form fg-w">
        {isShowSubmitError && (
          <div
            className="error static m-b-10"
            style={{ background: '#E5E9ED' }}
          >
            {submitError}
          </div>
        )}
        <Field
          wrapperClassName="m-b-10"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          name="email"
          component={TextInput}
          placeholder={formatMessage(messages.email)}
          validate={composeValidators(required, validateEmail)}
        />
        <Field
          wrapperClassName="m-b-10"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          name="password"
          component={PasswordInput}
          placeholder={formatMessage(messages.password)}
          validate={composeValidators(required, validatePassword)}
          allowShowPassword
        />
        <Field
          wrapperClassName="m-b-10"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          name="company"
          component={TextInput}
          placeholder={formatMessage(messages.company)}
          validate={required}
        />
        <Button
          className="btn btn-login w-100 mt-3 mb-3"
          onClick={handleSubmit}
          disabled={submitting}
        >
          <FormattedMessage {...messages.signIn} />
        </Button>
      </form>
    );
  };

  render() {
    const { onSubmit } = this.props;

    return <Form validateOnBlur onSubmit={onSubmit} render={this.renderForm} />;
  }
}

const enhancedForm = injectIntl<IProps>(LoginForm);

export default connect(null, {
  logout,
})(enhancedForm);
