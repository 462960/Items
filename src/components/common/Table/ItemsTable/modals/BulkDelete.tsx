import React from 'react';
import Button from 'components/common/Button/Button';
import { FormattedMessage } from 'react-intl';
import messages from '../translate';

const formId = 'bulkChangeStatus';

interface IProps {
  onSubmit(): void;
  onCancel(): void;
  submitting: boolean;
}

class ConfirmModalActions extends React.PureComponent<IProps> {
  onSubmit = () => {
    this.props.onSubmit();
  };

  render() {
    const { onCancel, submitting } = this.props;

    return (
      <>
        <Button
          className="btn btn-inventor btn-white"
          key="cancel"
          onClick={onCancel}
        >
          <img className="header-plus" src="/images/cancel.svg" alt="cancel" />
          <span className="title-header-btn">
            <FormattedMessage {...messages.cancel} />
          </span>
        </Button>
        <Button
          className="btn btn-inventor btn-red"
          key="delete"
          onClick={this.onSubmit}
          disabled={submitting}
        >
          <span className="title-header-btn">Delete</span>
        </Button>
      </>
    );
  }
}

export default {
  formId,
  actions: ConfirmModalActions,
  title: (ids: string[]) => (
    <div>Are you sure you want to delete {ids.length} items?</div>
  ),
};
