// See: https://github.com/microsoft/TypeScript/issues/14877
// [START messaging_init_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCS3WbbZwRTpe59y5D6KZDIXU5EznsvTec",
  authDomain: "resiverse-fcm.firebaseapp.com",
  projectId: "resiverse-fcm",
  storageBucket: "resiverse-fcm.appspot.com",
  messagingSenderId: "977822048316",
  appId: "1:977822048316:web:bb0c2daff7ee7ad358a339",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END messaging_init_in_sw]

// [START messaging_on_background_message]
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
    data: payload.data.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END messaging_on_background_message]

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.", event);

  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data));
});
