import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import PhoneNumberInput from 'react-native-phone-number-input';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  iconName,
  number,
  eye,
  visible,
  togglePasswordVisibility,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          {number ? (
            <>
              <Text style={styles.text}>{name}</Text>
              <Animatable.View animation={error && 'shake'}>
                <PhoneNumberInput
                  editable
                  defaultCode="BD"
                  placeholder={placeholder}
                  placeholderTextColor="#818181"
                  value={value}
                  onChangeFormattedText={onChange}
                  onBlur={onBlur}
                  containerStyle={[
                    styles.containerNumber,
                    {borderColor: error ? 'red' : Colors.primary},
                  ]}
                  textContainerStyle={[
                    styles.input,
                    {
                      backgroundColor: 'transparent',
                    },
                  ]}
                  textInputStyle={{
                    fontSize: 14,
                    color: Colors.white,
                  }}
                  codeTextStyle={{
                    color: Colors.gray,
                  }}
                />
              </Animatable.View>
            </>
          ) : (
            <>
              <Text style={styles.text}>{name}</Text>
              <Animatable.View
                animation={error && 'shake'}
                style={[
                  styles.container,
                  {borderColor: error ? 'red' : Colors.primary},
                ]}>
                <Icon
                  style={styles.inputIcon}
                  name={iconName}
                  size={20}
                  color={Colors.primary}
                />
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder}
                  style={styles.input}
                  secureTextEntry={secureTextEntry}
                  placeholderTextColor={Colors.gray}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {eye && (
                  <Icon
                    style={styles.inputIconEye}
                    name={'eye'}
                    size={20}
                    color={Colors.primary}
                  />
                )}
              </Animatable.View>
            </>
          )}

          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch', marginLeft: 10}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
    borderRadius: 25,
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 2,
  },
  containerNumber: {
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
    borderRadius: 25,
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    width: '100%',
    height: 46,
  },
  input: {
    paddingTop: 4,
    paddingBottom: 4,
    color: Colors.white,
  },
  text: {
    color: Colors.primary,
    marginLeft: 10,
    marginTop: 15,
    textTransform: 'capitalize',
  },
  inputIcon: {
    padding: 8,
    marginHorizontal: 2,
  },
  inputIconEye: {
    marginLeft: 125,
  },
});

export default CustomInput;
