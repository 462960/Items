import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import Dropzone from 'components/common/Form/Dropzone';
import { injectIntl } from 'react-intl';
import messages from './translate';

interface IProps {
  formId: string;
  onSubmit(values: object): any;
}

class ItemModalForm extends React.PureComponent<IWithIntl & IProps> {
  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const {
      formId,
      intl: { formatMessage },
    } = this.props;
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;

    return (
      <form onSubmit={handleSubmit} id={formId}>
        <Field
          name="file"
          component={Dropzone}
          multiple={false}
          placeholder={
            <>
              <img
                className="modal-shape mb-10"
                src="/images/mountain.svg"
                alt="icon-shape"
              />
              <span
                className="list-text"
                dangerouslySetInnerHTML={{
                  __html: formatMessage(messages.filePlaceholder),
                }}
              />
            </>
          }
        />
        {isShowSubmitError && (
          <div className="row m-t-10">
            <div className="error static col-sm-12">{submitError}</div>
          </div>
        )}
      </form>
    );
  };

  render() {
    const { onSubmit } = this.props;

    return <Form validateOnBlur onSubmit={onSubmit} render={this.renderForm} />;
  }
}

const enhance = injectIntl;

export default enhance<IProps>(ItemModalForm);
