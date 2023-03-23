import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ButtonComponent = props => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={[{justifyContent: 'center', alignItems: 'center'}, props.style]}
        onPress={props.onClick}>
        <Text style={{color: '#fff', fontWeight: '600', lineHeight: 24}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
