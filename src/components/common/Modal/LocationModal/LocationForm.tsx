import React from 'react';
import { Form } from 'react-final-form';
import Field from 'components/common/Form/Field';
import TextInput from 'components/common/Form/TextInput';
import { required } from 'helpers/validators';
import CollaboratorsList from './CollaboratorsList';
import Error from 'components/common/Form/Error';
import cn from 'classnames';

interface IProps {
  edit: boolean;
  handleSubmit(): void;
  initialValues: ICollaboratorData;
  onChange(e: React.FormEvent<HTMLFormElement>): void;
  collaboratorsListIsOpen: boolean;
  collaborator_ids: string[];
  toggleCollaboratorsList(): void;
  updateCollaboratorsList(e: any): void;
  clearCollaboratorsList(): void;
  isNameSkipped?: boolean;
  isDescriptionSkipped?: boolean;
}

const inputsData = [
  {
    id: 'jm95',
    label: 'Name',
    name: 'name',
    error: 'Name required',
  },
  {
    id: 'jGj7',
    label: 'Description',
    name: 'description',
    error: 'Description required',
  },
];

class LocationForm extends React.Component<IProps> {
  private renderForm = ({}) => {
    const {
      onChange,
      collaboratorsListIsOpen,
      collaborator_ids,
      toggleCollaboratorsList,
      updateCollaboratorsList,
      clearCollaboratorsList,
      edit,
      isNameSkipped,
      isDescriptionSkipped,
    } = this.props;

    const inputRow = inputsData.map((x) => (
      <div key={x.id} className="row mb-10">
        <label className="col-3 list-text">{x.label}</label>
        <div className="col-9">
          <div className="posr">
            <Field
              name={x.name}
              validate={required}
              component={TextInput}
              placeholder="Enter"
              className={cn('form-control form-control-sm', {
                invalid:
                  (isNameSkipped && x.name === 'name') ||
                  (isDescriptionSkipped && x.name === 'description'),
              })}
            />
            <Error
              meta={{
                touched:
                  (isNameSkipped && x.name === 'name') ||
                  (isDescriptionSkipped && x.name === 'description'),
                active: false,
                error: x.error,
              }}
              inline
            />
          </div>
        </div>
      </div>
    ));

    return (
      <form onChange={onChange}>
        {inputRow}
        <div className="row mb-10">
          <label className="col-3 list-text">Collaborators</label>
          <CollaboratorsList
            disabled={edit}
            collaboratorsListIsOpen={collaboratorsListIsOpen}
            toggleCollaboratorsList={toggleCollaboratorsList}
            clearCollaboratorsList={clearCollaboratorsList}
            className="col-9"
            updateCollaboratorsList={updateCollaboratorsList}
            collaborator_ids={collaborator_ids}
          />
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

export default LocationForm;
