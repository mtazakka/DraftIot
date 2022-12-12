import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import {Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Devices(props) {
  const {menus, statusDevice, handleClickDevice} = props;

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const handleClick = link => {
    handleClickDevice(link);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {menus.length === 0 && (
          <View style={styles.containerButtonAdd}>
            <Icon name="devices" size={42} style={{marginBottom: 8}} />
            <Button
              mode="contained"
              style={{maxWidth: 150}}
              onPress={() => navigation.navigate('add device')}>
              Tambah Alat
            </Button>
          </View>
        )}

        <View style={styles.containerButton}>
          {menus &&
            menus?.map(menu => (
              <TouchableOpacity
                key={menu.title}
                style={[styles.button, {backgroundColor: theme.colors.white}]}
                onPress={() => handleClick(menu.link)}>
                <View style={{display: 'flex', width: '100%'}}>
                  <View style={styles.containerStatus}>
                    <View
                      style={[
                        styles.status,
                        {
                          backgroundColor: statusDevice.status
                            ? 'green'
                            : 'red',
                        },
                      ]}></View>
                  </View>
                </View>
                <Image source={menu.icon} style={{width: 50, height: 50}} />
                <Text
                  style={{
                    marginTop: 8,
                    color: 'black',
                    paddingBottom: 8,
                  }}>
                  {menu.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerButtonAdd: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  buttonAdd: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    paddingTop: 24,
    paddingBottom: 24,
  },
  containerStatus: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  status: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 6,
    marginRight: 8,
  },
});

export default Devices;
