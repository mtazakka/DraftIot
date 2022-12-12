import Paho from 'paho-mqtt';

const wsbroker = '172.16.2.132';
const wsport = 9001;

const client = new Paho.Client(
  wsbroker,
  wsport,
  '/ws',
  'myclientid_' + parseInt(Math.random() * 100, 10),
);

// client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;

// const onConnect = () => {
//   console.log('connect success');
// };

// const onConnectionLost = response => {
//   if (response.errorCode !== 0) {
//     console.log('onConnectionLost:' + response.errorMessage);
//   }
// };

// const onMessageArrived = message => {
//   console.log('on message arrived', message);
// };

// const Client = client.connect({onSuccess: onConnect});

// export default Client;

// export const mqttConnection = (onSuccess) => {
//   return client.connect({
//     userName: 'iot',
//     password: 'iot1407',
//     onSuccess: onSuccess(),
//     onFailure: () => {
//       console.log('failure connecting');
//     },
//   });
// };
