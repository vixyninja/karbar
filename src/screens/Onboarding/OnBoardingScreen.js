import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#1877F2', background: '#282524'};

const SLIDER = [
  {
    id: 1,
    image: require('../../images/cr7.jpg'),
    subtitle: 'Cristiano Ronaldo',
  },
  {
    id: 2,
    image: require('../../images/m10.jpg'),
    subtitle: 'Lionel Messi',
  },
  {
    id: 3,
    image: require('../../images/flower.jpg'),
    subtitle: 'Flower',
  },
];

const OnBoardingScreen = ({navigation}) => {
  //State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  //Ref

  const ref = useRef(null);
  //Function
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != SLIDER.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };
  const skipSlide = () => {
    const lastSlideIndex = SLIDER.length - 1;
    const offset = lastSlideIndex * width; //2 * 720
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };
  //Components
  const Slide = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={item.image}
          style={{height: '70%', width, resizeMode: 'cover'}}
        />
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {SLIDER.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primary,
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                },
              ]}
            />
          ))}
        </View>
        <View style={{marginTop: 20}}>
          {currentSlideIndex == SLIDER.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor: COLORS.primary,
                    borderWidth: 1,
                    borderColor: 'white',
                  },
                ]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={skipSlide}
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: 'white',
                  },
                ]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={SLIDER}
        contentContainerStyle={{height: height}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  subtitle: {
    color: '#ffff',
    fontSize: 14,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
    width: 12,
    height: 12,
    borderRadius: 99,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
