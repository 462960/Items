import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button/Button';
import { FormattedMessage } from 'react-intl';
import messages from './translate';
import SearchForm from './SearchForm';
import ItemModal from 'components/items/ItemModal/ItemModal';
import { createItem } from 'reducers/items/item/reducer';

interface IProps {
  createItem(values: IItemData, promise: IPromiseCallback): IAction;
}

interface IState {
  isItemModalOpen: boolean;
}

class MainHeader extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isItemModalOpen: false,
    };
  }

  onSearch = (data: any): any => {
    console.log('search'); // tslint:disable-line no-console
    console.table(data); // tslint:disable-line no-console
  };

  toggleModal = (isOpen) => () => {
    this.setState({
      isItemModalOpen: isOpen,
    });
  };

  render() {
    const { createItem } = this.props;
    const { isItemModalOpen } = this.state;

    return (
      <div className="wrap-top-header">
        <ItemModal
          isOpen={isItemModalOpen}
          onSubmit={createItem}
          onClose={this.toggleModal(false)}
        />
        <div className="container-fluid">
          <div className="row">
            <SearchForm onSubmit={this.onSearch} />
            <div className="col header-right-block">
              <div className="header-block-item">
                <Button
                  className="btn btn-login header-btn"
                  onClick={this.toggleModal(true)}
                >
                  <img
                    className="header-plus"
                    src="/images/plus.svg"
                    alt="plus"
                  />
                  <span className="title-header-btn">
                    <FormattedMessage {...messages.createItem} />
                  </span>
                </Button>
              </div>
              <div className="header-block-item relative">
                <img
                  className="header-alarm"
                  src="/images/alarm.svg"
                  alt="notifications"
                />
                <div className="green-round" />
              </div>
              <div className="header-block-item">
                <Link to="/profile/bio">
                  <img
                    className="header-avatar"
                    src="/images/avatar.png"
                    alt="uset-profile"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const enhance = connect(null, { createItem });

export default enhance(MainHeader);
