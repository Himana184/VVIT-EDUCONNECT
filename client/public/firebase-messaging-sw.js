/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);


firebase.initializeApp({
  apiKey: "AIzaSyB1nWoorgclYcJviTHU9GX7lvL6N-EGuQg",
  authDomain: "sihtangleddevs.firebaseapp.com",
  projectId: "sihtangleddevs",
  storageBucket: "sihtangleddevs.appspot.com",
  messagingSenderId: "964528586995",
  appId: "1:964528586995:web:26bffc205b20b845b2b786",
  measurementId: "G-N5X70SJ7HR",
});



firebase.messaging().onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  const notificationTitle = payload?.notification?.title;
  setNotification({
    title: payload?.notification?.title,
    body: payload?.notification?.body,
  });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

this.addEventListener("activate", function (event) {
  console.log("service worker activated");
});
// this.addEventListener("push", async function (event) {
//   console.log("notifications will be displayed here");
// });
