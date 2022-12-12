/* eslint-disable no-undef */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const IconsHeader = () => {
  const theme = useTheme();
  return (
    <View style={[styles.root, {backgroundColor: theme.colors.background}]}>
      <View style={styles.container}>
        <Image
          source={require('../../../../../assets/icons/lazy.png')}
          resizeMode={'center'}
          style={{width: '100%'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
    display: 'flex',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
});

export default IconsHeader;
