import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import withPromise from 'helpers/withPromise';
import {
  getItems,
  getColumns,
  updateColumns,
} from 'reducers/collaborators/collaboratorItems/reducer';
import {
  itemsSelector,
  metaSelector,
  optionsSelector,
} from 'reducers/collaborators/collaboratorItems/selectors';
import ItemsTable from 'components/common/Table/ItemsTable/ItemsTable';
import {
  customActiveColumnsSelector,
  tableMetaSelector,
  customAllColumnsSelector,
} from './selectors';
import EmptyState from './EmptyState';

interface IProps {
  collaboratorId: string;
  updateColumns(payload: ITableColumn[], promise?: IPromiseCallback): IAction;
  getItems(payload: IGetOptions, promise?: IPromiseCallback): IAction;
  getColumns(promise?: IPromiseCallback): IAction;
  options: IGetOptions;
  activeColumns: ITableColumnWithAttrs[];
  allColumns: ITableColumnStackWithLabels;
  items: IItemData[];
  tableMeta: ITableMeta;
}

interface IState {
  loading: boolean;
  initialLoaded: boolean;
}

class Items extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initialLoaded: false,
    };
  }

  componentDidMount() {
    const { getItems, getColumns, options, collaboratorId } = this.props;

    this.setState({ loading: true });
    return Promise.all([
      withPromise(getColumns),
      withPromise(getItems, {
        ...options,
        page: 1,
        search: null,
        id: collaboratorId,
      }),
    ])
      .then(() => this.setState({ loading: false, initialLoaded: true }))
      .catch(() => this.setState({ loading: false, initialLoaded: true }));
  }

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
      updateColumns,
      options,
      activeColumns,
      allColumns,
      items,
      tableMeta,
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
  connect(
    createSelector(
      itemsSelector,
      customActiveColumnsSelector,
      metaSelector,
      optionsSelector,
      tableMetaSelector,
      customAllColumnsSelector,
      (items, activeColumns, itemsMeta, options, tableMeta, allColumns) => ({
        items,
        activeColumns,
        options,
        itemsMeta,
        tableMeta,
        allColumns,
      })
    ),
    {
      getItems,
      getColumns,
      updateColumns,
    }
  )
);

export default enhance(Items);
