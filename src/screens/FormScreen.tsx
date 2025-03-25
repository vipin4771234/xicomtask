import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DynamicImage from '../components/DynamicImage';
import {scale} from '../utils/mixins';
import ReactNativeBlobUtil from 'react-native-blob-util';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  phoneValidation,
} from '../utils/Validations';

const FormScreen = ({route}: any) => {
  const {source} = route.params;
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [formFieldsError, setFormFieldsError] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
  });

  const validate = () => {
    const isValidFirstName = firstNameValidation(formFields.firstName);
    const isValidLastName = lastNameValidation(formFields.lastName);
    const isValidEmail = emailValidation(formFields.email);
    const isValidPhone = phoneValidation(formFields.phone);
    // console.log({isValidEmail});
    // console.log({isValidPhone});
    if (!isValidFirstName)
      setFormFieldsError(previous => ({
        ...previous,
        firstNameError: 'Enter a valid first name',
      }));
    if (!isValidLastName)
      setFormFieldsError(previous => ({
        ...previous,
        lastNameError: 'Enter a valid last name',
      }));
    if (!isValidEmail)
      setFormFieldsError(previous => ({
        ...previous,
        emailError: 'Enter a valid email',
      }));
    if (!isValidPhone)
      setFormFieldsError(previous => ({
        ...previous,
        phoneError: 'Enter a valid phone',
      }));

    return isValidFirstName && isValidLastName && isValidEmail && isValidPhone;
  };

  const onChange = (field: string, value: string) => {
    setFormFields({...formFields, [field]: value});
  };

  // console.log({source});
  const onSubmit = async () => {
    console.log(validate());
    if (!validate()) return;
    try {
      const base64Data = await ReactNativeBlobUtil.fetch('GET', source).then(
        res => res.base64(),
      );
      console.log(formFields);
      const formData = new FormData();
      formData.append('user_image', {
        uri: `data:image/jpeg;base64,${base64Data}`,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('first_name', formFields.firstName);
      formData.append('last_name', formFields.lastName);
      formData.append('email', formFields.email);
      formData.append('phone', formFields.phone);
      console.log(formData.getParts());
      // return;
      const response = await axios.post(
        'http://dev3.xicomtechnologies.com/xttest/savedata.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response.data);
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <ScrollView>
      <DynamicImage source={source} onPress={() => {}} />
      <CustomInput
        label={'First Name'}
        value={formFields.firstName}
        onChange={val => onChange('firstName', val)}
        error={formFieldsError.firstNameError}
        onFocus={() =>
          setFormFieldsError(previous => ({...previous, firstNameError: ''}))
        }
      />
      <CustomInput
        label={'Last Name'}
        value={formFields.lastName}
        onChange={val => onChange('lastName', val)}
        error={formFieldsError.lastNameError}
        onFocus={() =>
          setFormFieldsError(previous => ({...previous, lastNameError: ''}))
        }
      />
      <CustomInput
        label={'Email'}
        value={formFields.email}
        onChange={val => onChange('email', val)}
        error={formFieldsError.emailError}
        onFocus={() =>
          setFormFieldsError(previous => ({...previous, emailError: ''}))
        }
      />
      <CustomInput
        label={'Phone'}
        value={formFields.phone}
        onChange={val => onChange('phone', val)}
        error={formFieldsError.phoneError}
        onFocus={() =>
          setFormFieldsError(previous => ({...previous, phoneError: ''}))
        }
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text>Submit</Text>
      </Pressable>
      <View style={{height: 50, width: '100%'}}></View>
    </ScrollView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginHorizontal: scale(20),
    marginVertical: scale(10),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderWidth: 1,
    borderColor: '#50048A',
    borderRadius: scale(10),
  },
});
