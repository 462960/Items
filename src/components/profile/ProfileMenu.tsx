import React from 'react';
import SecondaryMenu from 'components/common/SecondaryMenu/SecondaryMenu';

const menuItems = [
  {
    label: 'Account settings',
    id: 'jh5',
    url: '/profile/bio',
  },
  {
    label: 'Change Email',
    id: 'jhg',
    url: '/profile/email',
  },
  {
    label: 'Change password',
    id: 'jh6',
    url: '/profile/password',
  },
  {
    label: 'Security & Privacy',
    id: 'jhnh',
    url: '/profile/privacy',
  },
  {
    label: 'Payment Details',
    id: 'j67',
    url: '/profile/payment',
  },
  {
    label: 'Help',
    id: 'j32',
    url: '/profile/help',
  },
  {
    label: 'Log out',
    id: 'jmu',
    url: '/login',
  },
];

const ProfileMenu = () => {
  const itemRow = menuItems.map((x) => <SecondaryMenu key={x.id} x={x} />);
  return <ul className="list-table">{itemRow}</ul>;
};

export default ProfileMenu;
