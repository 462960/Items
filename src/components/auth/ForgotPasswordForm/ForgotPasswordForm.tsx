import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import { FormattedMessage, injectIntl } from 'react-intl';
import TextInput from 'components/common/Form/TextInput';
import Button from 'components/common/Button/Button';
import { required, validateEmail, composeValidators } from 'helpers/validators';
import messages from './translate';
interface IProps {
  onSubmit(values: IFogotPasswordData): Promise<any>;
}

class ForgotPasswordForm extends React.PureComponent<IProps & IWithIntl> {
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
        <div className="wrap-title-login">
          <p className="title-login">
            <FormattedMessage {...messages.title} />
          </p>
        </div>
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
          name="email"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          component={TextInput}
          type="text"
          validate={composeValidators(required, validateEmail)}
          placeholder={formatMessage(messages.email)}
        />
        <Field
          wrapperClassName="m-b-10"
          name="company"
          errorStyle={{
            background:
              'linear-gradient(#E5E9ED, #E5E9ED 50%, #fff 50%, #fff 50%)',
          }}
          component={TextInput}
          validate={required}
          placeholder={formatMessage(messages.company)}
        />
        <Button
          className="btn btn-login w-100 mt-3 mb-3"
          onClick={handleSubmit}
          disabled={submitting}
        >
          <FormattedMessage {...messages.btnSubmit} />
        </Button>
      </form>
    );
  };

  render() {
    const { onSubmit } = this.props;

    return <Form validateOnBlur onSubmit={onSubmit} render={this.renderForm} />;
  }
}

const enhance = injectIntl;

export default enhance<IProps>(ForgotPasswordForm);
