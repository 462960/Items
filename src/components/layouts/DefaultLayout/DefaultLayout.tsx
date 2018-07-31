import React from 'react';
import cn from 'classnames';
import LeftMenu from 'components/common/LeftMenu/LeftMenu';
import MainHeader from 'components/common/MainHeader/MainHeader';
import { connect } from 'react-redux';

interface IProps {
  children: any;
  className?: string;
  userData?: {
    code: number;
    data: object;
  };
}

class DefaultLayout extends React.PureComponent<IProps> {
  state = {
    code: null,
  };

  // ---- On July,4 last_update does not exist on backend. That's why it's commented ---
  // componentDidUpdate(prevProps) {
  //   if (this.props.userData.data.last_update !== prevProps.userData.data.last_update) {
  //     this.setState({
  //       code: this.props.userData.code
  //     })
  //   }
  // }

  killInfoMessenger = () => {
    this.setState({
      code: null,
    });
  };

  render() {
    const { children, className } = this.props;

    const { code } = this.state;

    return (
      <div className={cn('wrap-page', className)}>
        {code === 200 || code === 401 ? (
          <div
            className={cn(
              'top-info-messenger',
              { success: code === 200 },
              { fail: code === 401 }
            )}
          >
            {code === 200 ? `You've just sucessfully updated your profile` : ''}
            {code === 401 ? `Sorry, something went wrong...` : ''}
            <img
              className="close-button"
              style={{ cursor: 'pointer', display: 'block' }}
              onClick={this.killInfoMessenger}
              src="/images/cancel-white.svg"
              alt="icon-error-input"
            />
          </div>
        ) : null}
        <div className="wrap-inventory">
          <LeftMenu />
          <div className="wrap-inventory-content">
            <MainHeader />
            {children}
          </div>
        </div>
      </div>
    );
  }
}

const enhance: any = connect((state: any) => ({
  userData: state.getIn(['profile', 'profile']).toJS(),
}));

export default enhance(DefaultLayout);
