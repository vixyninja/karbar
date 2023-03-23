import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLOR from '../theme/colors/colors';
import {
  Homepage,
  LoginScreen,
  SignUpScreen,
  Profile,
  Bookmark,
  Explore,
  DetailScreen,
  EditProfile,
  OnBoardingScreen,
  Search,
  CreateNews,
} from '../screens/index';
import { AppContext } from '../utilities/useContext/AppContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const { isLogin } = useContext(AppContext);
  return <>{isLogin == false ? <Auth /> : <RootNavigate />}</>;
};

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: COLOR.iconColor,
          tabBarActiveTintColor: COLOR.primary,
          tabBarStyle: {
            backgroundColor: COLOR.background,
            borderTopColor: COLOR.background,
          },
        }}
        safeAreaInsets={{ top: 0, bottom: 0, right: 0, left: 0 }}>
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="home"
                size={18}
                color={focused == true ? COLOR.primary : COLOR.iconColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="compass"
                size={18}
                color={focused == true ? COLOR.primary : COLOR.iconColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="bookmark"
                size={18}
                color={focused == true ? COLOR.primary : COLOR.iconColor}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="user"
                size={18}
                color={focused == true ? COLOR.primary : COLOR.iconColor}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
const RootNavigate = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="CreateNews" component={CreateNews} />
      </Stack.Navigator>
    </>
  );
};
export default RootNavigator;
