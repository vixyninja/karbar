import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppContext} from '../../utilities/useContext/AppContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AxiosInstance from '../../utilities/api/axiosClient';
const CreateNews = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [title, setTitle] = useState('');
  const [news, setNews] = useState('');
  const [imageCapture, setImageCapture] = useState(null);
  const {isLoading, setIsLoading, setIsReload, isReload} =
    useContext(AppContext);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const capture = async () => {
    const result = await launchCamera();
    if (result.didCancel) {
      console.log('Huy Chup');
      setImageCapture(null);
    } else if (result.error) {
      setImageCapture(null);
      console.log('Lay hinh loi: ', result.error);
    } else if (result.customButton) {
      setImageCapture(null);
      console.log('an custom button ', result.customButton);
    } else {
      setImageCapture(result.assets[0].uri);
    }
  };
  const getLib = async () => {
    const result = await launchImageLibrary();
    if (result.didCancel) {
      console.log('Huy lay hinh');
      setImageCapture(null);
    } else if (result.error) {
      setImageCapture(null);
      console.log('Lay hinh loi: ', result.error);
    } else if (result.customButton) {
      setImageCapture(null);
      console.log('an custom button ', result.customButton);
    } else {
      setImageCapture(result.assets[0].uri);
    }
  };
  const handlePublish = async () => {
    setIsLoading(true);
    const formData = new FormData();
    await formData.append('image', {
      uri: imageCapture,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    try {
      const response = await AxiosInstance('multipart/form-data').post(
        '/media/upload',
        formData,
      );
      if (response.error == false) {
        const uploadResult = await AxiosInstance().post('/articles', {
          title: title,
          content: news,
          image: response.data.path,
        });
        if (uploadResult.error != false) {
          ToastAndroid.show('Thêm bài viết thất bại', ToastAndroid.SHORT);
          setIsLoading(false);
        } else {
          console.log(uploadResult.data);
          navigation.goBack();
          setIsLoading(false);
          setIsReload(!isReload);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const ToolBar = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color={'#B0B3B8'} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#E4E6EB',
              textAlign: 'center',
              lineHeight: 24,
              fontWeight: '400',
              fontSize: 16,
            }}>
            Create News
          </Text>
        </View>
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
  return (
    <View
      style={{
        backgroundColor: COLOR.background,
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.03,
      }}>
      {isLoading == true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'white'} size={18} />
        </View>
      ) : (
        <>
          <ToolBar />
          <TouchableOpacity onPress={capture}>
            <View
              style={{
                height: height * 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#B0B3B8',
                borderRadius: 3,
                borderWidth: 3,
                marginTop: 20,
                borderStyle: 'dotted',
              }}>
              {imageCapture == null ? (
                <>
                  <Icon name="plus" size={25} color={'white'} />
                  <Text
                    style={{fontWeight: '400', fontSize: 14, color: '#B0B3B8'}}>
                    Add Cover Photo
                  </Text>
                </>
              ) : (
                <Image
                  style={{width: width, height: height * 0.4}}
                  source={{uri: imageCapture}}
                  resizeMode="stretch"
                />
              )}
            </View>
          </TouchableOpacity>

          <View style={{borderBottomColor: '#C4C4C4', borderBottomWidth: 1}}>
            <TextInput
              placeholder="News Title"
              placeholderTextColor={'#B0B3B8'}
              style={{color: 'white'}}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View>
            <TextInput
              multiline
              style={{color: 'white'}}
              placeholder="Add News/Article"
              placeholderTextColor={'white'}
              onChangeText={text => setNews(text)}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              flexDirection: 'row',
              width: width,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={getLib}>
              <Icon name="camera" size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePublish}
              style={{
                backgroundColor: '#EEF1F4',
                padding: 10,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Publish</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CreateNews;
