import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { useTheme } from 'react-native-paper';
import FormSignup from './components/FormSignup';
import HeaderSignup from './components/HeaderSignup';

function SignupScreen(props) {
 const theme = useTheme()
  return (
    <View style={[styles.root,{backgroundColor:'#FFFFFF'}]}>
      <HeaderSignup />
      <FormSignup />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    display: 'flex',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

export default SignupScreen;
