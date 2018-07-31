import React from 'react';
import cn from 'classnames';
import get from 'lodash.get';
import toggleOrder from 'helpers/toggleOrder';
import { SORT_ORDER } from 'constants/index';
import ImportFileModal from 'components/common/Modal/ImportFileModal/ImportFileModal';
import Button from 'components/common/Button/Button';
import Table from 'components/common/Table/GeneralTable/Table';
import CustomizeColumn from 'components/common/Table/GeneralTable/CustomizeColumn';
import TableSearch from 'components/common/Table/GeneralTable/TableSearch';
import { TABLE_SCROLL_SIZES } from 'components/common/Table/GeneralTable/constants';
import ItemModal from 'components/items/ItemModal/ItemModal';
import CoffeeSpinner from 'components/common/CoffeeSpinner/CoffeeSpinner';
import AbsoluteLayer from 'components/common/AbsoluteLayer/AbsoluteLayer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { importItems } from 'reducers/items/items/reducer';
import { updateItem, deleteItem } from 'reducers/items/item/reducer';
import ActionBar from './ActionBar';

interface IProps {
  EmptyState?: any;
  loading: boolean;
  initialLoaded: boolean;
  updateItem(data: IItemData, promise: IPromiseCallback): IAction;
  deleteItem(id: string, promise: IPromiseCallback): IAction;
  importItems(data: any, promise: IPromiseCallback): IAction;
  updateColumns(payload: ITableColumn[], promise?: IPromiseCallback): IAction;
  getItems(payload: object): Promise<any>;
  options: IGetOptions;
  activeColumns: ITableColumnWithAttrs[];
  allColumns: ITableColumnStackWithLabels;
  items: IItemData[];
  tableMeta: ITableMeta;
}

interface IState {
  actions: ITableAction[];
  editableItem?: IItemData;
  isImportModalOpen: boolean;
}

class ItemsTable extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      editableItem: undefined,
      isImportModalOpen: false,
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

  private onEdit = (editableItem) => () => {
    this.setState({ editableItem });
  };

  private openImportModal = (isOpen) => () => {
    this.setState({ isImportModalOpen: isOpen });
  };

  private onSort = (field: string) => () => {
    const {
      options: { sort },
      getItems,
    } = this.props;
    const newOrder =
      sort.field === field ? toggleOrder(sort.order) : SORT_ORDER.DESC;

    getItems({
      sort: {
        field,
        order: newOrder,
      },
    });
  };

  private onSearch = (search) => {
    const { getItems } = this.props;
    getItems({
      search,
      page: 1,
    });
  };

  private onPageChange = (newPage: number) => {
    const { getItems } = this.props;
    getItems({ page: newPage });
  };

  private closeEditModal = () => {
    this.setState({ editableItem: undefined });
  };

  private getTableScroll = () => {
    const { activeColumns } = this.props;
    const columnsCount = activeColumns.length;

    if (columnsCount > 10) return TABLE_SCROLL_SIZES.large;
    if (columnsCount > 8) return TABLE_SCROLL_SIZES.medium;
    return TABLE_SCROLL_SIZES.none;
  };

  private renderEditModal = () => {
    const { updateItem, deleteItem } = this.props;
    const { editableItem } = this.state;
    const initialFormData = editableItem
      ? {
          name: editableItem.name,
          barcode: editableItem.barcode,
          count: editableItem.count,
          public_id: editableItem.public_id,
          description: editableItem.description,
          serial_number: editableItem.serial_number,
          comment: editableItem.comment,
          status: get(editableItem, 'status.public_id'),
          location: get(editableItem, 'location.public_id'),
          collaborator: get(editableItem, 'collaborator.public_id'),
        }
      : undefined;

    return (
      <ItemModal
        edit
        isOpen={Boolean(editableItem)}
        initialValues={initialFormData}
        onDelete={deleteItem}
        onSubmit={updateItem}
        onClose={this.closeEditModal}
      />
    );
  };

  renderImportItemsModal = () => {
    const { importItems } = this.props;
    const { isImportModalOpen } = this.state;

    return (
      <ImportFileModal
        isOpen={isImportModalOpen}
        onClose={this.openImportModal(false)}
        onSubmit={importItems}
        title="Import Items"
      />
    );
  };

  render() {
    const {
      items,
      activeColumns,
      tableMeta,
      allColumns,
      options: { search },
      loading,
      initialLoaded,
      updateColumns,
      EmptyState,
    } = this.props;
    const { actions } = this.state;
    const isShowEmptyState =
      !loading && !search && !items.length && initialLoaded;

    return (
      <div className="wrap-inventory-block wrap-inventory-block--one-inventory">
        <div className="wrap-adaptive-content">
          <AbsoluteLayer
            className={cn('table-loding-layer', {
              '-not-loaded': !initialLoaded,
            })}
            show={loading || !initialLoaded}
          >
            <CoffeeSpinner />
          </AbsoluteLayer>
          {this.renderEditModal()}
          {this.renderImportItemsModal()}
          {isShowEmptyState && <EmptyState />}
          {!isShowEmptyState && (
            <div>
              <div className="wrap-top-row-colaborator posr">
                <div className="wrap-df posr">
                  <TableSearch onChange={this.onSearch} />
                  <Button
                    className="btn btn-inventor btn-white"
                    onClick={this.openImportModal(true)}
                  >
                    <svg className="svg-bookmark">
                      <use xlinkHref="/images/sprite.svg#bookmark" />
                    </svg>
                    <span className="title-header-btn m-r-10 m-l-10">
                      Import
                    </span>
                    <svg className="svg-down-arrow-black">
                      <use xlinkHref="/images/sprite.svg#down-arrow" />
                    </svg>
                  </Button>
                </div>
                <CustomizeColumn
                  allColumns={allColumns}
                  onChange={updateColumns}
                />
              </div>
              <Table
                ActionBar={ActionBar}
                columns={activeColumns}
                scrollable={this.getTableScroll()}
                items={items}
                meta={tableMeta}
                actions={actions}
                onSort={this.onSort}
                onPageChange={this.onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const enhance: any = compose(
  connect(null, {
    updateItem,
    deleteItem,
    importItems,
  })
);

export default enhance(ItemsTable);
