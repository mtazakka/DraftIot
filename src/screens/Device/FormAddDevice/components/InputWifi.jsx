import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

function InputWifi({
  onValueWifi,
  onChangePassword,
  onSubmitWifi,
  onActiveWifi,
}) {
  const [visible, setVisible] = useState(false);
  const onVisible = () => setVisible(!visible);

  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="Wi-Fi"
        value={onValueWifi}
        style={styles.input}
        disabled={true}
        left={
          <TextInput.Icon name={() => <Icon name="ios-wifi" size={21} />} />
        }
      />

      <TextInput
        mode="outlined"
        placeholder="Password"
        style={styles.input}
        left={
          <TextInput.Icon name={() => <Icon name="lock-open" size={21} />} />
        }
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
      <Button
        mode="contained"
        style={styles.input}
        onPress={onSubmitWifi}
        disabled={onActiveWifi}>
        berikutnya
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
});

export default InputWifi;
