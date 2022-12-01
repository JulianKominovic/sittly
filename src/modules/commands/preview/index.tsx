import InputTextArea from "../../../ui/form/InputTextArea";

type Props = {
  calculatedCommandOutput: string;
};

const Preview = ({ calculatedCommandOutput }: Props) => {
  return (
    <>
      <InputTextArea
        css={{
          w: "100%",
        }}
        tabIndex={-1}
        id="preview"
        rows={8}
        readonly
        value={calculatedCommandOutput}
      />
    </>
  );
};

export default Preview;
