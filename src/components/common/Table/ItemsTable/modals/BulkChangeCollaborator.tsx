import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import Button from 'components/common/Button/Button';
import { FormattedMessage } from 'react-intl';
import { getCollaborators } from 'reducers/collaborators/collaboratorsList/reducer';
import { connect } from 'react-redux';
import messages from '../translate';

const formId = 'bulkChangeCollaborator';

const submitForm = () => {
  document
    .getElementById(formId)
    .dispatchEvent(new Event('submit', { cancelable: true }));
};

const actions = ({ onCancel, submitting }) => [
  <Button
    className="btn btn-inventor btn-white"
    key="cancel"
    onClick={onCancel}
  >
    <img className="header-plus" src="/images/cancel.svg" alt="cancel" />
    <span className="title-header-btn">
      <FormattedMessage {...messages.cancel} />
    </span>
  </Button>,
  <Button
    className="btn btn-inventor btn-lime"
    key="addItem"
    onClick={submitForm}
    disabled={submitting}
  >
    <span className="title-header-btn">
      <FormattedMessage {...messages.change} />
    </span>
  </Button>,
];

interface IProps {
  onSubmit(values: object): any;
  collaborators: any[];
  getCollaborators(): void;
}

class BulkChangeCollaboratorModalContent extends React.PureComponent<IProps> {
  componentDidMount() {
    const { getCollaborators } = this.props;
    getCollaborators();
  }

  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const { collaborators } = this.props;
    const options = [{ value: '', label: 'Select' }].concat(
      collaborators.map((c) => ({ label: c.name, value: c.public_id }))
    );
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;

    return (
      <form onSubmit={handleSubmit} id={formId}>
        <div className="row mb-10">
          <label className="col-sm-5 list-text">Select Collaborator</label>
          <div className="col-sm-7">
            <Field
              name="collaborator"
              component={DefaultSelect}
              options={options}
            />
          </div>
        </div>
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

const enhance: any = connect(
  (state: any) => ({
    collaborators: state.getIn(['collaboratorsList', 'collaborators']).toJS(),
  }),
  {
    getCollaborators,
  }
);

export default {
  formId,
  actions,
  content: enhance(BulkChangeCollaboratorModalContent),
  title: (ids: string[]) => (
    <div>Change Collaborator for {ids.length} items</div>
  ),
};
