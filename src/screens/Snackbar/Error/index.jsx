import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';

function SnackbarError(props) {
  const {status, message} = props;
  const [active, setActive] = useState(status);
  const onDismissSnackBar = () => setActive(false);

  return (
    <View style={styles.root}>
      <Snackbar visible={active} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 16,
  },
});

export default SnackbarError;
