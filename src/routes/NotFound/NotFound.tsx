import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.PureComponent {
  render() {
    return (
      <div>
        <div>Not Found</div>
        <Link to="/">Link to homepage</Link>
      </div>
    );
  }
}

export default NotFound;
