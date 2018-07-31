import React from 'react';
import SecondaryMenu from 'components/common/SecondaryMenu/SecondaryMenu';

const menuItems = [
  {
    label: 'Items',
    id: 'jh5',
    url: '/search/items',
  },
  {
    label: 'Departments',
    id: 'jhg',
    url: '/search/departments',
  },
  {
    label: 'Collaborators',
    id: 'jh6',
    url: '/search/collaborators',
  },
];

const SearchMenu = () => {
  const itemRow = menuItems.map((x) => <SecondaryMenu key={x.id} x={x} />);
  return <ul className="list-table">{itemRow}</ul>;
};

export default SearchMenu;
