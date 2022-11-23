import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { KEYS } from '../../../lib/keys';
import Keystroke from '../../../ui/Keystroke';

type Props = {
  id: string;
  title: string;
  index: number;
};

function Link({ id, title, index }: Props) {
  const focusableKey: KEYS[] = [KEYS.ControlLeft, KEYS[`Digit${String(index + 1) as '0'}`]];
  const location = useLocation();

  return (
    <NavLink
      to={id}
      tabIndex={-1}
      className={({ isActive }) =>
        `hover:bg-gray-800 border border-gray-900 hover:border-gray-700 rounded-lg px-2 py-1 flex items-center gap-2 text-sm  focus:border-gray-700 whitespace-pre ${
          (isActive && id !== '' && location.pathname !== '/') || (id === '' && location.pathname === '/')
            ? 'bg-gray-800 border-gray-900'
            : ''
        }`
      }
      data-focuseablekeyctrl={String(index + 1)}
    >
      {title}
      <Keystroke size="xxs" keys={focusableKey} id={id} />
    </NavLink>
  );
}

export default Link;
