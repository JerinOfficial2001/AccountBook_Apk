import React, {useState, useContext} from 'react';
import ModelLayout from '../src/Layouts/ModelLayout';
import {TouchableOpacity} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {GlobalState} from '../Navigation';

export default function UpdateParty({route, navigation}) {
  const {title} = route.params;
  const [inputDatas, setinputDatas] = useState('');
  const handleOnchange = value => {
    setinputDatas(value);
  };
  const handleSubmit = () => {
    console.log(inputDatas);
  };
  const toCapitalize = text => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
  };
  return (
    <ModelLayout>
      <TextInput
        label={
          title == 'name' ? 'Name' : title == 'phone' ? 'Mobile Number' : ''
        }
        value={inputDatas}
        onChangeText={handleOnchange}
        mode="outlined"
        keyboardType="phone-pad"
        style={{
          backgroundColor: 'transparent',
          width: '95%',
          marginTop: 10,
        }}
        theme={{colors: {background: '#262626'}}}
        activeOutlineColor="#6DCCDD"
        outlineColor="#7B7B7B"
        contentStyle={{color: 'white'}}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        // icon={() => <Icon name="person-add" color={'black'} size={23} />}
        style={{
          position: 'absolute',
          bottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '95%',
          borderRadius: 8,
          borderWidth: 2,
          padding: 10,
          backgroundColor: '#137511',
          borderColor: 'transparent',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
          SAVE
        </Text>
      </TouchableOpacity>
    </ModelLayout>
  );
}
