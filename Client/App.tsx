import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, View, Image } from 'react-native';
import 'react-native-gesture-handler';
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import navigationTheme from './app/navigators/navigationTheme';
import AppNavigator from './app/navigators/AppNavigator';
import AuthNavigator from './app/navigators/AuthNavigation';
import { AppLoading } from 'expo';
import { Unsubscribe } from 'redux';
import { store } from './app/redux/store';
import { UserModel } from './app/models/userModel';
import AuthContext from './app/auth/context';
import storage from './app/auth/storage';
import { ActionType } from './app/redux/action-type';
import JwtDecode from 'jwt-decode';
import TokenHandler from './app/auth/TokenHandler';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob'
import { Config } from './config';
import authApi from './app/api/authApi';
import errorHandler from './utility/errorHander';
import AsyncStorage from '@react-native-community/async-storage';
import { AppMainLoadingScreen } from './app/animations/AppMainLoadingScreen';
import { set } from 'react-native-reanimated';


interface AppState {
  fontsLoaded: boolean
  user: UserModel
  isReady: boolean
  AppMainLoadAnimation: boolean
}

export class App extends React.Component<{ props: any, navigation: any }, AppState> {
  public interstitialAd: string;
  public bannerAd: string;
  navigationSubscription: any;
  static contextType = AuthContext;
  private UnsubscribeStore: Unsubscribe;
  constructor(props: any) {
    super(props)
    this.state = {
      AppMainLoadAnimation: false,
      isReady: false,
      user: new UserModel(),
      fontsLoaded: false
    }
    this.UnsubscribeStore = store.subscribe(() => {
      this.setState({ user: store.getState().user })
    })
    this.interstitialAd = Platform.OS === 'ios' ? Config.adIosInterstitial : Config.adAndroidInterstitial
    this.bannerAd = Platform.OS === 'ios' ? Config.iosBanner : Config.androidBanner
  }


  async componentDidMount() {
    try {
      store.dispatch({ type: ActionType.CleanCreator })
      await TokenHandler().then(user => {
        this.setState({ user }, async () => {
          if (user !== null) {
            const result = await authApi.isUserLogged();
            if (!result.ok) {
              errorHandler(result);
              return;
            }
          }
        });
        Font.loadAsync({
          'KumbhSans-Light': require('./assets/fonts/KumbhSans-Light.ttf')
        }
        ).then(() => this.setState({ fontsLoaded: true, AppMainLoadAnimation: true }, () => {
          setTimeout(() => {
            this.setState({ AppMainLoadAnimation: false })
          }, 1800);
        }))
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  componentWillUnmount() {
    this.UnsubscribeStore()
  }

  setUser = (user: UserModel) => {
    this.setState((prevState) => ({ user }))
  }


  isUserLogged = async () => {
    const result = await authApi.isUserLogged();
    if (result.status === 403) {
      errorHandler(result);
      return;
    }
  }


  render() {
    const user = this.state.user
    const { setUser } = this
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.isReady ? <AppLoading startAsync={TokenHandler} onFinish={() => this.setState({ isReady: true })} /> :
          <AuthContext.Provider value={{ user, setUser }}>
            {this.state.AppMainLoadAnimation ?
              <AppMainLoadingScreen />
              :
              !this.state.fontsLoaded ? <AppLoading /> :
                <NavigationContainer onStateChange={() => this.isUserLogged()} theme={navigationTheme}>
                  {user && user.username ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            }
          </AuthContext.Provider>}
        {this.state.AppMainLoadAnimation ?
          null
          :
          <AdMobBanner
            style={{ alignItems: "center" }}
            bannerSize="banner"
            adUnitID={this.bannerAd}
            servePersonalizedAds={false} />
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;

