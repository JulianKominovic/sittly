import React, { useState } from 'react';
import Checkbox from './Checkbox';
import InputTemplate, { InputTemplateProps } from './InputTemplate';

type Props = {
  options: {
    title: string;
    description: string;
    onChecked?: () => void;
  }[];
} & Pick<InputTemplateProps, 'id' | 'label'>;

const InputRadio = (props: Props) => {
  const { id, options } = props;
  const [checked, setChecked] = useState(-1);
  return (
    <InputTemplate {...props} error={null}>
      <main className="flex gap-4">
        {options.map((item, index) => {
          const uniqueId = id + index + 'opt';
          return (
            <Checkbox
              key={uniqueId}
              onChecked={item.onChecked}
              uniqueId={uniqueId}
              description={item.description}
              title={item.title}
              checked={checked}
              setChecked={setChecked}
              index={index}
              rounded
            />
          );
        })}
      </main>
    </InputTemplate>
  );
};

export default InputRadio;
