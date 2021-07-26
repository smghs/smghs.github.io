importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const config =  { 
	apiKey: "AIzaSyDo_YJCtgiWQy3G1U4Th4_X1bw5NCTxNvY",
    authDomain: "web-push-9fefc.firebaseapp.com",
    projectId: "web-push-9fefc",
    storageBucket: "web-push-9fefc.appspot.com",
    messagingSenderId: "338195592175",
    appId: "1:338195592175:web:62358a2531b6a85a2abc1a"
}; 
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	const title  =  payload.notification.title;
	const options  = {
		body: payload.notification.body,
	};
	return self.registration.showNotification(title, options);
})

