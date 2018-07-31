import React from 'react';
import cn from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import download from 'downloadjs';
import {
  bulkChangeCollaborators,
  bulkChangeLocation,
  bulkChangeStatus,
  bulkDeleteItems,
  exportPartItems,
} from 'reducers/items/items/reducer';
import Modal from 'components/common/Modal/Modal';
import {
  BULK_CHANGE_MODALS_MODES,
  BULK_CHANGE_MODALS,
} from 'components/common/Table/ItemsTable/constants';
import withPromise from 'helpers/withPromise';

interface IProps {
  location: ILocation;
  ids: string[];
  bulkChangeCollaborators(
    data: IBulkChangeCollaborator,
    promise: IPromiseCallback
  ): IAction;
  exportPartItems(ids: string[], promise?: IPromiseCallback): IAction;
  bulkChangeLocation(
    data: IBulkChangeLocation,
    promise: IPromiseCallback
  ): IAction;
  bulkChangeStatus(data: IBulkChangeStatus, promise: IPromiseCallback): IAction;
  bulkDeleteItems(data: IBulkChange, promise: IPromiseCallback): IAction;
  getItemStatuses(): void;
  itemStatuses: any[];
}

interface IState {
  submitting: boolean;
  bulkChangeModalMode?: string;
  submitFuncs: any;
  animated: boolean;
}

class ActionBar extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      animated: false,
      submitting: false,
      bulkChangeModalMode: undefined,
      submitFuncs: {
        [BULK_CHANGE_MODALS_MODES.collaborator]: props.bulkChangeCollaborators,
        [BULK_CHANGE_MODALS_MODES.status]: props.bulkChangeStatus,
        [BULK_CHANGE_MODALS_MODES.location]: props.bulkChangeLocation,
        [BULK_CHANGE_MODALS_MODES.delete]: props.bulkDeleteItems,
      },
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => this.setState({ animated: true }));
  }

  private bulkChangeModal = (mode: string) => () => {
    this.setState({
      bulkChangeModalMode: mode,
    });
  };

  private onModalClose = () => {
    this.setState({
      bulkChangeModalMode: undefined,
    });
  };

  private onSubmit = (data: any = {}) => {
    const { ids } = this.props;
    const { bulkChangeModalMode, submitting, submitFuncs } = this.state;
    const submitFunc = submitFuncs[bulkChangeModalMode];

    if (submitting) return;

    this.setState({ submitting: true });

    return withPromise(submitFunc, { public_ids: ids, ...data }).then(
      (res?: ISubmitFormError) => {
        this.setState({ submitting: false });
        if (res && res.error) return Promise.resolve(res);
        this.onModalClose();
      }
    );
  };

  private exportPartItems = () => {
    const { exportPartItems, ids } = this.props;
    withPromise(exportPartItems, ids).then((data) => {
      const csvContent = 'data:text/csv;charset=utf-8,' + data;
      download(
        csvContent,
        `location_items_part_${moment().format('DD.MM.YYYY_HH:mm:ss')}.csv`,
        'text/csv'
      );
    });
  };

  private renderModals = () => {
    const { ids } = this.props;
    const { bulkChangeModalMode, submitting } = this.state;
    const currentBulkChangeModal =
      BULK_CHANGE_MODALS[bulkChangeModalMode] || BULK_CHANGE_MODALS.default;

    return (
      <Modal
        isOpen={Boolean(BULK_CHANGE_MODALS[bulkChangeModalMode])}
        title={currentBulkChangeModal.title(ids)}
        className="modal-content-inventor--small"
        actions={
          <currentBulkChangeModal.actions
            onSubmit={this.onSubmit}
            onCancel={this.onModalClose}
            submitting={submitting}
          />
        }
      >
        {Boolean(currentBulkChangeModal.content) && (
          <currentBulkChangeModal.content onSubmit={this.onSubmit} />
        )}
      </Modal>
    );
  };

  render() {
    const { ids } = this.props;
    const { animated } = this.state;

    return (
      <>
        <div className={cn('tooltip-items-lime', { '-animated': !animated })}>
          <div className="tooltip-items-lime-left">
            <div className="tooltip-items-lime-left-item m-r-30 bold">
              {ids.length} Items Selected
            </div>
            <div className="tooltip-items-lime-left-item m-r-15 bold">
              Change:
            </div>
            <div
              className="tooltip-items-lime-left-item m-r-15 pointer"
              onClick={this.bulkChangeModal(
                BULK_CHANGE_MODALS_MODES.collaborator
              )}
            >
              Collaborator
            </div>
            <div
              className="tooltip-items-lime-left-item m-r-15 pointer"
              onClick={this.bulkChangeModal(BULK_CHANGE_MODALS_MODES.status)}
            >
              Status
            </div>
            <div
              className="tooltip-items-lime-left-item m-r-15 pointer"
              onClick={this.bulkChangeModal(BULK_CHANGE_MODALS_MODES.location)}
            >
              Location
            </div>
          </div>
          <div className="tooltip-items-lime-right">
            <div
              className="tooltip-items-lime-right-item m-r-15 pointer"
              onClick={this.exportPartItems}
            >
              <span>Export</span>
              <svg className="svg-down-arrow m-l-5">
                <use xlinkHref="/images/sprite.svg#down-arrow" />
              </svg>
            </div>

            <div
              className="tooltip-items-lime-right-item m-r-15 pointer"
              onClick={this.bulkChangeModal(BULK_CHANGE_MODALS_MODES.delete)}
            >
              Delete
            </div>
          </div>
        </div>
        {this.renderModals()}
      </>
    );
  }
}

const enhance: any = compose(
  connect(
    (state: any) => ({
      itemStatuses: state.getIn(['itemStatusesList', 'itemStatuses']).toJS(),
    }),
    {
      bulkChangeCollaborators,
      bulkChangeLocation,
      bulkChangeStatus,
      bulkDeleteItems,
      exportPartItems,
    }
  )
);

export default enhance(ActionBar);
