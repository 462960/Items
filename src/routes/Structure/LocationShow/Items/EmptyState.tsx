import React, { PureComponent } from 'react';
import { Button } from 'components/common/Button/Button';
import ItemModal from 'components/items/ItemModal/ItemModal';
import { createItem } from 'reducers/items/item/reducer';
import { connect } from 'react-redux';

interface IProps {
  createItem(values: IItemData, promise: IPromiseCallback): IAction;
}

interface IState {
  isItemModalOpen: boolean;
}

class ItemsTableEmptyState extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isItemModalOpen: false,
    };
  }

  toggleModal = (isOpen) => () => {
    this.setState({
      isItemModalOpen: isOpen,
    });
  };

  render() {
    const { createItem } = this.props;
    const { isItemModalOpen } = this.state;

    return (
      <div className="wrap-page-letter wrap-page-letter--no-items">
        <ItemModal
          isOpen={isItemModalOpen}
          onSubmit={createItem}
          onClose={this.toggleModal(false)}
        />
        <div className="page-letter-block">
          <div className="page-letter-block-box-img">
            <img
              className="page-letter-block-img"
              src="/images/monitor-barcode.png"
              alt="barcode"
            />
          </div>
          <h1 className="header-title title-pb">No items in location yet</h1>
          <div className="button-centr">
            <Button
              className="btn btn-inventor btn-lime"
              onClick={this.toggleModal(true)}
            >
              <img className="header-plus" src="/images/plus.svg" alt="plus" />
              <span className="title-header-btn">Create item</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const enhance = connect(null, { createItem });

export default enhance(ItemsTableEmptyState);
