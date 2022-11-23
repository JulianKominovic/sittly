import React from 'react';
import { INDEX } from '../index';
import Link from './components/Link';

function Navbar() {
  return (
    <nav className="p-2 pb-2 flex items-center border-t border-gray-800 border-b overflow-x-auto gap-2 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-800 scrollbar-rounded-lg scrollbar">
      {Object.values(INDEX).map(({ module, displayName }, index) => (
        <Link index={index} key={module} id={module} title={displayName} />
      ))}
    </nav>
  );
}

export default Navbar;
