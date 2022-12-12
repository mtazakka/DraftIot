import {
  CURRENT_SPEED,
  CHANGE_SPEED,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  CHANGE_STEPPER,
  CHANGE_STATUS,
  LOGIN_FAIL,
  MQTT_CONNECT,
  MQTT_DISCONNECT,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (state, action) => { 
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_SPEED:
      return {
        ...state,
        currentSpeed: action.payload,
      };

    case MQTT_CONNECT:
      return { 
        mqtt_connect: action.payload,
      };

    case MQTT_DISCONNECT:
      return { 
        ...state,
        mqtt_connect: action.payload,
      };

    case CURRENT_SPEED:
      return {
        ...state,
        currentSpeed: action.payload,
      };
    case CHANGE_STEPPER:
      return {
        ...state,
        step: action.step,
      };
    case CHANGE_STATUS:
      await AsyncStorage.setItem('status', action.payload);
      return {
        ...state,
        status: action.payload,
      };
    case LOGIN_SUCCESS:
      await AsyncStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        error: true,
      };
    case LOGOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
      };

    default:
      return state;
  }
};
