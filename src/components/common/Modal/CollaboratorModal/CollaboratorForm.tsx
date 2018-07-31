import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import TextInput from 'components/common/Form/TextInput';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import { required } from 'helpers/validators';
import { connect } from 'react-redux';
import { getLocations } from 'reducers/locations/locationsList/reducer';
import Error from 'components/common/Form/Error';
import cn from 'classnames';
import Calendar from 'react-calendar';
import { CSSTransition } from 'react-transition-group';
import isEmpty from 'lodash.isempty';

class CollaboratorForm extends React.Component<any> {
  componentDidMount() {
    this.props.getLocations();
  }

  private renderForm = ({}) => {
    const {
      onChange,
      locationsList,
      edit,
      isNameSkipped,
      toggleDatepicker,
      isDatepickerOpen,
      pickDate,
      currentDate,
      date,
      resetDatepicker,
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
          <label className="col-3 list-text">Position</label>
          <div className="col-9">
            <Field
              className="form-control form-control-sm"
              name="position"
              component={TextInput}
              placeholder="Enter"
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-3 list-text">Location</label>
          <div className="col-9 posr">
            <Field
              name="location"
              component={DefaultSelect}
              options={[
                {
                  public_id: '',
                  name: 'Select',
                },
              ]
                .concat(locationsList)
                .map((el) => ({
                  value: el.public_id,
                  label: el.name,
                }))}
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-3 list-text">Phone number</label>
          <div className="col-9">
            <Field
              className="form-control form-control-sm"
              name="phone_number"
              component={TextInput}
              placeholder="Enter"
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-3 list-text">Email</label>
          <div className="col-9">
            <Field
              disabled={edit}
              className="form-control form-control-sm"
              name="email"
              component={TextInput}
              placeholder="Enter"
            />
          </div>
        </div>
        <div className="row mb-10">
          <label className="col-3 list-text">Birthday</label>
          <div className="col-9">
            <div className="posr">
              <div
                onClick={toggleDatepicker}
                className="form-control form-control-sm"
              >
                <CSSTransition
                  in={isDatepickerOpen}
                  classNames="fade"
                  timeout={650}
                >
                  {isDatepickerOpen ? (
                    <Calendar onChange={pickDate} value={currentDate} />
                  ) : date.length > 0 ? (
                    <span>{date}</span>
                  ) : (
                    <span style={{ pointerEvents: 'none' }}>Pick the date</span>
                  )}
                </CSSTransition>
                {!isEmpty(date) ? (
                  <div onClick={resetDatepicker} className="datepicker-clear" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <Form
        onSubmit={handleSubmit}
        render={this.renderForm}
        initialValues={initialValues}
      />
    );
  }
}

export default connect(
  (state: IStore) => ({
    locationsList: state.getIn(['locationsList', 'locations']).toJS(),
  }),
  { getLocations }
)(CollaboratorForm) as any;
