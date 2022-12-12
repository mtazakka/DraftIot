import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider, List, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function GateSetting(props) {
  const navigation = useNavigation();
  const theme = useTheme();
  const menu = [
    {id: 1, title: 'Kecepatan', icon: 'speedometer', link: 'setting speed'},
  ];

  const handlePress = menu => navigation.navigate(menu);
  
  return (
    // mapping pakai List.item
    <View style={[styles.root, {backgroundColor: theme.colors.background}]}>
      {menu.map(menu => (
        <TouchableOpacity onPress={() => handlePress(menu.link)} key={menu.id}>
          <View>
            <List.Item
              title={menu.title}
              left={props => (
                <Icon
                  name="speedometer"
                  {...props}
                  size={24}
                  style={{
                    marginTop: 8,
                  }}
                />
              )}
            />
            <Divider />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
});

export default GateSetting;
