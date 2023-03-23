import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ItemNews} from '../../components/index';
import AxiosInstance from '../../utilities/api/axiosClient';
import {AppContext} from '../../utilities/useContext/AppContext';

const Search = ({navigation}) => {
  const {width, height} = Dimensions.get('window');

  const SearchBar = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [data, setData] = useState([]);
    const {isLoading, setIsLoading} = useContext(AppContext);
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const respone = await AxiosInstance().get(
          `articles/search?title=${searchTitle}`,
        );
        if (respone.error == false) {
          console.log(respone.data);
          setData(respone.data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        ToastAndroid.show('Fail', ToastAndroid.SHORT);
        setIsLoading(false);
      }
    };
    return (
      <View
        style={{
          borderRadius: 6,
          marginTop: height * 0.03,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#3A3B3C',
          }}>
          <Icon
            name="search"
            size={20}
            style={{paddingStart: width * 0.02}}
            color={'#B0B3B8'}
          />
          <TextInput
            style={{
              paddingStart: 8,
              color: '#fff',
              fontWeight: '400',
              flex: 1,
            }}
            placeholder="Search"
            placeholderTextColor={'#fff'}
            onChangeText={text => setSearchTitle(text)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon
              name="check"
              size={20}
              style={{
                paddingEnd: width * 0.02,
              }}
              color={'#B0B3B8'}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {isLoading == true ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator color={'white'} size={18} />
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DetailScreen', {object: item});
                  }}>
                  <ItemNews data={item} />
                </TouchableOpacity>
              )}
              key={item => item._id}
            />
          )}
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
        paddingTop: height * 0.03,
      }}>
      <SearchBar />
    </View>
  );
};

export default Search;
