import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

function ModalSendWifi({onOpenModal, onClose, payloads, onSubmited}) {
  const theme = useTheme();

  const handleSubmit = () => {
    onSubmited();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={onOpenModal}
      onDismiss={onClose}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={[
              styles.modalText,
              {letterSpacing: 0.8, fontSize: 14, fontWeight: '500'},
            ]}>
            anda akan menghubungkan ke wifi{' '}
            <Text style={[styles.textWifi, {color: theme.colors.primary}]}>
              {payloads.ssid}
            </Text>
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}>
              <Text style={[styles.textCancel, {color: theme.colors.grey}]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginRight: 6,
  },
  buttonCancel: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCancel: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textWifi: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default ModalSendWifi;
