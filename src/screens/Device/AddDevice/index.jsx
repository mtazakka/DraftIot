import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Button, Chip, useTheme} from 'react-native-paper';
import Gate from '../../../assets/gate.png';
import NetInfo from '@react-native-community/netinfo';

function AddDevice(props) {
  const theme = useTheme();
  const [wifiOn, setWifiOn] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(1);
  const navigation = useNavigation();

  const devices = [
    {
      kategori: 'Gerbang',
      device: [{id: 1, title: 'Gerbang', icon: Gate, link: 'form add device'}],
      id: 1,
    },
    {
      kategori: 'lampu',
      device: [],
      id: 2,
    },
  ];

  const checkWifiOn = () => {
    NetInfo.fetch().then(state => {
      // console.log('test cek wifi ------>', state); //default sekarang wifi
      if (state.type === 'cellular') {
        setWifiOn(true);
      }
    });
  };

  const getIpConnection = async () => {  // ---> Getting IP addres bisa lewat net info
    // await NetworkInfo.getGatewayIPAddress()
    //   .then((ipAddress) => {
    //     console.log('IP Gateway >>',ipAddress);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // 'Unable to get IP address.'
    //   });
  };

  useEffect(() => {
    checkWifiOn();
    getIpConnection();
  }, []);

  const handleChangeMenu = id => setCurrentMenu(id);

  return (
    <View style={[styles.root, {backgroundColor: theme.colors.white}]}>
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          {devices.map(device => (
            <Chip
              key={device.id}
              style={{
                backgroundColor:
                  device.id === currentMenu
                    ? theme.colors.primary
                    : theme.colors.grey,

                marginRight: 6,
              }}
              onPress={() => handleChangeMenu(device.id)}>
              <Text
                style={{
                  color:
                    device.id === currentMenu
                      ? theme.colors.white
                      : theme.colors.text,
                }}>
                {device.kategori}
              </Text>
            </Chip>
          ))}
        </ScrollView>
        <View style={styles.containerButton}>
          {devices &&
            devices?.map(menu => {
              return (
                <View key={menu.id}>
                  {menu.device.map(item => (
                    <View key={item.id} style={styles.wrapButton}>
                      <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => navigation.navigate(item.link)}>
                        <Image
                          source={item.icon}
                          style={{width: 50, height: 50}}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 8,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    paddingTop: 16,
    display: 'flex',
  },
  error: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 16,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  wrapButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 80,
    padding: 16,
    borderWidth: 1,
    borderTopColor: '#CCCCCC',
    borderRightColor: '#CCCCCC',
    borderBottomColor: '#CCCCCC',
    borderLeftColor: '#CCCCCC',
    borderRadius: 10,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
  },
});

export default AddDevice;
