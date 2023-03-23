import {StyleSheet, Image, View, SafeAreaView} from 'react-native';
import React from 'react';
import COLOR from '../../theme/colors/colors';
const SplashScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: COLOR.background,
        }}>
        <Image
          source={require('../../images/splashImage.png')}
          resizeMode="contain"
          style={{width: '70%', height: '50%'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
