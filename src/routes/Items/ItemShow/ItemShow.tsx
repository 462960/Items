import React from 'react';
import TopSection from 'components/common/TopSection/TopSection';

class ItemShow extends React.PureComponent<IWithRouter> {
  componentDidMount() {
    global.console.log('itemId', this.props.match.params.id);
  }

  render() {
    const { history } = this.props;

    return (
      <>
        <TopSection className="p-t-back">
          <div className="header-left-block-easy--df-sb">
            <div className="p-r-45">
              <button className="style-btn-non p-b-15" onClick={history.goBack}>
                <svg className="svg-arrow-r svg-arrow-r--gray">
                  <use xlinkHref="/images/sprite.svg#left-arrow" />
                </svg>
                <span className="header-search">Back</span>
              </button>
              <h1 className="header-title">
                Apple iMac 21.5" A1418 (MMQA2UA/A)
              </h1>
              <button className="text-lime df style-btn-non">
                <svg className="svg-reload-lime">
                  <use xlinkHref="/images/sprite.svg#reload-lime" />
                </svg>
                <span className="m-l-5">Problems history</span>
              </button>
            </div>
            <div className="d-fl-cc">
              <div className="d-flex jc-fl-end">
                <button className="p-r-10 style-btn-non">
                  <svg className="svg-small-icon">
                    <use xlinkHref="/images/sprite.svg#pen-new" />
                  </svg>
                </button>
                <button className="p-r-10 style-btn-non">
                  <svg className="svg-small-icon">
                    <use xlinkHref="/images/sprite.svg#cart-trash" />
                  </svg>
                </button>
              </div>
              <span className="text-list text-list--light">
                Last update: 16/02/2017 by admin
              </span>
            </div>
          </div>
        </TopSection>
      </>
    );
  }
}

export default ItemShow;
