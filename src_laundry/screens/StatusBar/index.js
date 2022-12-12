import React from 'react';
import {View, StatusBar} from 'react-native';

function StatusBarScreen(props) {
  return (
    <View
      style={{
        height: StatusBar.currentHeight,
      }}
    />
  );
}

export default StatusBarScreen;
