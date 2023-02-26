import { Text, View} from 'react-native';
import React from 'react';

const Title = ({children, color, fontSize}) => {
  return (
    <View>
      <Text
        style={{
          marginTop: 10,
          color: color,
          fontSize: fontSize,
          textTransform: 'capitalize',
        }}>
        {children}
      </Text>
    </View>
  );
};

export default Title;
