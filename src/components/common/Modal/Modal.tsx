import React from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  hide?: boolean;
  secondary?: boolean;
  isOpen?: boolean;
  onTransitionEnd?(): any;
  title?: React.ReactNode;
  titleIcon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

interface IState {
  animated: boolean;
}

class Modal extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      animated: false,
    };
  }

  renderModal = () => {
    const {
      hide,
      secondary,
      isOpen,
      title,
      titleIcon,
      children,
      actions,
      className,
      onTransitionEnd,
    } = this.props;

    return (
      <CSSTransition
        in={isOpen}
        timeout={600}
        unmountOnExit
        classNames="wrap-modal"
      >
        <div
          className={cn('wrap-modal', { secondary })}
          onTransitionEnd={onTransitionEnd}
        >
          <div
            className={cn('modal-content-inventor', className, {
              '-hidden': hide,
            })}
          >
            {Boolean(title) && (
              <div className="modal-header-inventor">
                <span className="modal-title-inventor">{title}</span>
                {titleIcon}
              </div>
            )}
            <div
              className={cn('modal-body-inventor', {
                '-empty': !Boolean(children),
              })}
            >
              {children}
            </div>
            {Boolean(actions) && (
              <div className="modal-footer-inventor">{actions}</div>
            )}
          </div>
        </div>
      </CSSTransition>
    );
  };

  render() {
    return createPortal(
      this.renderModal(),
      document.getElementById('modalContainer')
    );
  }
}

export default Modal;
