import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const DescriptionApps = () => {
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <Text style={[styles.header, {color: theme.colors.primary}]}>
        Smart Gate App
      </Text>
      <Text style={styles.descriptionText}>
        Control and organize compotible gate with one click
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
  },
  descriptionText: {
    color: '#cccccc',
    fontWeight: '400',
    marginTop: 6,
  },
});

export default DescriptionApps;
