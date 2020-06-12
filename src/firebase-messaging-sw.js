importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyALcEJyPvQDEb1bZZVGKbveu5woOpxw4hs',
  authDomain: 'gamesocial-zb.firebaseapp.com',
  databaseURL: 'https://gamesocial-zb.firebaseio.com',
  projectId: 'gamesocial-zb',
  storageBucket: 'gamesocial-zb.appspot.com',
  messagingSenderId: '659801044712',
  appId: '1:659801044712:web:e30d41edbeeb46e8aabb5d',
  measurementId: "from firebase config"
});

const messaging = firebase.messaging();
