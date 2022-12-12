import React, {useContext} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper';
import StoreContext from '../../../../store/context';

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4fc7ff',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#0ea5e9',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#0ea5e9',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4fc7ff',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#0ea5e9',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#0ee92f',
  stepIndicatorLabelFinishedColor: '#0ea5e9',
  stepIndicatorLabelUnFinishedColor: '#0ea5e9',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#0ea5e9',
};

function StepsAction({Components, currentPage, onChangePage}) {
  const theme = useTheme();
  const usedContext = useContext(StoreContext);
  const {step} = usedContext;
 

  const getStepIndicatorIconConfig = (position, stepStatus) => {
    const iconConfig = {
      name: 'devices',
      color: stepStatus === 'finished' ? '#FFFFFF' : '#FFFFFF',
      size: 21,
    };
    switch (position.position) {
      case 0: {
        iconConfig.name = 'search';
        break;
      }
      case 1: {
        iconConfig.name = 'cloud';
        break;
      }
      case 2: {
        iconConfig.name = 'devices';
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  const onStepPress = position => {
    onChangePage(position);
  };

  const renderViewPagerPage = data => {
    return (
      <View key={data} style={styles.page}>
        {data}
      </View>
    );
  };

  const renderStepIndicator = params => {
    return <Icon {...getStepIndicatorIconConfig(params)} />;
  };

  return (
    <View>
      <Swiper 
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={page => {
          onChangePage(page);
        }}>
        {Components.map(page => renderViewPagerPage(page))}
      </Swiper>

      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          stepCount={3}
          labels={['Search', 'Cloud', 'Initialize device']}
        />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50, 
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});

export default StepsAction;
