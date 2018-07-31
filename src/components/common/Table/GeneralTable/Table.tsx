import React from 'react';
import cn from 'classnames';
import isNil from 'lodash.isnil';
import Button from 'components/common/Button/Button';
import SimpleCheckbox from 'components/common/Form/SimpleCheckbox';
import uniq from 'lodash.uniq';
import floor from 'lodash.floor';

interface IProps {
  scrollable?: string;
  meta: ITableMeta;
  ActionBar?: any;
  actions?: ITableAction[];
  items: ITableItem[];
  columns: ITableColumnWithAttrs[];
  onSort(column: string): any;
  onPageChange(page: number): void;
}

const checkboxStyles = {
  width: '35px',
  lineHeight: 0,
  textAlign: '-webkit-center',
} as any;

const actionsStyles = {
  width: '85px',
};

interface IState {
  selectedItems: string[];
}

class Table extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({
        selectedItems: [],
      });
    }
  }

  private getColumnWidth = (column: ITableColumnWithAttrs) => {
    const { columns } = this.props;

    const allColumnsWidthWeight = columns.reduce(
      (sum, col) => sum + col.widthWeight,
      0
    );
    const relativePercent = column.widthWeight / allColumnsWidthWeight;

    // for now works even without correction for widths of checbox's row and action's row
    return `calc(${floor(relativePercent * 100, 2)}%`;
  };

  private renderColumnName = (column: ITableColumnWithAttrs) => {
    const {
      meta: { sort },
      onSort,
    } = this.props;
    const isColumnSorted = column.name === sort.field;

    return (
      <th
        className="posr"
        scope="col"
        key={column.name}
        style={{
          ...(column.style || {}),
          width: this.getColumnWidth(column),
        }}
        onClick={onSort(column.name)}
      >
        <Button className="style-btn-table">
          {column.label}
          {column.sortable && (
            <svg
              className={cn('table-filter svg-down-arrow-black', {
                sorted: isColumnSorted,
                [sort.order]: isColumnSorted,
              })}
            >
              <use xlinkHref="/images/sprite.svg#down-arrow" />
            </svg>
          )}
        </Button>
      </th>
    );
  };

  private renderAction = (action: ITableAction, item: ITableItem) => {
    return (
      <Button
        className="style-btn-non"
        onClick={action.onClick(item)}
        key={action.type}
      >
        <img src={action.img} alt={action.type} />
      </Button>
    );
  };

  private toggleAll = (e) => {
    const { items } = this.props;
    if (e.target.checked) {
      this.setState({
        selectedItems: items.map((item) => item.public_id),
      });
    } else {
      this.setState({ selectedItems: [] });
    }
  };

  private toggleSelectItem = (id: string) => (e) => {
    if (e.target.checked) {
      this.setState((state) => ({
        selectedItems: uniq(state.selectedItems.concat(id)),
      }));
    } else {
      this.setState((state) => ({
        selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
      }));
    }
  };

  private renderRow = (item: ITableItem) => {
    const { columns, ActionBar, actions } = this.props;
    const { selectedItems } = this.state;
    const selected = selectedItems.includes(item.public_id);

    return (
      <tr key={item.public_id} className={cn({ selected })}>
        {Boolean(ActionBar) && (
          <td scope="row" style={checkboxStyles}>
            <SimpleCheckbox
              className="checkbx-number"
              onChange={this.toggleSelectItem(item.public_id)}
              checked={selected}
            />
          </td>
        )}
        {columns.map((column) => {
          const value = column.selector
            ? column.selector(item)
            : item[column.name];

          return <td key={column.name}>{isNil(value) ? '-' : value}</td>;
        })}
        {Boolean(actions) && (
          <td className="table-action-row">
            {actions.map((action) => this.renderAction(action, item))}
          </td>
        )}
      </tr>
    );
  };

  private toPrevPage = () => {
    const {
      meta: { page },
      onPageChange,
    } = this.props;

    onPageChange(page - 1);
  };

  private toNextPage = () => {
    const {
      meta: { page },
      onPageChange,
    } = this.props;

    onPageChange(page + 1);
  };

  render() {
    const { ActionBar, actions, items, columns, meta, scrollable } = this.props;
    const { selectedItems } = this.state;
    const isSelectable = Boolean(ActionBar);
    const isSelected = Boolean(selectedItems.length);
    const fromItem = (meta.page - 1) * meta.perPage + 1;
    const toItem = meta.page * meta.perPage;
    const pagesCount = Math.ceil(meta.total / meta.perPage);
    const footerColSpan =
      columns.length + (ActionBar ? 1 : 0) + (actions ? 1 : 0);

    return (
      <div className="posr">
        {Boolean(isSelectable && isSelected) && (
          <ActionBar ids={selectedItems} />
        )}
        <div
          className={cn('table-container', {
            'scrollable-x': !!scrollable,
            selected: isSelected,
          })}
        >
          <table
            className={cn('table-inventor', scrollable, {
              selected: isSelected,
            })}
          >
            <thead className="table-head">
              <tr>
                {isSelectable && (
                  <th scope="col" style={checkboxStyles}>
                    <SimpleCheckbox
                      className="checkbx-number"
                      onChange={this.toggleAll}
                      checked={
                        selectedItems.length === items.length &&
                        selectedItems.length > 0
                      }
                    />
                  </th>
                )}
                {columns.map(this.renderColumnName)}
                {Boolean(actions) && (
                  <th
                    scope="col"
                    className="table-action-row"
                    style={actionsStyles}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>{items.map(this.renderRow)}</tbody>
            <tfoot className="table-foot">
              <tr>
                <td colSpan={footerColSpan} className="table-pagination">
                  <div>
                    Displaying {fromItem} to{' '}
                    {toItem > meta.total ? meta.total : toItem} of {meta.total}
                  </div>

                  <div className="ta-r">
                    <Button
                      className="colaborator-pagination-round-btn m-r-5"
                      disabled={meta.page === 1}
                      onClick={this.toPrevPage}
                    >
                      <img
                        className="left-arrow"
                        src="/images//left-arrow.svg"
                        alt="left"
                      />
                    </Button>
                    <span className="header-text m-r-5">Page</span>
                    <input
                      className="colaborator-pagination-white-window m-r-5"
                      type="text"
                      placeholder={meta.page.toString()}
                      disabled
                    />
                    <span className="header-text m-r-5">of {pagesCount}</span>
                    <Button
                      className="colaborator-pagination-round-btn"
                      disabled={meta.page === pagesCount}
                      onClick={this.toNextPage}
                    >
                      <img
                        className="right-arrow"
                        src="/images//right-arrow.svg"
                        alt="right"
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
