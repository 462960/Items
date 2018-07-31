import React from 'react';
import SearchMenu from 'components/search/SearchMenu';
import SearchResultsTable from 'components/search/SearchResultsTable';

class Search extends React.Component<any> {
  render() {
    return (
      <>
        <SearchMenu />
        <SearchResultsTable />
      </>
    );
  }
}

export default Search;
