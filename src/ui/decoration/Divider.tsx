import React from "react";
import { DefaultTheme } from "tailwindcss/types/generated/default-theme";

type Props = {
  styles?: {
    marginTop?: `mt-${keyof DefaultTheme["spacing"]}`;
    marginBottom?: `mb-${keyof DefaultTheme["spacing"]}`;
  };
  label: string;
};

const Divider = ({
  styles: { marginTop, marginBottom } = {},
  label,
}: Props) => {
  return (
    <div
      className={`${marginTop || ""} ${
        marginBottom || ""
      } after:border after:border-color-normal text-color-light text-sm after:ml-2 after:w-full after:block flex gap-3 after:h-px w-full pr-4 items-center whitespace-pre focus:text-color-normal focus:after:border-color-normal focus:outline-none`}
    >
      {label}
    </div>
  );
};

export default Divider;
