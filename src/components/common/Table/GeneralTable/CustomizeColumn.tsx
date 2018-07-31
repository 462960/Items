import React from 'react';
import cn from 'classnames';
import capitalize from 'lodash.capitalize';
import Draggable from 'react-draggable';

const columnComparator = (
  column1: IColumnChange,
  column2: IColumnChange
): number => {
  if (!column1.active && column2.active) return 1;
  if (!column2.active && column1.active) return -1;
  if (!column1.active && !column2.active) return 0;

  // active column must have order (non-negative integer)
  return column1.order - column2.order;
};

const unselectedColumnData = {
  order: undefined,
};

interface IProps {
  allColumns: ITableColumnStackWithLabels;
  onChange(columns: ITableColumn[]): void;
}

interface IState {
  isOpen: boolean;
  changes: IColumnChangeGroup;
}

class CustomizeColumn extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      changes: {},
    };
  }

  componentDidUpdate({}, prevState) {
    if (prevState.changes !== this.state.changes) this.onChange();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outsideClick);
  }

  outsideClick = (e: any) => {
    const isClickInsideComponent = [].some.call(e.composedPath(), (el) =>
      (el.classList || { value: '' }).value.match('wrap-main-tooltip')
    );

    if (!isClickInsideComponent) {
      this.close();
    }
  };

  close = () => {
    this.setState({ isOpen: false });
    document.removeEventListener('click', this.outsideClick);
  };

  private openColumnCustomizer = (isOpen: boolean) => () => {
    if (isOpen) {
      document.addEventListener('click', this.outsideClick);
      this.setState({ isOpen });
    } else {
      this.close();
    }
  };

  private getColumnName = (column: IColumnChange): string => {
    return column.label || capitalize(column.name.replace('_', ' '));
  };

  private getMaxOrder = (): number => {
    const columns = this.getChangedColumns();
    return columns.reduce((maxOrder, col) => {
      if (!col.active) return maxOrder;
      return maxOrder > col.order ? maxOrder : col.order;
    }, -1);
  };

  private toggleActive = (columnName: string) => (): void => {
    const { changes } = this.state;
    const currentColumnChanges = (changes[columnName] || {}) as IColumnChange;
    const columns = this.getChangedColumns();
    const currentColumn = columns.find((col) => col.name === columnName);
    const newActive = !currentColumn.active;
    const newOrder = newActive ? this.getMaxOrder() + 1 : undefined;

    this.setState({
      changes: {
        ...changes,
        [columnName]: {
          ...currentColumnChanges,
          active: newActive,
          order: newOrder,
        },
      },
    });
  };

  private onChange = (): void => {
    const { onChange } = this.props;
    const columns = this.getChangedColumns();
    const newSelectedColumns = columns
      .filter((col) => col.active)
      .map((col) => ({ name: col.name, order: col.order }));
    onChange(newSelectedColumns);
  };

  private getChangedColumns = (): IColumnChange[] => {
    const {
      allColumns: { all_column_names, selected_columns },
    } = this.props;
    const { changes } = this.state;

    const changedColumns = all_column_names.map(
      (column: ITableColumnWithLabel) => {
        const selectedData = selected_columns.find(
          (col) => col.name === column.name
        );
        const changedData = changes[column.name] || {};

        return {
          ...column,
          active: Boolean(selectedData),
          ...(selectedData || unselectedColumnData),
          ...changedData,
        };
      }
    );

    return changedColumns.sort(columnComparator) as IColumnChange[];
  };

  private handleStop = ({}, node): void => {
    const elementHeight = node.node.offsetHeight;
    const delta = node.y;
    const columnName = node.node.dataset.columnName;

    /* Math.round(delta / Math.abs(delta)
     * Koeficient needed for better Math.floor
     * with negative values
     */
    const orderDelta =
      Math.floor(Math.abs(delta) / elementHeight) *
      Math.round(delta / Math.abs(delta));
    this.reorderColumns(columnName, orderDelta);
  };

  private reorderColumns = (columnName: string, orderDelta: number) => {
    const { changes } = this.state;

    // need for clear react-draggable inline styles
    if (!orderDelta) return this.forceUpdate();

    const activeColumns = this.getChangedColumns().filter((col) => col.active);

    const currentColumnIndex = activeColumns.findIndex(
      (col) => col.name === columnName
    );

    let newCurrentColumnIndex = currentColumnIndex + orderDelta;
    if (newCurrentColumnIndex < 0) newCurrentColumnIndex = 0;
    if (newCurrentColumnIndex >= activeColumns.length) {
      newCurrentColumnIndex = activeColumns.length - 1;
    }

    const newChanges = {};
    activeColumns.forEach((col, index) => {
      let order = index;
      if (col.name === columnName) order = newCurrentColumnIndex;
      if (index >= newCurrentColumnIndex && index < currentColumnIndex) {
        order = index + 1;
      }
      if (index <= newCurrentColumnIndex && index > currentColumnIndex) {
        order = index - 1;
      }

      newChanges[col.name] = {
        ...changes[col.name],
        order,
      };
    });

    this.setState({
      changes: {
        ...changes,
        ...newChanges,
      },
    });
  };

  private renderColumn = (column: IColumnChange): React.ReactNode => {
    const columnListItem = (
      <li key={column.name} data-column-name={column.name}>
        <div className="tooltip-items-content-list-left">
          <div
            className="tooltip-items-content-list-round-container"
            onClick={this.toggleActive(column.name)}
          >
            <div
              className={cn('tooltip-items-content-list-round', {
                active: column.active,
              })}
            />
          </div>
          <div className="tooltip-items-content-list-title">
            {this.getColumnName(column)}
          </div>
        </div>
        <button className="style-btn-non tooltip-items-content-list-burger">
          {column.active && (
            <img src="/images/burger.svg" draggable={false} alt="burger" />
          )}
        </button>
      </li>
    );

    if (!column.active) return columnListItem;

    return (
      <Draggable
        key={Math.random()}
        axis="y"
        bounds="parent"
        handle=".tooltip-items-content-list-burger"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        onStop={this.handleStop}
      >
        {columnListItem}
      </Draggable>
    );
  };

  render() {
    const { isOpen } = this.state;
    const columns = this.getChangedColumns();

    return (
      <div className="wrap-main-tooltip posr">
        <button
          className="wrap-row wrap-row-hov"
          onClick={this.openColumnCustomizer(true)}
        >
          <svg className="svg-gear m-r-10">
            <use xlinkHref="/images/sprite.svg#gear-new" />
          </svg>
          <span className="custom-text">Customize columns</span>
        </button>
        <div className={cn('tooltip-items', { '-show': isOpen })}>
          <div className="tooltip-items-header">
            <div className="tooltip-items-header-title">Show columns</div>
            <div
              className="tooltip-items-header-close"
              onClick={this.openColumnCustomizer(false)}
            >
              <span className="m-r-10">Close</span>
              <button className="style-btn-non">
                <svg className="svg-cancel">
                  <use xlinkHref="/images/sprite.svg#delete" />
                </svg>
              </button>
            </div>
          </div>
          <div className="tooltip-items-content">
            <ul>{columns.map(this.renderColumn)}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomizeColumn;
