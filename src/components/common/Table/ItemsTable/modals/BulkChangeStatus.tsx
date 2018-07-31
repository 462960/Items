import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import Button from 'components/common/Button/Button';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { itemsStatusesSelector } from 'reducers/statuses/itemStatusesList/selectors';
import messages from '../translate';
import { createSelector } from 'reselect';

const formId = 'bulkChangeStatus';

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
  itemStatuses: any[];
}

class BulkChangeStatusModalContent extends React.PureComponent<IProps> {
  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const { itemStatuses } = this.props;
    const options = [{ value: '', label: 'Select' }].concat(
      itemStatuses.map((is) => ({ label: is.name, value: is.public_id }))
    );
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;

    return (
      <form onSubmit={handleSubmit} id={formId}>
        <div className="row mb-10">
          <label className="col-sm-5 list-text">Select Status</label>
          <div className="col-sm-7">
            <Field name="status" component={DefaultSelect} options={options} />
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
  createSelector(itemsStatusesSelector, (itemStatuses) => ({
    itemStatuses,
  }))
);

export default {
  formId,
  actions,
  content: enhance(BulkChangeStatusModalContent),
  title: (ids: string[]) => <div>Change Status for {ids.length} items</div>,
};
