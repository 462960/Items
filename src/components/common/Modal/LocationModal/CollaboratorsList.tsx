import React from 'react';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { getCollaborators } from 'reducers/collaborators/collaboratorsList/reducer';
import { collaboratorsSelector } from 'reducers/collaborators/collaboratorsList/selectors';
import { createSelector } from 'reselect';
import get from 'lodash.get';

interface IProps {
  disabled: boolean;
  getCollaborators(promise?: IPromiseCallback): IAction;
  className?: string;
  updateCollaboratorsList(): void;
  collaborator_ids: string[];
  collaborators: ICollaboratorData[];
  collaboratorsListIsOpen: boolean;
  toggleCollaboratorsList(): void;
  clearCollaboratorsList(): void;
}

class CollaboratorsList extends React.Component<IProps> {
  componentDidMount() {
    const { getCollaborators } = this.props;
    getCollaborators();
  }

  render() {
    const {
      updateCollaboratorsList,
      collaborator_ids,
      collaborators,
      className,
      toggleCollaboratorsList,
      clearCollaboratorsList,
      collaboratorsListIsOpen,
      disabled,
    } = this.props;
    const collaboratorNames = collaborator_ids
      .map((id) =>
        get(collaborators.find((col) => col.public_id === id), 'name')
      )
      .join(', ');

    return (
      <div className={cn('posr add-item-input', className, { disabled })}>
        <input
          disabled={disabled}
          onClick={toggleCollaboratorsList}
          className="form-control form-control-sm pr-50"
          type="text"
          placeholder="Enter"
          value={collaboratorNames}
        />
        {collaborator_ids.length > 0 ? (
          <img
            className="cancel-structure"
            style={{ cursor: 'pointer', display: 'block' }}
            onClick={clearCollaboratorsList}
            src="/images/cancel.svg"
            alt="icon-error-input"
          />
        ) : null}
        {collaboratorsListIsOpen && collaborator_ids.length === 0 ? (
          <img
            className="cancel-structure"
            src="/images/up-arrow-gray.svg"
            alt="icon-error-input"
          />
        ) : null}
        {!collaboratorsListIsOpen && collaborator_ids.length === 0 ? (
          <img
            className="cancel-structure"
            src="/images/down-arrow-gray.svg"
            alt="icon-error-input"
          />
        ) : null}
        <CSSTransition
          in={collaboratorsListIsOpen}
          classNames="fade"
          timeout={650}
        >
          {collaboratorsListIsOpen ? (
            <div className="add-item-list">
              {collaborators.map((x) => (
                <div key={x.public_id} className="pseudo-checkbox-holder">
                  <div
                    id={x.public_id}
                    onClick={updateCollaboratorsList}
                    className="pseudo-checkbox"
                  >
                    {collaborator_ids.includes(x.public_id) ? (
                      <img
                        className="svg-checkmark"
                        src="/images/marker-ready.svg"
                        alt="icon-checkmark"
                      />
                    ) : null}
                  </div>
                  <span className="title">{x.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </CSSTransition>
      </div>
    );
  }
}

const enhance: any = connect(
  createSelector(collaboratorsSelector, (collaborators) => ({
    collaborators,
  })),
  {
    getCollaborators,
  }
);

export default enhance(CollaboratorsList);
