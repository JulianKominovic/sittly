import React from 'react';
import { useSettings } from '../../store/settingsStore';
import Flex from '../../ui/containers/Flex';
import Divider from '../../ui/decoration/Divider';
import InputSelect from '../../ui/form/InputSelect';

type Props = {};

const COLOR_SCHEME = {
  Default: {
    '50': '#E6E6E6',
    '100': '#CCCCCC',
    '200': '#999999',
    '300': '#666666',
    '400': '#787878',
    '500': '#333333',
    '600': '#333333',
    '700': '#232323',
    '800': '#0A0A0A',
    '900': 'rgba(0,0,0,.95)'
  },
  Blue: {
    '50': '#E6E5FA',
    '100': '#D2D0F6',
    '200': '#A5A1ED',
    '300': '#7872E4',
    '400': '#4B43DA',
    '500': '#2C25BE',
    '600': '#241E9A',
    '700': '#1B1673',
    '800': '#120F4D',
    '900': '#090726'
  },
  Orange: {
    '50': '#FFF2E5',
    '100': '#FFE6CC',
    '200': '#FFCC99',
    '300': '#FFB366',
    '400': '#FF9933',
    '500': '#FF8100',
    '600': '#CC6600',
    '700': '#994D00',
    '800': '#663300',
    '900': '#331A00'
  }
};

const ColorShow = ({ title, color }: { title: string; color: string }) => (
  <Flex
    styles={{
      alignItems: 'items-center',
      justifyContent: 'justify-between'
    }}
  >
    {title}{' '}
    <Flex
      styles={{
        alignItems: 'items-center',
        gap: 'gap-2',
        justifyContent: 'justify-end'
      }}
    >
      {Object.values(color).map((c) => (
        <div className="w-8 rounded-md h-4" style={{ background: c }} />
      ))}
    </Flex>
  </Flex>
);

const Config = (props: Props) => {
  const setColorPallette = useSettings((state) => state.setColorPallette);
  return (
    <div>
      <Divider
        styles={{
          marginBottom: 'mb-2',
          marginTop: 'mt-2'
        }}
        label="Visual"
      />
      {/* <InputSelect
        label="Color pallette"
        defaultValue="gray"
        id="color-pallette"
        options={[
          {
            display: () => <>Gray</>,
            value: 'gray',
            onSelect: () => setColorPallette({})
          },
          ...Object.entries(COLOR_SCHEME).map(([key, value]) => ({
            display: <ColorShow color={value} title={key} />,
            value: 'blue',
            onSelect: () => setColorPallette(value)
          }))
        ]}
      /> */}
    </div>
  );
};

export default Config;
