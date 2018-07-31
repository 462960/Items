import React from 'react';
import CoffeeSpinner from 'components/common/CoffeeSpinner/CoffeeSpinner';
import { FormattedMessage } from 'react-intl';
import messages from './translate';

interface IProps {
  error?: object;
  timedOut: boolean;
  pastDelay: boolean;
}

export class ComponentLoader extends React.PureComponent<IProps> {
  render() {
    const { error, timedOut, pastDelay } = this.props;
    let text = null;

    if (error) {
      text = <div>{error.toString()}</div>;
    } else if (timedOut) {
      text = <FormattedMessage {...messages.timedOut} />;
    }

    if (!pastDelay) return null;

    return (
      <div className="row h-100">
        <div className="col fl-column-c">
          <div>
            <CoffeeSpinner />
            {text}
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentLoader;
