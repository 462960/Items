import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import TextInput from 'components/common/Form/TextInput';
import { required, validateEmail, composeValidators } from 'helpers/validators';
import Error from 'components/common/Form/Error';
import cn from 'classnames';

class AskQuestionForm extends React.Component<any> {
  private renderForm = ({}) => {
    const {
      comment,
      onChange,
      isNameSkipped,
      isEmailSkipped,
      isCommentSkipped,
    } = this.props;

    return (
      <form onChange={onChange}>
        <div className="row mb-10">
          <label className="col-3 list-text">Name</label>
          <div className="col-9">
            <div className="posr">
              <Field
                className={cn('form-control form-control-sm', {
                  invalid: isNameSkipped,
                })}
                name="name"
                validate={required}
                component={TextInput}
                placeholder="Enter"
              />
              <Error
                meta={{
                  touched: isNameSkipped,
                  active: false,
                  error: 'Enter the name',
                }}
                inline
              />
            </div>
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-3 list-text">Email</label>
          <div className="col-9">
            <div className="posr">
              <Field
                inline
                name="email"
                component={TextInput}
                placeholder="Enter your Email"
                validate={composeValidators(required, validateEmail)}
                className={cn('form-control form-control-sm', {
                  invalid: isEmailSkipped,
                })}
              />
              <Error
                meta={{
                  touched: isEmailSkipped,
                  active: false,
                  error: 'Enter Email',
                }}
                inline
              />
            </div>
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-3 list-text">Comment</label>
          <div className="col-9">
            <div className="posr">
              <textarea
                name="comment"
                placeholder="Ask a question"
                value={comment ? comment : ''}
                onChange={onChange}
                className={cn('form-control form-control-sm textar-h', {
                  invalid: isCommentSkipped,
                })}
              />
              <Error
                meta={{
                  touched: isCommentSkipped,
                  active: false,
                  error: 'Please, do not submit empty form',
                }}
                inline
              />
            </div>
          </div>
        </div>
      </form>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        render={this.renderForm}
        initialValues={this.props}
      />
    );
  }
}

export default AskQuestionForm;
