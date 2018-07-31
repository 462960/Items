import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import queryString from 'query-string';
import { createSelector } from 'reselect';
import ItemsTable from 'components/common/Table/ItemsTable/ItemsTable';
import withPromise from 'helpers/withPromise';
import { getItemStatuses } from 'reducers/statuses/itemStatusesList/reducer';
import {
  getItems,
  getColumns,
  updateColumns,
} from 'reducers/items/items/reducer';
import { TAB_TO_STATUS } from './constants';
import { itemsStatusesSelector } from 'reducers/statuses/itemStatusesList/selectors';
import {
  itemsSelector,
  metaSelector,
  optionsSelector,
} from 'reducers/items/items/selectors';
import {
  customActiveColumnsSelector,
  tableMetaSelector,
  customAllColumnsSelector,
} from './selectors';
import EmptyState from './EmptyState';

interface IProps extends IWithRouter {
  getItemStatuses(promise?: IPromiseCallback): IAction;
  getColumns(promise?: IPromiseCallback): IAction;
  updateColumns(payload: ITableColumn[], promise?: IPromiseCallback): IAction;
  getItems(payload: IGetItemOptions, promise?: IPromiseCallback): IAction;
  options: IGetItemOptions;
  activeColumns: ITableColumnWithAttrs[];
  allColumns: ITableColumnStackWithLabels;
  items: IItemData[];
  itemStatuses: IItemStatus[];
  itemsMeta: {
    count: number;
  };
  tableMeta: ITableMeta;
}

interface IState {
  loading: boolean;
  initialLoaded: boolean;
}

class ItemsTableContainer extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initialLoaded: false,
    };
  }

  componentDidMount() {
    const { getItemStatuses, itemStatuses } = this.props;
    if (isEmpty(itemStatuses)) {
      withPromise(getItemStatuses).then((res: IItemStatus[]) => {
        this.getTableData(res);
      });
    } else {
      this.getTableData(itemStatuses);
    }
  }

  componentDidUpdate(prevProps) {
    const { location, itemStatuses } = this.props;

    if (
      this.getCurrentTabId(location, itemStatuses) !==
      this.getCurrentTabId(prevProps.location, itemStatuses)
    ) {
      this.getTableData(itemStatuses);
    }
  }

  private getCurrentTabId = (
    location: ILocation,
    itemStatuses: IItemStatus[]
  ) => {
    const currentTab = queryString.parse(location.search).tab;
    const statusName = TAB_TO_STATUS[currentTab] || TAB_TO_STATUS.default;
    const currentStatus = itemStatuses.find((st) => st.name === statusName);
    return get(currentStatus, 'public_id');
  };

  private getTableData = (itemStatuses: IItemStatus[]) => {
    const { location, getColumns, getItems, options } = this.props;
    const currentTabId = this.getCurrentTabId(location, itemStatuses);
    this.setState({ loading: true });
    return Promise.all([
      withPromise(getColumns),
      withPromise(getItems, {
        ...options,
        page: 1,
        search: null,
        status: currentTabId,
      }),
    ])
      .then(() => this.setState({ loading: false, initialLoaded: true }))
      .catch(() => this.setState({ loading: false, initialLoaded: true }));
  };

  private getItems = (newOptions: object): Promise<any> => {
    const { options, getItems } = this.props;
    const { loading } = this.state;

    if (loading) return;
    this.setState({ loading: true });

    return withPromise(getItems, {
      ...options,
      ...newOptions,
    })
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const {
      items,
      activeColumns,
      tableMeta,
      allColumns,
      options,
      updateColumns,
    } = this.props;
    const { loading, initialLoaded } = this.state;

    return (
      <ItemsTable
        EmptyState={EmptyState}
        loading={loading}
        initialLoaded={initialLoaded}
        getItems={this.getItems}
        updateColumns={updateColumns}
        options={options}
        activeColumns={activeColumns}
        allColumns={allColumns}
        items={items}
        tableMeta={tableMeta}
      />
    );
  }
}

const enhance: any = compose(
  withRouter,
  connect(
    createSelector(
      itemsStatusesSelector,
      itemsSelector,
      customActiveColumnsSelector,
      metaSelector,
      optionsSelector,
      tableMetaSelector,
      customAllColumnsSelector,
      (
        itemStatuses,
        items,
        activeColumns,
        itemsMeta,
        options,
        tableMeta,
        allColumns
      ) => ({
        itemStatuses,
        items,
        activeColumns,
        options,
        itemsMeta,
        tableMeta,
        allColumns,
      })
    ),
    {
      getItemStatuses,
      getItems,
      getColumns,
      updateColumns,
    }
  )
);

export default enhance(ItemsTableContainer);
