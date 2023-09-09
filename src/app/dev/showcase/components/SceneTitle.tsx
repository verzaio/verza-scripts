import {Text, TextProps} from '@verza/sdk/react';

const SceneTitle = ({children, ...props}: TextProps) => {
  return (
    <Text
      fontSize={0.5}
      color="#d4d4d4"
      outlineWidth={0.05}
      outlineColor="#212121"
      {...props}>
      {children}
    </Text>
  );
};

export default SceneTitle;
