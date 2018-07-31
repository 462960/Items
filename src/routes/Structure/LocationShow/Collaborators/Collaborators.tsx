import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import withPromise from 'helpers/withPromise';
import CollaboratorsTable from 'components/common/Table/CollaboratorsTable/CollaboratorsTable';
import {
  customActiveColumnsSelector,
  tableMetaSelector,
  customAllColumnsSelector,
} from './selectors';
import {
  collaboratorsSelector,
  metaSelector,
  optionsSelector,
} from 'reducers/locations/locationCollaborators/selectors';
import {
  getCollaborators,
  getColumns,
  updateColumns,
} from 'reducers/locations/locationCollaborators/reducer';

interface IProps {
  locationId: string;
  getColumns(promise?: IPromiseCallback): IAction;
  updateColumns(payload: ITableColumn[], promise?: IPromiseCallback): IAction;
  getCollaborators(payload: IGetOptions, promise?: IPromiseCallback): IAction;
  options: IGetOptions;
  activeColumns: ITableColumnWithAttrs[];
  allColumns: ITableColumnStackWithLabels;
  collaborators: ICollaboratorData[];
  collaboratorsMeta: {
    count: number;
  };
  tableMeta: ITableMeta;
}

interface IState {
  loading: boolean;
  initialLoaded: boolean;
}

class Collaborators extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initialLoaded: false,
    };
  }

  componentDidMount() {
    const { getCollaborators, getColumns, options, locationId } = this.props;

    this.setState({ loading: true });
    return Promise.all([
      withPromise(getColumns),
      withPromise(getCollaborators, {
        ...options,
        id: locationId,
        page: 1,
      }),
    ])
      .then(() => this.setState({ loading: false, initialLoaded: true }))
      .catch(() => this.setState({ loading: false, initialLoaded: true }));
  }

  private getCollaborators = (newOptions: object): Promise<any> => {
    const { options, getCollaborators, locationId } = this.props;
    const { loading } = this.state;

    if (loading) return;

    this.setState({ loading: true });

    return withPromise(getCollaborators, {
      ...options,
      ...newOptions,
      id: locationId,
    })
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const {
      collaborators,
      activeColumns,
      tableMeta,
      allColumns,
      updateColumns,
      options,
      collaboratorsMeta,
    } = this.props;
    const { loading, initialLoaded } = this.state;

    return (
      <div className="wrap-inventory-block">
        <CollaboratorsTable
          loading={loading}
          initialLoaded={initialLoaded}
          getCollaborators={this.getCollaborators}
          updateColumns={updateColumns}
          options={options}
          activeColumns={activeColumns}
          allColumns={allColumns}
          collaborators={collaborators}
          tableMeta={tableMeta}
          collaboratorsMeta={collaboratorsMeta}
        />
      </div>
    );
  }
}

const enhance: any = compose(
  connect(
    createSelector(
      collaboratorsSelector,
      customActiveColumnsSelector,
      metaSelector,
      optionsSelector,
      tableMetaSelector,
      customAllColumnsSelector,
      (
        collaborators,
        activeColumns,
        collaboratorsMeta,
        options,
        tableMeta,
        allColumns
      ) => ({
        collaborators,
        activeColumns,
        options,
        collaboratorsMeta,
        tableMeta,
        allColumns,
      })
    ),
    {
      getCollaborators,
      getColumns,
      updateColumns,
    }
  )
);

export default enhance(Collaborators);
