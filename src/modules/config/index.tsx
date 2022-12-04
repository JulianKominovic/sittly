import React from "react";
import useDatabase from "../../hooks/useDatabase";
import { useSettings } from "../../store/settingsStore";
import Divider from "../../ui/decoration/Divider";
import InputSelect from "../../ui/form/InputSelect";
import { ConfigStore } from "./store";

type Props = {};

const COLOR_SCHEME = {
  Yellow: `
  --text-color-opaque: #000000;
  --text-color-normal: #242424;
  --text-color-light: #000000;
  --border-color-light: #000000;
  --border-color-normal: #000000;
  --border-color-opaque: #ffba00;
  --background-color: #ff9e00;
  --background-secondary-color:#ffa700;
  --background-footer:rgba(0,0,0,--tw-bg-opacity);
  `,
};

const Config = (props: Props) => {
  const setColorPallette = useSettings((state) => state.setColorPallette);
  const { updateContent } = useDatabase<ConfigStore>();
  return (
    <div>
      <Divider marginBottom={2} marginTop={2} label="Visual" />
      <InputSelect
        label="Color pallette"
        initialValue="Default"
        options={[
          {
            label: "Default",
            value: "Default",
            onClick: () => {
              setColorPallette("");
              updateContent(() => ({ theme: "" }));
            },
          },
          ...Object.entries(COLOR_SCHEME).map(([key, value]) => ({
            label: key,
            value: key,
            onClick: () => {
              setColorPallette(value);
              updateContent(() => ({ theme: value }));
            },
          })),
        ]}
      />
    </div>
  );
};

export default Config;
