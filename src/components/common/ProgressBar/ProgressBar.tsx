import React from 'react';

interface IProps {
  percent?: number;
  label?: React.ReactNode;
}

export class ProgressBar extends React.PureComponent<IProps> {
  static defaultProps = {
    percent: 0,
  };

  render() {
    const { percent, label } = this.props;

    return (
      <div>
        <div className="text-center">{label}</div>
        <div className="progress-bar animate">
          <span style={{ width: `${percent}%` }}>
            <span />
          </span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
