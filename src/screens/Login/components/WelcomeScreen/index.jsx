import React from 'react';
import {StyleSheet, View} from 'react-native'; 
import ButtonLogin from './components/ButtonLogin';
import DescriptionApps from './components/DescriptionApps';
import IconsHeader from './components/IconsHeader';

function WelcomeScreen() { 
  return (
    <View style={[styles.root]}>
      <IconsHeader />
      <DescriptionApps />
      <ButtonLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
});

export default WelcomeScreen;
