import {Text, View} from 'react-native';
import React from 'react';

const SubTitle = ({children, color, fontSize}) => {
  return (
    <View>
      <Text
        style={{
          marginTop: 5,
          color: color,
          fontSize: fontSize,
          textTransform: 'capitalize',
        }}>
        {children}
      </Text>
    </View>
  );
};

export default SubTitle;
