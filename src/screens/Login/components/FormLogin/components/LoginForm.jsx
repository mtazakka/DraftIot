/* eslint-disable react/no-unescaped-entities */
import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Snackbar, TextInput, useTheme} from 'react-native-paper';
import Icons from 'react-native-vector-icons/Ionicons';
import StoreContext from '../../../../../store/context';
import {useNavigation} from '@react-navigation/native';

function LoginForm() {
  const usedContext = useContext(StoreContext);
  const {handleSubmit, error} = usedContext;
  const [payload, setPayload] = useState({
    username: '',
    password: '',
  });
  const theme = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const onChangUsername = data => setPayload({...payload, username: data});
  const onChangePassword = data => setPayload({...payload, password: data});
  const onVisible = () => setVisible(!visible);

  const onSubmit = () => {
    if (payload.username !== 'admin' && payload.password !== 'admin') {
      setVisible(true);
    } else {
      handleSubmit({username: payload.username, password: payload.password});
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <TextInput
            label="username"
            value={payload.username}
            onChangeText={onChangUsername}
            dense={true}
            mode="outlined"
            right={
              <TextInput.Icon name={() => <Icons name="people" size={21} />} />
            }
          />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            label="Password"
            mode="outlined"
            right={
              <TextInput.Icon
                name={visible ? 'eye' : 'eye-off'}
                onPress={onVisible}
                // color={visible ? colors.primary : colors.error}
              />
            }
            onChangeText={onChangePassword}
            secureTextEntry={visible ? false : true}
          />
        </View>
        <View style={styles.containerButton}>
          <Button mode="contained" onPress={onSubmit}>
            Masuk
          </Button>
          <Text style={{textAlign: 'center', marginTop: 16}}>
            <Text>Don't have an account ? </Text>
            <Text
              style={{color: theme.colors.primary}}
              onPress={() => navigation.navigate('sign up')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
      {visible && (
        <View style={{marginBottom: 36}}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: <Icons name="close-circle" size={18} color="#FFFFFF" />,
              onPress: () => {
                onDismissSnackBar;
              },
            }}>
            Username & Password Salah
          </Snackbar>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  containerInput: {
    marginTop: 6,
    marginBottom: 6,
  },
  containerButton: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default LoginForm;
