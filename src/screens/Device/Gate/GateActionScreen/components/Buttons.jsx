import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import StoreContext from '../../../../../store/context';

function Buttons(props) {
  const {payload, onChangeGate, isData} = props;
  const theme = useTheme();
  // const [isData[0]?.icon, setIsActive] = useState(null);
  const [loading, setLoading] = useState(true);

  const usedContext = useContext(StoreContext);
  const {client} = usedContext;

  const menus = [
    {
      id: 1,
      title: 'Buka Kendaraan',
      icon: 'garage-open-variant',
      bgcolor: '#558b2f',
    },
    {
      id: 2,
      title: 'Buka Pedestrian',
      icon: 'walk',
      bgcolor: '#9ccc65',
    },
    {
      id: 3,
      title: 'Tutup',
      icon: 'garage-variant-lock',
      bgcolor: '#ef5350',
    },
  ];

  // function onMessage(message) {
  //   const payload = message.payloadString;
  //   const topic = message.destinationName;

  //   if (topic === 'dt/device_1/gate') {
  //     setIsActive(Number(payload));
  //   }
  // }

  // client.onMessageArrived = onMessage;

  return (
    <View style={styles.containerButton}>
      {menus.map(menu => (
        <View style={styles.buttonContainer} key={menu.id}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  isData[0]?.id == menu.id
                    ? theme.colors.primary
                    : menu.bgcolor,
                elevation: isData[0]?.id == menu.id ? 34 : 1,
                borderColor: '#FFFFFF',
                shadowColor:
                  isData[0]?.id == menu.id ? theme.colors.primary : '',
              },
            ]}
            onPress={() => {
              onChangeGate(menu.id, menu.title, menu.icon);
              console.log(menu.id, menu.title, menu.icon)
            }}>
            <Icons
              name={menu.icon}
              size={34}
              style={{
                color: isData[0]?.id == menu.id ? '#FFFFFF' : '#FFFFFF',
              }}
            />
            <Text
              style={{
                color: isData[0]?.id == menu.id ? '#FFFFFF' : '#FFFFFF',
                textAlign: 'center',
              }}>
              {menu.title}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
  },
  button: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 250,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '11px 11px 22px #bebebe',
  },
});

export default Buttons;
