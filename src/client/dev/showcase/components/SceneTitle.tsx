import {Text, TextProps} from '@verza/sdk/react';

const SceneTitle = ({children, ...props}: TextProps & {children: string}) => {
  return (
    <Text
      fontSize={0.5}
      color="#d4d4d4"
      outlineWidth={0.05}
      outlineColor="#212121"
      text={children}
      {...props}
    />
  );
};

export default SceneTitle;
