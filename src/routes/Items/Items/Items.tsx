import React from 'react';
import TopSection from 'components/common/TopSection/TopSection';
import Tabs from 'components/common/Tabs/Tabs';
import ItemsTableContainer from './ItemsTableContainer/ItemsTableContainer';

class Items extends React.PureComponent<IWithRouter> {
  render() {
    const { match } = this.props;

    return (
      <>
        <TopSection className="pb-0">
          <div className="header-left-block-easy">
            <span className="header-title">Items</span>
            <p className="header-text">
              Cъешь ещё этих мягких французских булок, да выпей чаю
            </p>
          </div>
          <Tabs
            tabs={[
              { label: 'Current', to: match.url },
              { label: 'Archive', to: match.url + '?tab=archive' },
            ]}
          />
        </TopSection>

        <ItemsTableContainer />
      </>
    );
  }
}

export default Items;
