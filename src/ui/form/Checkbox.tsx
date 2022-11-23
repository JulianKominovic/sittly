import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { focusedClasses, hoverClasses } from '../styles';

type CheckboxProps = {
  uniqueId: string;
  setChecked?: React.Dispatch<React.SetStateAction<number>>;
  checked?: number;
  description: string;
  title: string;
  onChecked?: () => void;
  rounded?: boolean;
  index?: number;
};

const Checkbox = ({ uniqueId, setChecked, checked, description, title, onChecked, rounded, index }: CheckboxProps) => {
  const [localChecked, setLocalChecked] = useState(false);
  const selectedIndex = checked === index;
  return (
    <button
      onClick={() => {
        onChecked?.();
        if (setChecked) setChecked(index as number);
        else setLocalChecked((prev) => !prev);
      }}
      className="flex w-fit items-center gap-2 [&:focus>div.checkbox]:focus:border-gray-700 [&:focus>div.checkbox]:focus:border-gray-600"
    >
      <input type="checkbox" name={uniqueId} id={uniqueId} hidden checked={selectedIndex || localChecked} />
      <div
        className={`checkbox h-5 w-5 bg-gray-800 flex items-center justify-center ${hoverClasses()} ${focusedClasses()} ${
          rounded ? 'rounded-full' : 'rounded-md'
        }`}
      >
        {(() => {
          if (rounded) {
            if (selectedIndex) return <GoPrimitiveDot />;
          } else {
            if (localChecked) return <BsCheck />;
          }
          return null;
        })()}
      </div>

      <aside className="flex flex-col justify-start items-start">
        <small className="text-gray-400">{description}</small>
        <label htmlFor={uniqueId}>{title}</label>
      </aside>
    </button>
  );
};
export default Checkbox;
