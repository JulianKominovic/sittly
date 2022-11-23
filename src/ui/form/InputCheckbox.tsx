import React from 'react';
import Checkbox from './Checkbox';
import InputTemplate, { InputTemplateProps } from './InputTemplate';

type Props = {
  options: {
    title: string;
    description: string;
    onChecked?: () => void;
  }[];
} & Pick<InputTemplateProps, 'id' | 'label'>;

const InputCheckbox = (props: Props) => {
  const { id, options } = props;
  return (
    <InputTemplate {...props} error={null}>
      <main className="flex gap-4">
        {options.map((item, index) => {
          const uniqueId = id + index + 'opt';
          return (
            <Checkbox
              onChecked={item.onChecked}
              uniqueId={uniqueId}
              description={item.description}
              title={item.title}
            />
          );
        })}
      </main>
    </InputTemplate>
  );
};

export default InputCheckbox;
