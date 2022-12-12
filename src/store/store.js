import React, {useReducer, useState, useEffect} from 'react';
import {
  CHANGE_STATUS,
  CHANGE_SPEED,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  CHANGE_STEPPER,
  LOGIN_FAIL,
  CURRENT_SPEED,
  MQTT_CONNECT,
  MQTT_DISCONNECT,
} from './types';
import StoreContext from './context';
import reducer from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Paho from 'paho-mqtt';

const wsbroker = 'broker.emqx.io';
const wsport = 8083; // port for device

const client = new Paho.Client(
  wsbroker,
  wsport,
  '/mqtt',
  'myclientid_' + parseInt(Math.random() * 100, 10),
);

function Store({children}) {
  const initialState = {
    token: '',
    currentSpeed: null,
    loading: false,
    status: null,
    user: '',
    payloadWifi: {ssid: '', password: ''},
    step: 0,
    error: false,
    mqtt_connect: false,
  };

  const [isSpeed, setIsSpeed] = React.useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChangeSpeed = payload => {
    return dispatch({type: CHANGE_SPEED, payload: payload});
  };

  const handleChangeStatus = payload => {
    dispatch({type: CHANGE_STATUS, payload: payload});
  };

  const loadUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const resultToken = JSON.parse(token);
    const isUser = resultToken?.username;

    return dispatch({
      type: USER_LOADED,
      payload: isUser,
    });
  };

  const changeStepper = step => {
    dispatch({type: CHANGE_STEPPER, payload: step});
  };

  const handleSubmit = async payload => {
    try {
      if (payload.username === 'admin' && payload.password === 'admin') {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: JSON.stringify(payload?.username),
        });
        loadUser();
      } else {
        dispatch({type: LOGIN_FAIL});
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log('login gagal', error);
    }
  };

  // const handleDelete = async () => {
  //   const response = await AsyncStorage.removeItem('current_speed');
  // };

  const handleGetCurrentSpeed = async () => {
    const response = await AsyncStorage.getItem('current_speed');
    setIsSpeed(response);
    dispatch({type: CURRENT_SPEED, payload: response});
  };

  const logout = () => dispatch({type: LOGOUT});

  const handleConnecetionMqtt = () => {
    client.connect({
      userName: '',
      password: '',
      onSuccess: () => {
        console.log('Connecteds!');
        dispatch({type: MQTT_CONNECT, payload: true});

      },
      onFailure: err => {
        dispatch({type: MQTT_DISCONNECT, payload: false});

        console.log('error offline not internet', err);
      },
      keepAliveInterval: 10,
      reconnect: true,
    });
  };

  // function onMessage(message) {
  //   const statusDevice = message.payloadString;
  //   // if (statusDevice === 'ONLINE') {
  //   //   setStatusDevice({status: true, msg: 'ONLINE'});
  //   // } else {
  //   //   setStatusDevice({status: false, msg: 'OFFLINE'});
  //   //   setIsStatus({status: true, message: `${menus[0].title} sedang OFFLINE`});
  //   // }
  // }

  useEffect(() => {
    loadUser();
    handleGetCurrentSpeed();
    handleConnecetionMqtt();
  }, []);

  const values = {
    speed: state.currentSpeed,
    handleChangeSpeed,
    handleChangeStatus,
    handleSubmit,
    changeStepper,
    logout,
    loading: state.loading,
    status: state.status,
    user: state.user,
    step: state.step,
    currentSpeed: isSpeed,
    error: state.error,
    mqtt: state?._j?.mqtt_connect,
    client: client,
  };

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  );
}

export default Store;
