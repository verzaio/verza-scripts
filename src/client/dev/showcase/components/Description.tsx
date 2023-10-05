import {Text, TextProps} from '@verza/sdk/react';

const Description = ({
  children,
  ...props
}: TextProps & {
  children?: string;
}) => {
  return (
    <Text
      fontSize={0.2}
      color="#e9e9e9"
      outlineWidth={0.02}
      outlineColor="#212121"
      text={children}
      {...props}
    />
  );
};

export default Description;
