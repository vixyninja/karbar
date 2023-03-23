import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ItemNews = props => {
  let {
    _id = '',
    title = '',
    content = '',
    image = '',
    createdAt = '',
  } = props.data;
  return (
    <View>
      {typeof image != 'object' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: image,
            }}
            style={{width: 100, height: 110, borderRadius: 6}}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text
              numberOfLines={2}
              style={{
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 24,
                color: '#B0B3B8',
              }}>
              {title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 24,
                color: '#E4E6EB',
              }}>
              {_id}
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 24,
                color: '#B0B3B8',
              }}>
              {createdAt}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemNews;

const styles = StyleSheet.create({});
