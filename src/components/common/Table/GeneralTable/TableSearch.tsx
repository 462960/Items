import React from 'react';
import debounce from 'lodash.debounce';
import get from 'lodash.get';

interface IState {
  error?: string;
}

// TODO: refactor this shit
class TableSearch extends React.PureComponent<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  private onChange = (e) => {
    const value = get(e, 'target.value', '');
    if (value.length && value.length < 2) {
      this.setState({
        error: 'Search must be at least 2 characters long',
      });
    } else {
      this.setState({
        error: undefined,
      });
      this.debouncedOnChange(value);
    }
  };

  private debouncedOnChange = debounce(
    (value) => this.props.onChange(value),
    300
  );

  render() {
    const { error } = this.state;

    return (
      <>
        <input
          className="input-inventory m-r-10"
          type="text"
          placeholder="Search..."
          onChange={this.onChange}
        />
        <img className="lupe-abs" src="/images/small-lupe.svg" alt="page" />
        <div className="error" style={{ top: '105%', background: '#E5E9ED' }}>
          {error}
        </div>
      </>
    );
  }
}

export default TableSearch;
