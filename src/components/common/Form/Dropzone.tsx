import React from 'react';
import ReactDropzone from 'react-dropzone';
import Error from './Error';

interface IProps extends IInput {
  multiple?: boolean;
}

class Dropzone extends React.PureComponent<IProps> {
  static defaultProps = {
    multiple: true,
  };

  private onDrop = (filesToUpload) => {
    const {
      input: { onChange },
    } = this.props;
    return onChange(filesToUpload);
  };

  private removeFile = (file: File) => () => {
    const {
      input: { onChange, value = [] },
    } = this.props;

    onChange(value.filter((loadedFile: File) => loadedFile.name !== file.name));
  };

  private renderFileName = (file: File) => {
    return (
      <div key={file.name} className="col-12">
        <span>{file.name}</span>
        <svg
          className="svg-cart-red pointer m-l-10"
          onClick={this.removeFile(file)}
        >
          <use xlinkHref="/images/sprite.svg#minus" />
        </svg>
      </div>
    );
  };

  private renderValueDescription = () => {
    const {
      input: { value },
    } = this.props;

    return (
      Array.isArray(value) &&
      Boolean(value.length) && (
        <div className="text-hint">
          <div>Attached files:</div>
          <div className="row">{value.map(this.renderFileName)}</div>
        </div>
      )
    );
  };

  render() {
    const {
      placeholder,
      multiple,
      input: { name },
    } = this.props;

    return (
      <>
        <ReactDropzone
          name={name}
          onDrop={this.onDrop}
          multiple={multiple}
          className="form-control-photo"
          activeClassName="active"
          disablePreview
        >
          {placeholder}
        </ReactDropzone>
        <div className="posr">
          {this.renderValueDescription()}
          <Error {...this.props} />
        </div>
      </>
    );
  }
}

export default Dropzone;
