import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { styled } from "@nextui-org/react";

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

const Button = styled("button", {
  bg: "transparent",
  display: "flex",
  alignItems: "center",
  gap: "$4",
  "&:focus .roundbox": {
    outline: "2px solid $primary",
    outlineOffset: "2px",
  },
  ".roundbox": {
    border: "1px solid $accents6",
    borderRadius: "$squared",
    w: "$8",
    h: "$8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".aside": {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "column",
  },
  ".rounded": {
    borderRadius: "50%",
  },
  small: {
    color: "$accents6",
  },
});

const Checkbox = ({
  uniqueId,
  setChecked,
  checked,
  description,
  title,
  onChecked,
  rounded,
  index,
}: CheckboxProps) => {
  const [localChecked, setLocalChecked] = useState(false);
  const selectedIndex = checked === index;
  return (
    <Button
      onClick={() => {
        onChecked?.();
        if (setChecked) setChecked(index as number);
        else setLocalChecked((prev) => !prev);
      }}
    >
      <input
        type="checkbox"
        name={uniqueId}
        id={uniqueId}
        hidden
        checked={selectedIndex || localChecked}
      />
      <div className={`roundbox ${rounded ? "rounded" : ""}`}>
        {(() => {
          if (rounded) {
            if (selectedIndex) return <GoPrimitiveDot />;
          } else {
            if (localChecked) return <BsCheck />;
          }
          return null;
        })()}
      </div>

      <aside className="aside">
        <small>{description}</small>
        <label htmlFor={uniqueId}>{title}</label>
      </aside>
    </Button>
  );
};
export default Checkbox;
