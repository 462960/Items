import { Field, FieldProps } from 'react-final-form';

interface IFieldExtendedProps extends FieldProps {
  component?: React.ComponentType<any> | string;
}

export default Field as React.ComponentType<IFieldExtendedProps>;
