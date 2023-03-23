import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLOR from '../../theme/colors/colors';

const DetailScreen = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const data = route.params.object;
  console.log(route.params.object);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const ToolBar = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color={'#B0B3B8'} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={() => alert('Share')}>
          <Icon
            name="share"
            size={18}
            color={'#B0B3B8'}
            style={{paddingHorizontal: width * 0.05}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Other')}>
          <Icon
            name="ellipsis-v"
            size={20}
            color={'#B0B3B8'}
            style={{paddingHorizontal: width * 0.01}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const PageHeader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Image
          source={{uri: data?.image}}
          style={{width: width * 0.15, height: height * 0.07, borderRadius: 99}}
          resizeMode="cover"
        />
        <View style={{marginStart: 4, flexShrink: 1}}>
          <Text style={[styles.textTitle]}>{data?._id}</Text>
          <Text
            style={[
              styles.textTitle,
              {color: '#B0B3B8', fontSize: 14, fontWeight: 400},
            ]}>
            {data?.createdAt}
          </Text>
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.primary,
            paddingVertical: width * 0.04,
            paddingHorizontal: width * 0.08,
            borderRadius: 6,
          }}>
          <Text style={{color: '#fff', fontWeight: '600', lineHeight: 24}}>
            Following
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Content = () => {
    return (
      <View>
        <Text
          style={[
            {
              color: '#B0B3B8',
              fontWeight: '400',
              fontSize: 14,
            },
          ]}>
          {data?.title}
        </Text>
        <Text
          style={[
            {
              color: '#E4E6EB',
              fontWeight: '400',
              fontSize: 24,
              lineHeight: 36,
              marginBottom: 70,
            },
          ]}>
          {data?.content}
        </Text>
      </View>
    );
  };
  const BottomView = () => {
    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const handleLike = () => {
      setLike(!like);
    };
    const handleBookmark = () => {
      setBookmark(!bookmark);
    };
    return (
      <View
        style={{
          position: 'absolute',
          width: width,
          height: 70,
          backgroundColor: '#1C1E21',
          bottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: width * 0.05,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleLike}>
            <Icon
              name="heart"
              size={20}
              color={like == true ? '#ED2E7E' : 'white'}
            />
          </TouchableOpacity>
          <Text style={{color: '#E4E6EB', paddingLeft: 4}}>24.5k</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
          <TouchableOpacity>
            <Icon name="comment" size={20} color={'#E4E6EB'} />
          </TouchableOpacity>
          <Text style={{color: '#E4E6EB', paddingLeft: 4}}>1k</Text>
        </View>
        <View style={{flex: 1}} />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={handleBookmark}>
            <Icon
              name="bookmark"
              size={20}
              color={bookmark == true ? COLOR.primary : 'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: COLOR.background,
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
      }}>
      <ToolBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageHeader />

        <Image
          source={{uri: data?.image}}
          style={{
            width: '100%',
            height: height * 0.3,
            borderRadius: 6,
            marginVertical: 22,
          }}
        />

        <Content />
      </ScrollView>

      <BottomView />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  textTitle: {
    color: '#E4E6EB',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
});
