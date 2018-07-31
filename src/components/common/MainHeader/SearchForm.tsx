import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import { injectIntl } from 'react-intl';
import TextInput from 'components/common/Form/TextInput';
import Button from 'components/common/Button/Button';
import messages from './translate';

interface IProps {
  onSubmit(data: any): any;
}

class ForgotPasswordForm extends React.PureComponent<IProps & IWithIntl> {
  private renderForm = ({ handleSubmit, pristine }) => {
    const {
      intl: { formatMessage },
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="col header-left-block">
        <Button
          className="btn header-lupe"
          onClick={handleSubmit}
          type="button"
          disabled={pristine}
        >
          <img src="/images/lupe.svg" alt="search-icon" />
        </Button>
        <Field
          wrapperClassName="m-0"
          className="header-search"
          name="search"
          component={TextInput}
          type="text"
          placeholder={formatMessage(messages.search)}
        />
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
