import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import TextInput from 'components/common/Form/TextInput';
import Error from 'components/common/Form/Error';
import { required } from 'helpers/validators';
import cn from 'classnames';
import Calendar from 'react-calendar';
import { CSSTransition } from 'react-transition-group';
import DefaultSelect from 'components/common/Form/DefaultSelect';
import isEmpty from 'lodash.isempty';

const inputsData = [
  {
    id: 'jm95',
    label: 'Title',
    value: 'Enter',
    name: 'title',
  },
  {
    id: 'jGj7',
    label: 'Description',
    value: 'Enter',
    name: 'description',
  },
];

class AddTask extends React.Component<any> {
  private renderForm = ({ handleSubmit }) => {
    const inputRow = inputsData.map((x) => (
      <div onClick={this.props.onBlur} key={x.id} className="row mb-10">
        <label className="col-2 list-text">{x.label}</label>
        <div className="col-10">
          <Field
            className="form-control form-control-sm"
            validate={x.name === 'description' ? null : required}
            name={x.name}
            component={TextInput}
            placeholder={x.value}
          />
        </div>
      </div>
    ));

    const {
      onChange,
      isNotificationAdded,
      onBlur,
      isDateOpen,
      isDeadlineOpen,
      pickDateFirst,
      disabled,
      toggleTogglable,
      openDatepickers,
      usersList,
      inventoriesList,
      tasksStatusesList,
      pickDate,
      pickDeadLine,
      currentDate,
      deadline,
      date,
      isDateSkipped,
      isDeadlineSkipped,
      resetDatepicker,
    } = this.props;

    return (
      <div className=" pad-0">
        <form
          onChange={onChange}
          onSubmit={handleSubmit}
          className="pad-0 container"
          id="addTaskForm"
        >
          {inputRow}

          {/* Pick Date */}
          <div
            style={{ zIndex: 3, position: 'relative' }}
            className="row mb-10"
          >
            <label className="col-2 list-text">Date</label>
            <div className="col-10">
              <div className="posr">
                <div
                  id="isDateOpen"
                  onClick={openDatepickers}
                  className={cn('form-control form-control-sm', {
                    invalid: isDateSkipped && isEmpty(date),
                  })}
                >
                  <CSSTransition
                    in={isDateOpen}
                    classNames="fade"
                    timeout={650}
                  >
                    {isDateOpen ? (
                      <Calendar onChange={pickDate} value={currentDate} />
                    ) : date.length > 0 ? (
                      <span>{date}</span>
                    ) : (
                      <span style={{ pointerEvents: 'none' }}>
                        Pick the date
                      </span>
                    )}
                  </CSSTransition>
                  {!isEmpty(date) ? (
                    <div
                      onClick={resetDatepicker}
                      className="datepicker-clear"
                    />
                  ) : null}
                </div>
                {isDateSkipped && isEmpty(date) ? (
                  <Error
                    meta={{
                      touched: true,
                      active: false,
                      error: 'Pick the date',
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Pick Deadline */}
          <div
            style={{ zIndex: 2, position: 'relative' }}
            className="row mb-10"
          >
            <label className="col-2 list-text">Deadline</label>
            <div className="col-10">
              <div className="posr">
                <div
                  id="isDeadlineOpen"
                  onClick={openDatepickers}
                  className={cn('form-control form-control-sm', {
                    invalid: isDeadlineSkipped && isEmpty(deadline),
                  })}
                >
                  <CSSTransition
                    in={isDeadlineOpen}
                    classNames="fade"
                    timeout={650}
                  >
                    {isDeadlineOpen ? (
                      <Calendar onChange={pickDeadLine} value={currentDate} />
                    ) : deadline.length > 0 ? (
                      <span>{deadline}</span>
                    ) : pickDateFirst ? (
                      <span style={{ color: 'red', pointerEvents: 'none' }}>
                        Please, pick the date first
                      </span>
                    ) : (
                      <span style={{ pointerEvents: 'none' }}>
                        Pick the deadline
                      </span>
                    )}
                  </CSSTransition>
                  {!isEmpty(deadline) ? (
                    <div
                      onClick={resetDatepicker}
                      id="deadlineReset"
                      className="datepicker-clear"
                    />
                  ) : null}
                </div>
                {isDeadlineSkipped && isEmpty(deadline) ? (
                  <Error
                    meta={{
                      touched: true,
                      active: false,
                      error: 'Pick the deadline',
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Assignee select, required */}
          <div style={{ zIndex: 1 }} className="row mb-10">
            <label className="col-2 list-text">Assignee</label>
            <div onClick={onBlur} className="col-10">
              <Field
                validate={required}
                name="assignee"
                component={DefaultSelect}
                options={[
                  {
                    public_id: '',
                    username: 'Select',
                  },
                ]
                  .concat(usersList.data)
                  .map((status) => ({
                    value: status.public_id,
                    label: status.username,
                  }))}
                disabled={disabled}
              />
            </div>
          </div>

          {/* Statuses select, required */}
          <div style={{ zIndex: 1 }} className="row mb-10">
            <label className="col-2 list-text">Status</label>
            <div className="col-10">
              <Field
                validate={required}
                name="status"
                component={DefaultSelect}
                options={[
                  {
                    public_id: '',
                    label: 'Select',
                  },
                ]
                  .concat(tasksStatusesList.data)
                  .map((status) => ({
                    value: status.public_id,
                    label: status.label,
                  }))}
                disabled={disabled}
              />
            </div>
          </div>

          {/* Inventory select, not required */}
          <div style={{ zIndex: 1 }} className="row mb-10">
            <label className="col-2 list-text">Inventory</label>
            <div className="col-10">
              <Field
                name="inventory"
                component={DefaultSelect}
                options={[
                  {
                    public_id: '',
                    label: 'Select',
                  },
                ]
                  .concat(inventoriesList.data)
                  .map((inv) => ({
                    value: inv.public_id,
                    label: inv.label,
                  }))}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="account-checkbox-block container">
            <div className="row">
              <label className="col-2 list-text" />
              <div className="col-10">
                <div className="pseudo-checkbox-holder  notifications-holder">
                  <div
                    id="isNotificationAdded"
                    onClick={toggleTogglable}
                    className="pseudo-checkbox"
                  >
                    {isNotificationAdded ? (
                      <img
                        className="svg-checkmark"
                        src="/images/marker-ready.svg"
                        alt="icon-checkmark"
                      />
                    ) : null}
                  </div>
                  <div className="title">Notification</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form validateOnBlur onSubmit={handleSubmit} render={this.renderForm} />
    );
  }
}

export default AddTask;
