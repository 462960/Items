import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import Button from 'components/common/Button/Button';
import { FormattedMessage } from 'react-intl';
import { getLocations } from 'reducers/locations/locationsList/reducer';
import { connect } from 'react-redux';
import messages from '../translate';

const formId = 'bulkChangeLocation';

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
  locations: any[];
  getLocations(): void;
}

class BulkChangeLocationModalContent extends React.PureComponent<IProps> {
  componentDidMount() {
    const { getLocations } = this.props;
    getLocations();
  }

  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const { locations } = this.props;
    const options = [{ value: '', label: 'Select' }].concat(
      locations.map((l) => ({ label: l.name, value: l.public_id }))
    );
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;

    return (
      <form onSubmit={handleSubmit} id={formId}>
        <div className="row mb-10">
          <label className="col-sm-5 list-text">Select Location</label>
          <div className="col-sm-7">
            <Field
              name="location"
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
    locations: state.getIn(['locationsList', 'locations']).toJS(),
  }),
  {
    getLocations,
  }
);

export default {
  formId,
  actions,
  content: enhance(BulkChangeLocationModalContent),
  title: (ids: string[]) => (
    <div>Change Location for {ids.length} collaborators</div>
  ),
};
