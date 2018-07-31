import React from 'react';
import { Form } from 'react-final-form';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import Field from 'components/common/Form/Field';
import TextInput from 'components/common/Form/TextInput';
import { required } from 'helpers/validators';
import Error from 'components/common/Form/Error';
import cn from 'classnames';

const inputsData = [
  {
    id: 'jm95',
    label: 'Full name',
    value: 'Enter',
    name: 'fullname',
    error: 'Full name required',
  },
  {
    id: 'jGj7',
    label: 'Location',
    value: 'Enter',
    name: 'location',
    error: 'Location required',
  },
  {
    id: 'jG65',
    label: 'Phone',
    value: 'Enter',
    name: 'phone',
    error: 'Phone required',
  },
  {
    id: 'jGjy',
    label: 'Company name',
    value: 'Enter',
    name: 'company_name',
    error: 'Company name required',
  },
  {
    id: 'jGg6',
    label: 'Position',
    value: 'Enter',
    name: 'position',
    error: 'Position required',
  },
];

const selectsData = [
  {
    id: 'jG65',
    label: 'Time zone',
    name: 'timezone',
    select_list: [
      {
        id: '(GMT-04:00)Eastern Time',
        name: '(GMT-04:00)Eastern Time',
      },
      {
        id: '(GMT-05:00)Eastern Time',
        name: '(GMT-05:00)Eastern Time',
      },
    ],
  },
  {
    id: 'jGht',
    label: 'Date format',
    name: 'date_format',
    select_list: [
      {
        id: 'dd/mm/yy',
        name: 'dd/mm/yy',
      },
      {
        id: 'mm/dd/yy',
        name: 'mm/dd/yy',
      },
    ],
  },
];

const checkboxesData = [
  {
    id: 'jh5r',
    name: 'system_notifications',
    title: 'System notification',
    sub_title: 'Get notifications when changes happen in your account',
  },
  {
    id: 'jn8r',
    name: 'push_notifications',
    title: 'Push notifications',
    sub_title: 'Enable push for your planning actions',
  },
  {
    id: 'jhn8',
    name: 'newsletter',
    title: 'Newsletter',
    sub_title: 'Get updates on new features activated for your account',
  },
];

class ProfileUserBio extends React.Component<any> {
  private renderForm = () => {
    const {
      isFullnameSkipped,
      isLocationSkipped,
      isPhoneSkipped,
      isCompanySkipped,
      isPositionSkipped,
    } = this.props;

    const inputRow = inputsData.map((x) => (
      <div key={x.id} className="row mb-10">
        <label className="col-2 list-text">{x.label}</label>
        <div className="col-10">
          <div className="posr">
            <Field
              validate={required}
              name={x.name}
              component={TextInput}
              placeholder={x.value}
              className={cn('form-control form-control-sm', {
                invalid:
                  (isFullnameSkipped && x.name === 'fullname') ||
                  (isLocationSkipped && x.name === 'location') ||
                  (isPhoneSkipped && x.name === 'phone') ||
                  (isCompanySkipped && x.name === 'company_name') ||
                  (isPositionSkipped && x.name === 'position'),
              })}
            />
            <Error
              meta={{
                touched:
                  (isFullnameSkipped && x.name === 'fullname') ||
                  (isLocationSkipped && x.name === 'location') ||
                  (isPhoneSkipped && x.name === 'phone') ||
                  (isCompanySkipped && x.name === 'company_name') ||
                  (isPositionSkipped && x.name === 'position'),
                active: false,
                error: x.error,
              }}
              inline
            />
          </div>
        </div>
      </div>
    ));

    const selectRow = selectsData.map((x) => (
      <div key={x.id} className="row mb-10">
        <label className="col-2 list-text">{x.label}</label>
        <div className="col-5">
          <Field
            name={x.name}
            validate={required}
            component={DefaultSelect}
            options={[
              {
                id: '',
                name:
                  x.name === 'timezone'
                    ? this.props.data.timezone
                    : this.props.data.date_format,
              },
            ]
              .concat(x.select_list)
              .map((el) => ({
                value: el.id,
                label: el.name,
              }))}
          />
        </div>
      </div>
    ));

    const checkboxRow = checkboxesData.map((x) => (
      <div key={x.id} className="pseudo-checkbox-holder  notifications-holder">
        <div
          id={x.name}
          onClick={this.props.toggleTogglable}
          className="pseudo-checkbox"
        >
          {this.props.data[x.name] ? (
            <img
              className="svg-checkmark"
              src="/images/marker-ready.svg"
              alt="icon-checkmark"
            />
          ) : null}
        </div>
        <div className="title">{x.title}</div>
        <div className="sub-title">{x.sub_title}</div>
      </div>
    ));

    const { onChange, data, handleSubmit, toggleTogglable } = this.props;

    return (
      <>
        <form onChange={onChange} className="account-body container">
          {inputRow}
          {selectRow}
          <div className="row mb-10">
            <label className="col-2 list-text">Color theme</label>
            <div className="col-1 df-sb">
              <div className="wrap-account-btn">
                <button
                  id="is_theme_dark"
                  onClick={toggleTogglable}
                  type="button"
                  className={cn('style-btn-non btn-radio-account', {
                    active: !data.is_theme_dark,
                  })}
                >
                  Light
                </button>
                <button
                  id="is_theme_dark"
                  onClick={toggleTogglable}
                  type="button"
                  className={cn('style-btn-non btn-radio-account', {
                    active: data.is_theme_dark,
                  })}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>

          <div className="account-checkbox-block container">{checkboxRow}</div>
        </form>
        <button
          onClick={handleSubmit}
          type="button"
          className="style-btn-non button-foot text-white"
        >
          Save Changes
        </button>
      </>
    );
  };

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <Form
        onSubmit={handleSubmit}
        render={this.renderForm}
        initialValues={data}
      />
    );
  }
}

export default ProfileUserBio;
