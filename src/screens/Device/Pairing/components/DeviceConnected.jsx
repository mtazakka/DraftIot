import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';

function DeviceConnected({onChangePage, deviceId, statusPairing}) {
  const [loading, setLoading] = useState(true);
  const [countDown, setCountDown] = useState(59);

  const currentCount = useRef();
  useEffect(() => {
    const counts = () => setCountDown(prev => prev - 1);
    currentCount.current = setInterval(() => counts(), 1000);
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(currentCount.current);
      setLoading(false);
    }
  }, [countDown]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {loading ? (
          <View>
            <ActivityIndicator size={42} animating={true} />
            <Text style={styles.title}>0:{countDown}</Text>
          </View>
        ) : (
          <View>
            <Text>Gagal menghubungkan pada device</Text>
            <Button
              mode="contained"
              style={{marginTop: 8}}
              onPress={() => onChangePage(0)}>
              Back
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // marginLeft:60,
    paddingLeft: 50,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
});

export default DeviceConnected;
