import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoreContext from '../../../store/context';

function ButtonSave(props) {
  const usedContext = useContext(StoreContext);
  const {currentSpeed} = usedContext;
  const navigation = useNavigation();
  const theme = useTheme()

  const handleChangeSpeed = async () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{marginRight: 24}}>
      <TouchableOpacity onPress={handleChangeSpeed}>
        <Icon name="save" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

export default ButtonSave;
