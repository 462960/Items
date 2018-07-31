import React from 'react';
import cn from 'classnames';
import get from 'lodash.get';
import toggleOrder from 'helpers/toggleOrder';
import { SORT_ORDER } from 'constants/index';
import Table from 'components/common/Table/GeneralTable/Table';
import CustomizeColumn from 'components/common/Table/GeneralTable/CustomizeColumn';
import CoffeeSpinner from 'components/common/CoffeeSpinner/CoffeeSpinner';
import AbsoluteLayer from 'components/common/AbsoluteLayer/AbsoluteLayer';
import CollaboratorModal from 'components/common/Modal/CollaboratorModal/CollaboratorModal';
import Button from 'components/common/Button/Button';
import EmptyState from './EmptyState';
import { TABLE_SCROLL_SIZES } from 'components/common/Table/GeneralTable/constants';
import ActionBar from './ActionBar';
import {
  updateCollaborator,
  deleteCollaborator,
  createCollaborator,
} from 'reducers/collaborators/collaborator/reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';

interface IProps {
  loading: boolean;
  initialLoaded: boolean;
  updateColumns(payload: ITableColumn[], promise?: IPromiseCallback): IAction;
  getCollaborators(payload: object): Promise<any>;
  options: IGetOptions;
  activeColumns: ITableColumnWithAttrs[];
  allColumns: ITableColumnStackWithLabels;
  collaborators: ICollaboratorData[];
  collaboratorsMeta: {
    count: number;
  };
  tableMeta: ITableMeta;
}

interface IConnectedProps {
  updateCollaborator(
    data: ICollaboratorData,
    promise: IPromiseCallback
  ): IAction;
  deleteCollaborator(id: string, promise: IPromiseCallback): IAction;
  createCollaborator(
    formValues: ICollaboratorData,
    promise?: IPromiseCallback
  ): IAction;
}

interface IState {
  actions: ITableAction[];
  editableCollaborator?: ICollaboratorData;
  isAddCollaboratorModalOpen: boolean;
}

class CollaboratorsTable extends React.PureComponent<
  IProps & IConnectedProps,
  IState
> {
  constructor(props) {
    super(props);

    this.state = {
      editableCollaborator: undefined,
      isAddCollaboratorModalOpen: false,
      actions: [
        {
          type: 'edit',
          onClick: this.onEdit,
          img: '/images/pensil.svg',
        },
      ],
    };
  }

  static defaultProps = {
    initialLoaded: true,
  };

  toggleAddCollaboratorModal = (isOpen) => () => {
    this.setState({
      isAddCollaboratorModalOpen: isOpen,
    });
  };

  private onEdit = (editableCollaborator) => () => {
    this.setState({ editableCollaborator });
  };

  private onSort = (field: string) => () => {
    const {
      options: { sort },
      getCollaborators,
    } = this.props;
    const newOrder =
      sort.field === field ? toggleOrder(sort.order) : SORT_ORDER.DESC;

    getCollaborators({
      sort: {
        field,
        order: newOrder,
      },
    });
  };

  private onPageChange = (newPage: number) => {
    const { getCollaborators } = this.props;
    getCollaborators({ page: newPage });
  };

  private onChangeColumns = (changedColumns: ITableColumn[]) => {
    const { updateColumns } = this.props;
    updateColumns(changedColumns);
  };

  private closeEditModal = () => {
    this.setState({ editableCollaborator: undefined });
  };

  private getTableScroll = () => {
    const { activeColumns } = this.props;
    const columnsCount = activeColumns.length;

    if (columnsCount > 10) return TABLE_SCROLL_SIZES.large;
    if (columnsCount > 8) return TABLE_SCROLL_SIZES.medium;
    return TABLE_SCROLL_SIZES.none;
  };

  private renderModals = () => {
    const {
      updateCollaborator,
      deleteCollaborator,
      createCollaborator,
    } = this.props;
    const { editableCollaborator, isAddCollaboratorModalOpen } = this.state;
    const initialFormData = editableCollaborator
      ? {
          name: editableCollaborator.name,
          public_id: editableCollaborator.public_id,
          phone_number: editableCollaborator.phone_number,
          email: editableCollaborator.email,
          birthday: editableCollaborator.birthday,
          position: editableCollaborator.position,
          location: get(editableCollaborator, 'location.public_id'),
        }
      : undefined;

    return (
      <>
        <CollaboratorModal
          key="edit"
          edit
          isOpen={Boolean(editableCollaborator)}
          initialValues={initialFormData}
          onDelete={deleteCollaborator}
          onSubmit={updateCollaborator}
          onClose={this.closeEditModal}
        />
        <CollaboratorModal
          key="add"
          isOpen={isAddCollaboratorModalOpen}
          onSubmit={createCollaborator}
          onClose={this.toggleAddCollaboratorModal(false)}
        />
      </>
    );
  };

  render() {
    const {
      collaborators,
      activeColumns,
      tableMeta,
      allColumns,
      loading,
      initialLoaded,
    } = this.props;
    const { actions } = this.state;
    const isShowEmptyState = !loading && !collaborators.length && initialLoaded;

    return (
      <div className="wrap-adaptive-content m-t-15">
        <AbsoluteLayer
          className={cn('table-loding-layer', {
            '-not-loaded': !initialLoaded,
          })}
          show={loading || !initialLoaded}
        >
          <CoffeeSpinner />
        </AbsoluteLayer>
        {this.renderModals()}
        {isShowEmptyState && <EmptyState />}
        {!isShowEmptyState && (
          <div>
            <div className="wrap-top-row-colaborator posr">
              <Button
                className="btn btn-inventor btn-white"
                onClick={this.toggleAddCollaboratorModal(true)}
              >
                <svg className="svg-bookmark">
                  <use xlinkHref="/images/sprite.svg#add" />
                </svg>
                <span className="title-header-btn m-r-10 m-l-10">
                  Add Collaborator
                </span>
              </Button>
              <CustomizeColumn
                allColumns={allColumns}
                onChange={this.onChangeColumns}
              />
            </div>
            <Table
              ActionBar={ActionBar}
              columns={activeColumns}
              scrollable={this.getTableScroll()}
              items={collaborators}
              meta={tableMeta}
              actions={actions}
              onSort={this.onSort}
              onPageChange={this.onPageChange}
            />
          </div>
        )}
      </div>
    );
  }
}

const enhance = compose<React.ComponentClass<IProps>>(
  connect(null, {
    updateCollaborator,
    deleteCollaborator,
    createCollaborator,
  })
);

export default enhance(CollaboratorsTable);
