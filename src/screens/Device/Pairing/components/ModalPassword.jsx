import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
// import WifiManager from 'react-native-wifi-reborn';
import {NetworkInfo} from 'react-native-network-info';

function ModalPassword({
  onOpen,
  onClose,
  onWifi,
  onChangePassword,
  onChangeGateway,
  onModalPairing,
  payload,
}) {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(onOpen);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const onVisible = () => setVisible(!visible);
  const onChangePasswords = data => setPassword(data);

  const handleSubmit = () => {
    // WifiManager.connectToProtectedSSID(onWifi, password, false).then(
    //   response => {
    //     if (response === 'connected') {
    //       NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
    //         onChangeGateway(defaultGateway);
    //       });
    //       onChangePassword(password);
    //       setModalVisible(!modalVisible);
    //       onModalPairing();
    //     }
    //   },
    //   () => {
    //     console.log('Connection failed!');
    //   },
    // );
    onClose();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.containerContent}>
              <Text style={{textAlign: 'center', fontSize: 16}}>{onWifi}</Text>
              <TextInput
                mode="outlined"
                right={
                  <TextInput.Icon
                    name={visible ? 'eye' : 'eye-off'}
                    onPress={onVisible}
                    // color={visible ? colors.primary : colors.error}
                  />
                }
                placeholder="Password"
                onChangeText={onChangePasswords}
                secureTextEntry={visible ? false : true}
                style={{borderRadius: 20}}
              />
            </View>

            <View style={styles.containerButton}>
              <Pressable
                style={[styles.button, {backgroundColor: theme.colors.grey}]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {backgroundColor: password.length > 5 ? '#2196F3' : 'grey'},
                ]}
                onPress={handleSubmit}>
                <Text style={styles.textStyle}>Connect</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    display: 'flex',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    display: 'flex',
    width: '100%',
    height: 250,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '46.5%',
    margin: 6,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft: 6,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerContent: {
    display: 'flex',
    padding: 8,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ModalPassword;
