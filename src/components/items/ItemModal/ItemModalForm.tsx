import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import TextInput from 'components/common/Form/TextInput';
import Field from 'components/common/Form/Field';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import Dropzone from 'components/common/Form/Dropzone';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './translate';
import { required } from 'helpers/validators';
import { getCollaborators } from 'reducers/collaborators/collaboratorsList/reducer';
import { getLocations } from 'reducers/locations/locationsList/reducer';
import { getItemStatuses } from 'reducers/statuses/itemStatusesList/reducer';

interface IProps {
  initialValues?: IItemData;
  formId: string;
  onSubmit(values: object): any;
  onChange?(): void;
}

interface IConnectedProps extends IWithIntl {
  getCollaborators(): IAction;
  getItemStatuses(): IAction;
  getLocations(): IAction;
  locations: ILocationData[];
  collaborators: ICollaboratorData[];
  itemStatuses: IStatus[];
}

class ItemModalForm extends React.PureComponent<IProps & IConnectedProps> {
  componentDidMount() {
    const { getCollaborators, getItemStatuses, getLocations } = this.props;

    getCollaborators();
    getLocations();
    getItemStatuses();
  }

  private renderForm = ({
    handleSubmit,
    submitting,
    submitError,
    dirtySinceLastSubmit,
  }) => {
    const {
      formId,
      intl: { formatMessage },
      onChange,
      collaborators,
      locations,
      itemStatuses,
    } = this.props;
    const isShowSubmitError =
      Boolean(submitError) && !dirtySinceLastSubmit && !submitting;
    const defaultOption: ISelectOption = { value: '', label: 'Select' };
    const locationOptions: ISelectOption[] = [defaultOption].concat(
      locations.map((l) => ({ value: l.public_id, label: l.name }))
    );
    const collaboratorOptions: ISelectOption[] = [defaultOption].concat(
      collaborators.map((c) => ({ value: c.public_id, label: c.name }))
    );
    const statusOptions: ISelectOption[] = [defaultOption].concat(
      itemStatuses.map((c) => ({ value: c.public_id, label: c.name }))
    );

    return (
      <form onSubmit={handleSubmit} id={formId} onChange={onChange}>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.nameLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              className="form-control-sm"
              name="name"
              validate={required}
              component={TextInput}
              placeholder={formatMessage(messages.enter)}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.descriptionLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              className="form-control-sm"
              name="description"
              component={TextInput}
              placeholder={formatMessage(messages.enter)}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.barcodeLabel} />
          </label>
          <div className="col-sm-9 posr">
            <Field
              className="form-control-sm pr-100"
              name="barcode"
              validate={required}
              component={TextInput}
              placeholder={formatMessage(messages.barcodePlaceholder)}
            />
            <div className="wrap-scanner">
              <img
                className="icon-scanner"
                src="/images/scanner.svg"
                alt="icon-scanner"
              />
              <FormattedMessage {...messages.barcodeDeviceSelect} />
            </div>
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.serialLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              className="form-control-sm"
              name="serial_number"
              component={TextInput}
              placeholder={formatMessage(messages.enter)}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.locationLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              name="location"
              component={DefaultSelect}
              options={locationOptions}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.collaboratorLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              name="collaborator"
              component={DefaultSelect}
              options={collaboratorOptions}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.statusLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              validate={required}
              name="status"
              component={DefaultSelect}
              options={statusOptions}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.countLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              className="form-control-sm"
              name="count"
              type="integer"
              validate={required}
              component={TextInput}
              placeholder={formatMessage(messages.enter)}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-sm-3 list-text">
            <FormattedMessage {...messages.commentLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              className="form-control-sm"
              name="comment"
              component={TextInput}
              placeholder={formatMessage(messages.enter)}
            />
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 list-text-top">
            <FormattedMessage {...messages.photoLabel} />
          </label>
          <div className="col-sm-9">
            <Field
              name="photos"
              component={Dropzone}
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
                      __html: formatMessage(messages.photoPlaceholder),
                    }}
                  />
                </>
              }
            />
          </div>
        </div>
        {isShowSubmitError && (
          <div className="row m-t-10">
            <div className="error static col-sm-9 offset-sm-3">
              {submitError}
            </div>
          </div>
        )}
      </form>
    );
  };

  render() {
    const { onSubmit, initialValues } = this.props;

    return (
      <Form
        validateOnBlur
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={this.renderForm}
      />
    );
  }
}

const enhance = compose<React.ComponentClass<IProps>>(
  injectIntl,
  connect(
    (state: IStore) => ({
      collaborators: state.getIn(['collaboratorsList', 'collaborators']).toJS(),
      locations: state.getIn(['locationsList', 'locations']).toJS(),
      itemStatuses: state.getIn(['itemStatusesList', 'itemStatuses']).toJS(),
    }),
    {
      getCollaborators,
      getLocations,
      getItemStatuses,
    }
  )
);

export default enhance(ItemModalForm);
