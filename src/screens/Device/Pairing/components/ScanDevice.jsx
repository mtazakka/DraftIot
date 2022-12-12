import React, {useState, useEffect, useCallback} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
// import WifiManager from 'react-native-wifi-reborn';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icons from 'react-native-vector-icons/Feather'; 

function ScanDevice(props) {
  const {onClickWifi} = props; 
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [wifis, setWifis] = useState([]);
  const [isWifi, setIsWifi] = useState(false);

  const handleCheckWifiOn = async () => {
    return await WifiManager.isEnabled()
      .then(result => {
        if (result === false) {
          setIsWifi(true);
        }
      })
      .catch(error => console.log(error));
  };

  const handleListWifi = () => {
    setLoading(true);
    // WifiManager.reScanAndLoadWifiList()
    //   .then(listWifi => {
    //     setRefreshing(false);
    //     const filtering = listWifi.filter(row => row.SSID.includes('DBIOT'));

    //     if (filtering) {
    //       setLoading(false);
    //       setWifis(filtering);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('error list wifi', err);
    //   });
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    handleListWifi();
  }, []);

  useEffect(() => {
    handleListWifi();
    handleCheckWifiOn();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator animating={loading} size={24} />
            <Text style={styles.title}>Scan Device</Text>
          </View>
        ) : isWifi ? (
          <View>
            <TouchableOpacity
              onPress={() => WifiManager.setEnabled(true)}
              style={styles.buttonWifiOff}>
              <Text>nyalakan wifi</Text>
              {/* <Icons name="wifi-off" size={18} color="red" /> */}
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{marginVertical: 10}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }>
            {wifis?.map(wifi => (
              <TouchableOpacity
                style={styles.buttonWifi}
                key={wifi.BSSID}
                onPress={() => onClickWifi(wifi.SSID, wifi.capabilities)}>
                <Icon name="md-wifi" size={24} />
                <View style={{flex: 1, paddingLeft: 8}}>
                  <Text style={styles.titleWifi}>{wifi.SSID}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
    display: 'flex',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    elevation: 6,
  },
  buttonWifi: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 6,
  },
  titleWifi: {
    fontSize: 16,
  },
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWifiOff: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    elevation: 6,
    backgroundColor: 'white',
  },
});

export default ScanDevice;
