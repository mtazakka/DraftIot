import React, {useContext} from 'react'; 
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StoreContext from '../../../store/context';

function ProfileScreen(props) { 
  const usedContext = useContext(StoreContext);
  const {user, logout} = usedContext;
  const theme = useTheme()

  const handleLogout = () => logout();

  return (
    <View style={[styles.root,{backgroundColor:theme.colors.background}]}>
      <View style={styles.containerHeader}>
        <View style={styles.profile}>
          <View>
            <Avatar.Text size={42} label="A" />
          </View>
          <View style={{marginLeft: 16}}>
            <Text style={{fontSize: 21}}>{user}</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerMenu}>
        <Button
        style={styles.button}
          icon={() => <Icon name="power" size={32} color="#FFFFFF" />}
          mode="contained"
          onPress={handleLogout}
          >
          Keluar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },
  containerHeader: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerMenu: {
    flex: 3,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  button:{
    borderRadius:50,
    padding:4
  }
});

export default ProfileScreen;
