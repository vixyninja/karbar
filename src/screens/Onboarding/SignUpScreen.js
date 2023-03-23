import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import COLOR from '../../theme/colors/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AxiosInstance from '../../utilities/api/axiosClient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AppContext} from '../../utilities/useContext/AppContext';
const {width, height} = Dimensions.get('window');
const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusInputU, setFocusInputU] = useState('#3A3B3C');
  const [focusInputP, setFocusInputP] = useState('#3A3B3C');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setIsLogin, setUser} = useContext(AppContext);
  const onFocusU = () => {
    setFocusInputU('#fff');
  };
  const onBlurU = () => {
    setFocusInputU('#3A3B3C');
  };
  const onFocusP = () => {
    setFocusInputP('#fff');
  };
  const onBlurP = () => {
    setFocusInputP('#3A3B3C');
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  const handleLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance().post('/users/register', {
        email: username,
        password: password,
      });
      const data = response.data;
      console.log(response);
      if (data.error != false) {
        ToastAndroid.show('Sign Up Succesfully', ToastAndroid.SHORT);
        setLoading(false);
        setIsLogin(true);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Sign Up Failed, Please Again !!!', ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  const headerStyle = StyleSheet.create({
    text: {
      fontWeight: '700',
      fontSize: 48,
      lineHeight: 60,
      letterSpacing: 0.12,
    },
  });
  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={[headerStyle.text, {color: COLOR.primary}]}>Hello!</Text>
        <Text
          style={{
            fontWeight: '400',
            lineHeight: 30,
            fontSize: 20,
            width: width * 0.7,
            color: '#B0B3B8',
          }}>
          Signup to get Started
        </Text>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: height * 0.01,
            color: '#B0B3B8',
          }}>
          or continue with
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#EEF1F4',
                paddingHorizontal: width * 0.05,
                paddingVertical: height * 0.01,
                borderRadius: 6,
              }}>
              <Icon name="facebook" color={COLOR.primary} size={20} />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  paddingStart: width * 0.05,
                }}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: width * 0.08}} />
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#EEF1F4',
                paddingHorizontal: width * 0.05,
                paddingVertical: height * 0.01,
                borderRadius: 6,
              }}>
              <Icon name="google" color={COLOR.red} size={20} />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  paddingStart: width * 0.05,
                }}>
                Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{marginVertical: height * 0.01, color: '#B0B3B8'}}>
            don’t have an account ?
          </Text>
          <TouchableOpacity onPress={handleLoginScreen}>
            <Text style={{color: COLOR.primary, fontWeight: '600'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLOR.background, flex: 1}}>
      {loading == true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'white'} size={18} />
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: width * 0.05,
            marginVertical: height * 0.05,
          }}>
          <Header />
          <View style={styles.form}>
            <View
              style={{marginTop: height * 0.05, marginBottom: height * 0.01}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#B0B3B8'}}>Username</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                style={[styles.textInput, {backgroundColor: focusInputU}]}
                onBlur={() => onBlurU()}
                onFocus={() => onFocusU()}
                value={username}
                onChangeText={text => setUsername(text)}
              />
            </View>
            <View style={{marginVertical: height * 0.01}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#B0B3B8'}}>Password</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TextInput
                  style={[styles.textInput, {backgroundColor: focusInputP}]}
                  secureTextEntry={!showPass}
                  onBlur={() => onBlurP()}
                  onFocus={() => onFocusP()}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                {showPass == false ? (
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10}}
                    onPress={() => handleShowPass()}>
                    <Icon name="eye-slash" size={20} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10}}
                    onPress={() => handleShowPass()}>
                    <Icon name="eye" size={20} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <BouncyCheckbox
                size={18}
                fillColor={COLOR.primary}
                text={'Remember me'}
                innerIconStyle={{
                  borderWidth: 3,
                  borderRadius: 3,
                }}
                style={{lineHeight: 21}}
                textStyle={{
                  fontSize: 14,
                  textDecorationLine: 'none',
                  color: '#B0B3B8',
                }}
              />
            </View>
            <TouchableOpacity style={styles.buttonLogin} onPress={handleSignUp}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  lineHeight: 24,
                  color: COLOR.white,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Footer />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  form: {
    marginTop: height * 0.03,
  },
  textInput: {
    backgroundColor: '#3A3B3C',
    borderRadius: 6,
  },
  buttonLogin: {
    backgroundColor: COLOR.primary,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: height * 0.02,
  },
});
