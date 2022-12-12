import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

function ButtonStop(props) {
  return (
    <View style={styles.containerButton}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="hand-right"
            size={41}
            color="#f44336"
            style={{marginBottom: 1}}
          />
          <Text
            style={{
              color: '#f44336',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Emergency Stop
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    flex: 3.3,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 24,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 6,
  },
  button: {
    width: 140,
    height: 140,
    padding: 16,
    borderRadius: 100,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffebee',
    shadowColor: '#e53935',
    elevation: 6,
  },
});

export default ButtonStop;
