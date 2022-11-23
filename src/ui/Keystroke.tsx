import React from 'react';
import { KEYS } from '../lib/keys';

export type TypeKeystroke = {
  id: string;
  keys: KEYS[];
  size?: 'sm' | 'xs' | 'xxs';
  rounded?: boolean;
};

function Keystroke({ id, keys, size = 'sm', rounded }: TypeKeystroke) {
  return (
    <hgroup
      className={`flex gap-1 items-center bg-gray-800 border border-gray-700 ${
        rounded ? 'rounded-full' : 'rounded-md'
      } px-2 text-[12px] whitespace-nowrap`}
    >
      {keys.map((key, index) => (
        <>
          <div key={id + index + key}>
            <kbd
              id={id + index + key}
              data-highlight-key={key}
              className={`${size === 'xxs' ? 'text-[12px]' : `text-${size}`} font-sans`}
            >
              {key}
            </kbd>
          </div>
          {index < keys.length - 1 ? ' + ' : null}
        </>
      ))}
    </hgroup>
  );
}

export default Keystroke;
