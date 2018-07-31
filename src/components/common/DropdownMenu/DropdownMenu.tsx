import React from 'react';
import cn from 'classnames';

interface IProps {
  isOpen: boolean;
  options: IMenuOption[];
  className?: string;
}

class DropdownMenu extends React.PureComponent<IProps> {
  private renderOption = (option: IMenuOption) => (
    <li
      key={option.label}
      className={cn('dropdown-menu-item', { disabled: option.disabled })}
      onClick={option.disabled ? undefined : option.onClick}
    >
      {option.label}
    </li>
  );

  render() {
    const { isOpen, options, className } = this.props;

    return (
      <ul
        className={cn(className, 'dropdown-menu-component', {
          '--show': isOpen,
        })}
      >
        {options.map(this.renderOption)}
      </ul>
    );
  }
}

export default DropdownMenu;
