import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import StatusBarScreen from './src/screens/StatusBar';
import Routers from './src/router';
import Store from './src/store/store';
import { useTheme } from 'react-native-paper';

export default function App() {
 const theme = useTheme()
  
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={theme.colors.primary} barStyle={'default'} />
      <StatusBarScreen />
      <Store>
        <Routers />
      </Store>
    </React.Fragment>
  );
}
