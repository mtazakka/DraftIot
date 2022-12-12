import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

function FormSignup(props) {
  const theme = useTheme();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible(!visible);

  return (
    <View style={styles.root}>
      <TextInput
        dense={true}
        style={[styles.input, {borderTopLeftRadius: 10}]}
        mode="outlined"
        placeholder="email"
      />
      <TextInput
        dense={true}
        style={styles.input}
        mode="outlined"
        placeholder="username"
      />
      <TextInput
        dense={true}
        style={styles.input}
        mode="outlined"
        placeholder="password"
        secureTextEntry={visible ? false : true}
        right={
          <TextInput.Icon
            name={() =>
              visible ? (
                <Icon name="eye-sharp" size={24} />
              ) : (
                <Icon name="eye-off-sharp" size={24} />
              )
            }
            onPress={handleVisible}
            // color={visible ? colors.primary : colors.error}
          />
        }
      />
      <Button style={styles.button} mode="contained">
        Sign Up
      </Button>
      <Text style={{textAlign: 'center', marginTop: 6}}>
        <Text>Already have an account ? </Text>
        <Text
          onPress={() => navigation.navigate('form login')}
          style={{
            color: theme.colors.primary,
          }}>
          Sign In
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
  },
  input: {
    marginTop: 6,
  },
  button: {
    marginTop: 16,
  },
});

export default FormSignup;
