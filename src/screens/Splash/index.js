import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Logo, SplashBackground } from '../../assets';
import { windowHeight, windowWidth } from '../../utils/constant';

function SplashScreen(props) {
  return (
    <ImageBackground source={SplashBackground} style={[styles.container]}>
      <Image
        source={Logo}
        style={styles.logo}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth * 0.669,
    Heigh: windowHeight * 0.106,
  },
});
export default SplashScreen;
