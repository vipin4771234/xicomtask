import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {scale} from '../utils/mixins';

interface CustomInputProps {
  label: string;
  value: string;
  error: string;
  onChange: (val: string) => void;
  onFocus: () => void;
}

const CustomInput = ({
  label,
  value,
  error,
  onChange,
  onFocus,
}: CustomInputProps) => {
  const onChangeText = (val: string) => {
    console.log(val);
    onChange(val);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
          onFocus={onFocus}
        />
      </View>
      {error ? (
        <Text
          style={{
            alignSelf: 'flex-end',
            marginTop: scale(5),
            color: '#de645f',
          }}>
          {error}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  container: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    flex: 3,
    paddingHorizontal: scale(10),
    height: scale(40),
    color: '#3c3c3c'
  },
  text: {
    fontSize: scale(15),
    paddingRight: scale(10),
    flex: 1,
    color: '#3c3c3c'
  },
});

export default CustomInput;
