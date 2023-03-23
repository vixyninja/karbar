import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import COLOR from '../../theme/colors/colors';
import AxiosInstance from '../../utilities/api/axiosClient';
import {data} from './Dummy';
import {ItemNews} from '../../components/index';
import {AppContext} from '../../utilities/useContext/AppContext';

const Homepage = ({navigation}) => {
    const {isLoading, setIsLoading, isReload} = useContext(AppContext);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await AxiosInstance().get('/articles');
                setListData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
        return () => {};
    }, [isReload]);
    const {width, height} = Dimensions.get('window');
    const handleDetail = data => {
        navigation.navigate('DetailScreen', {object: data});
    };
    const handleSearch = () => {
        navigation.navigate('Search');
    };
    const ref = useRef(null);
    const handleSeeAll = () => {
        ref?.current.scrollTo({x: 0, y: 450, animated: true});
    };
    const HeaderBar = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: height * 0.01,
                }}>
                <Image
                    source={require('../../images/splashImage.png')}
                    style={{
                        width: 100,
                        height: 50,
                    }}
                    resizeMode="contain"
                />
                <View
                    style={{
                        backgroundColor: '#3A3B3C',
                        padding: 5,
                        borderRadius: 6,
                    }}>
                    <Icon name="bell" size={20} color={'white'} />
                </View>
            </View>
        );
    };
    const SearchBar = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#3A3B3C',
                    borderRadius: 6,
                    marginTop: height * 0.03,
                }}>
                <Icon
                    name="search"
                    size={20}
                    style={{paddingStart: width * 0.02}}
                    color={'#B0B3B8'}
                />
                <TextInput
                    style={{
                        flex: 1,
                        paddingStart: 8,
                        color: '#fff',
                        fontWeight: '400',
                    }}
                    placeholder="Search"
                    placeholderTextColor={'#fff'}
                    onPressIn={handleSearch}
                />
                <Icon
                    name="filter"
                    size={20}
                    style={{paddingEnd: width * 0.02}}
                    color={'#B0B3B8'}
                />
            </View>
        );
    };
    const Trending = props => {
        let {item} = props;
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: height * 0.01,
                    }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 16,
                            lineHeight: 24,
                            color: '#E4E6EB',
                        }}>
                        Trending
                    </Text>
                    <Text
                        style={{
                            color: '#B0B3B8',
                            fontWeight: '400',
                            fontSize: 14,
                        }}>
                        See all
                    </Text>
                </View>
                <TouchableOpacity>
                    <Image
                        source={{uri: item.img}}
                        style={{
                            width: '100%',
                            height: height * 0.3,
                            borderRadius: 6,
                        }}
                        resizeMode="cover"
                    />
                    <View style={{marginTop: height * 0.01}}>
                        <Text style={{color: '#B0B3B8'}}>{item.category}</Text>
                        <Text
                            style={{
                                color: '#E4E6EB',
                                fontWeight: '400',
                                fontSize: 16,
                                lineHeight: 24,
                            }}>
                            {item.title}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={{
                                    uri: item.pageAvatar,
                                }}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 99,
                                }}
                                resizeMode="center"
                            />
                            <Text
                                style={{
                                    color: '#B0B3B8',
                                    paddingStart: width * 0.02,
                                }}>
                                {item.pageName}
                            </Text>
                            <Icon
                                name="clock-o"
                                size={18}
                                color={'#B0B3B8'}
                                style={{
                                    paddingStart: width * 0.03,
                                }}
                            />
                            <Text
                                style={{
                                    color: '#B0B3B8',
                                    paddingStart: width * 0.03,
                                }}>
                                {item.time}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    const Footer = props => {
        const title = [
            {
                id: 0,
                status: 'All',
            },
            {
                id: 1,
                status: 'Sports',
            },
            {
                id: 2,
                status: 'Politics',
            },
            {
                id: 3,
                status: 'Bussiness',
            },
            {
                id: 4,
                status: 'Health',
            },
            {
                id: 5,
                status: 'Travel',
            },
            {
                id: 6,
                status: 'Science',
            },
        ];
        const [statusSelect, setStatusSelect] = useState(0);
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 16,
                            lineHeight: 24,
                            color: '#E4E6EB',
                        }}>
                        Lastest
                    </Text>
                    <TouchableOpacity onPress={handleSeeAll}>
                        <Text
                            style={{
                                color: '#B0B3B8',
                                fontWeight: '400',
                                fontSize: 14,
                            }}>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 8,
                        }}>
                        {title.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setStatusSelect(item.id)}>
                                    <View key={index}>
                                        <Text
                                            style={[
                                                {
                                                    fontWeight: '400',
                                                    fontSize: 16,
                                                    lineHeight: 24,
                                                    color: '#B0B3B8',
                                                    marginEnd: 10,
                                                },
                                                item.id === statusSelect
                                                    ? {
                                                          color: '#E4E6EB',
                                                          borderBottomColor:
                                                              COLOR.primary,
                                                          borderBottomWidth: 2,
                                                      }
                                                    : {},
                                            ]}>
                                            {item.status}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                {listData.length == 0 && isLoading == true ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator color={'white'} size={18} />
                    </View>
                ) : (
                    listData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{paddingVertical: 4}}
                            onPress={() => handleDetail(item)}>
                            <ItemNews data={item} />
                        </TouchableOpacity>
                    ))
                )}
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
            <HeaderBar />
            <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
                <SearchBar />
                <Trending item={data[0]} />
                <Footer item={listData} />
            </ScrollView>
        </View>
    );
};
export default Homepage;

const styles = StyleSheet.create({});
