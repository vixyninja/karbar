import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLOR from '../../theme/colors/colors';
import {AppContext} from '../../utilities/useContext/AppContext';
import AxiosInstance from '../../utilities/api/axiosClient';
const path =
  'https://nld.mediacdn.vn/291774122806476800/2022/8/1/hinh-1-1659345968823978566487.jpg';
const EditProfile = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const {user, setUser, isLoading, setIsLoading} = useContext(AppContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarN, setAvatar] = useState(path);
  const [dob, setDob] = useState('');
  useEffect(() => {
    setName(user.name);
    setAddress(user.address);
    setPhone(user.phone);
    setDob(user.dob);
    return () => {};
  }, []);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance().post('users/update-profile', {
        name: name,
        address,
        phone,
        avatar: path,
        dob: dob,
      });
      console.log(response);
      if (response.error == false) {
        ToastAndroid.show('Update Successfully', ToastAndroid.SHORT);
        await setUser(response.data);
        navigation.goBack();
        setIsLoading(false);
      }
    } catch (e) {
      console.log('abc', e);
    }
  };
  const Toolbar = () => {
    return (
      <View
        style={{
          marginTop: height * 0.01,
        }}>
        <Text
          style={{
            color: '#E4E6EB',
            textAlign: 'center',
            lineHeight: 24,
            fontWeight: '400',
            fontSize: 16,
          }}>
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 0,
            top: 5,
          }}>
          <Icon name="arrow-left" size={20} color={'#E4E6EB'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEdit}
          style={{
            position: 'absolute',
            right: 0,
            top: 5,
          }}>
          <Icon name="check" size={20} color={'#E4E6EB'} />
        </TouchableOpacity>
      </View>
    );
  };
  const ImageComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: width * 0.05,
        }}>
        <View>
          <Image
            source={{
              uri: user?.avatar,
            }}
            style={{width: width * 0.4, height: height * 0.2, borderRadius: 99}}
          />

          <Icon
            name="camera"
            size={14}
            color={COLOR.white}
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              backgroundColor: COLOR.primary,
              padding: 6,
              borderRadius: 99,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLOR.background, flex: 1}}>
      {isLoading == true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'white'} size={18} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: COLOR.background,
            flex: 1,
            paddingHorizontal: width * 0.05,
            paddingTop: height * 0.03,
          }}>
          <Toolbar />
          <ImageComponent />
          <View>
            <View>
              <Text style={{color: COLOR.iconColor, marginBottom: 5}}>
                Username
              </Text>
              <TextInput
                style={{
                  backgroundColor: COLOR.inputColor,
                  color: 'white',
                  borderRadius: 6,
                }}
                defaultValue={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View>
              <Text style={{color: COLOR.iconColor, marginBottom: 5}}>
                Address
              </Text>
              <TextInput
                style={{
                  backgroundColor: COLOR.inputColor,
                  color: 'white',
                  borderRadius: 6,
                }}
                defaultValue={address}
                onChangeText={text => setAddress(text)}
              />
            </View>
            <View>
              <Text style={{color: COLOR.iconColor, marginBottom: 5}}>
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: COLOR.inputColor,
                  color: 'white',
                  borderRadius: 6,
                }}
                defaultValue={user.email}
                editable={false}
              />
            </View>
            <View>
              <Text style={{color: COLOR.iconColor, marginBottom: 5}}>
                Phone Number
              </Text>
              <TextInput
                style={{
                  backgroundColor: COLOR.inputColor,
                  color: 'white',
                  borderRadius: 6,
                }}
                defaultValue={phone}
                onChangeText={text => setPhone(text)}
              />
            </View>
            <View>
              <Text style={{color: COLOR.iconColor, marginBottom: 5}}>Dob</Text>
              <TextInput
                style={{
                  backgroundColor: COLOR.inputColor,
                  color: 'white',
                  borderRadius: 6,
                }}
                defaultValue={dob}
                onChangeText={text => setDob(text)}
              />
            </View>
            <View>
              <Text style={{color: COLOR.iconColor, marginBottom: 5}}>
                Creat At
              </Text>
              <TextInput
                style={{
                  backgroundColor: COLOR.inputColor,
                  color: 'white',
                  borderRadius: 6,
                }}
                defaultValue={user.createdAt}
                editable={false}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
