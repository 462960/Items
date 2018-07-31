import React from 'react';
import {
  userHelpGettingStarted,
  userHelpAdministrations,
} from 'helpers/userHelpText';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import AskQuestionModal from 'components/common/Modal/AskQuestionModal/AskQuestionModal';

class ProfileUserHelp extends React.Component<any, any> {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  toggleTogglable = (e) => {
    this.setState({
      [e.target.id]: !this.state[e.target.id],
    });
  };

  render() {
    const { isModalOpen } = this.state;

    const getStartedText = userHelpGettingStarted.map((x) => (
      <div key={x.id} className="text-string show">
        <div className="df-sb w-100">
          <div className="text-list">{x.question}</div>
          <button
            id={x.id}
            type="button"
            onClick={this.toggleTogglable}
            className="wrap-row wrap-row-hov"
          >
            <svg
              className={cn('svg-down-arrow-black', {
                arrowUp: this.state[x.id],
                arrowDown: !this.state[x.id],
              })}
              style={{ pointerEvents: 'none' }}
            >
              <use xlinkHref="/images/sprite.svg#down-arrow" />
            </svg>
          </button>
        </div>
        <CSSTransition in={this.state[x.id]} classNames="fade" timeout={650}>
          {this.state[x.id] ? (
            <div className="marker-string">
              <div className="text-list">{x.answer}</div>
            </div>
          ) : (
            <span />
          )}
        </CSSTransition>
      </div>
    ));

    const administrationsText = userHelpAdministrations.map((x) => (
      <div key={x.id} className="text-string show">
        <div className="df-sb w-100">
          <div className="text-list">{x.question}</div>
          <button
            id={x.id}
            type="button"
            onClick={this.toggleTogglable}
            className="wrap-row wrap-row-hov"
          >
            <svg
              className={cn('svg-down-arrow-black', {
                arrowUp: this.state[x.id],
                arrowDown: !this.state[x.id],
              })}
              style={{ pointerEvents: 'none' }}
            >
              <use xlinkHref="/images/sprite.svg#down-arrow" />
            </svg>
          </button>
        </div>
        <CSSTransition in={this.state[x.id]} classNames="fade" timeout={650}>
          {this.state[x.id] ? (
            <div className="marker-string">
              <div className="text-list">{x.answer}</div>
            </div>
          ) : (
            <span />
          )}
        </CSSTransition>
      </div>
    ));

    return (
      <>
        <AskQuestionModal isOpen={isModalOpen} closeModal={this.closeModal} />

        <div className="block-list-none-table">
          <div className="scroll-block">
            <div className="list-none-table-block">
              <div className="title-string">
                <h3 className="title-list">Getiing started</h3>
              </div>
              {getStartedText}
            </div>
            <div className="list-none-table-block">
              <div className="title-string">
                <h3 className="title-list">Administratios</h3>
              </div>
              {administrationsText}
            </div>
          </div>
          <div className="ta-r p-t-25">
            <button
              type="button"
              className="btn btn-inventor btn-lime"
              onClick={this.openModal}
            >
              <img
                style={{ pointerEvents: 'none' }}
                className="header-plus"
                src="/images/que.svg"
                alt="pensil"
              />
              <span
                style={{ pointerEvents: 'none' }}
                className="title-header-btn"
              >
                Ask a question
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ProfileUserHelp;
