import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ButtonComponent, ItemNews} from '../../components/index';
import AxiosInstance from '../../utilities/api/axiosClient';
import COLOR from '../../theme/colors/colors';
import {AppContext} from '../../utilities/useContext/AppContext';
import {FloatingAction} from 'react-native-floating-action';

const Profile = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [data, setData] = useState([]);
  const {user, isLoading, setIsLoading, isReload} = useContext(AppContext);
  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await AxiosInstance().get('/articles');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    };
    fetchData();
    return () => {};
  }, [isReload]);
  const Header = () => {
    return (
      <View style={{marginTop: height * 0.01}}>
        <Text
          style={{
            color: '#E4E6EB',
            textAlign: 'center',
            lineHeight: 24,
            fontWeight: '400',
            fontSize: 16,
          }}>
          Profile
        </Text>
        <TouchableOpacity style={{position: 'absolute', right: 0, top: 5}}>
          <Icon name="gear" size={20} color={'#E4E6EB'} />
        </TouchableOpacity>
      </View>
    );
  };
  const UserInfo = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {user?.avatar === null ? (
            <Image
              source={{
                uri: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png',
              }}
              resizeMode="cover"
              style={{width: 100, height: 100, borderRadius: 99}}
            />
          ) : (
            <Image
              source={{
                uri: user?.avatar,
              }}
              resizeMode="cover"
              style={{width: 100, height: 100, borderRadius: 99}}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flex: 1,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textInfoCount}>2156</Text>
              <Text style={styles.textInfoTitle}>Followers</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textInfoCount}>567</Text>
              <Text style={styles.textInfoTitle}>Following</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textInfoCount}>23</Text>
              <Text style={styles.textInfoTitle}>News</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              lineHeight: 24,
              color: '#E4E6EB',
            }}>
            {user?.name}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              lineHeight: 24,
              fontSize: 16,
              color: '#B0B3B8',
            }}>
            {user?.address}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 16}}>
            <ButtonComponent
              title="Edit Profile"
              style={{
                backgroundColor: COLOR.primary,
                padding: width * 0.04,
                borderRadius: 6,
              }}
              onClick={handleEdit}
            />
            <View style={{width: width * 0.05}} />
            <ButtonComponent
              title="Website"
              style={{
                backgroundColor: COLOR.primary,
                padding: width * 0.04,
                borderRadius: 6,
              }}
              onClick={() => {
                alert('Website');
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const MainContent = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 12}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setSelectedTab(0)}>
            <Text
              style={[
                styles.textMainCate,
                selectedTab == 0 ? styles.selectTab : {},
              ]}>
              News
            </Text>
          </TouchableOpacity>
          <View style={{width: width * 0.05}} />
          <TouchableOpacity onPress={() => setSelectedTab(1)}>
            <Text
              style={[
                styles.textMainCate,
                selectedTab == 1 ? styles.selectTab : {},
              ]}>
              Recent
            </Text>
          </TouchableOpacity>
        </View>
        {data.length == 0 && isLoading == true ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'white'} size={18} />
          </View>
        ) : (
          selectedTab == 0 && <ListNews item={data} />
        )}
      </View>
    );
  };
  const ListNews = props => {
    let item = props.item;
    return (
      <FlatList
        data={item}
        renderItem={({item}) => (
          <TouchableOpacity>
            <ItemNews data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        style={{width: width, height: height, marginBottom: 600}}
        removeClippedSubviews={true}
        contentContainerStyle={{rowGap: 10}}
      />
    );
  };
  return (
    <View
      style={{
        backgroundColor: COLOR.background,
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.03,
      }}>
      <Header />
      <UserInfo />
      <MainContent />
      <FloatingAction
        position="right"
        onPressItem={name => {
          if (name === 'bt_add') navigation.navigate('CreateNews');
        }}
        actions={[
          {
            text: 'Create News',
            icon: <Icon name="plus" color={'red'} />,
            name: 'bt_add',
            position: 1,
          },
        ]}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  textInfoCount: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    color: '#E4E6EB',
  },
  textInfoTitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#B0B3B8',
  },
  textMainCate: {
    color: '#B0B3B8',
    fontWeight: '400',
    fontSize: 16,
  },
  selectTab: {
    borderBottomColor: COLOR.primary,
    borderBottomWidth: 2,
  },
});
