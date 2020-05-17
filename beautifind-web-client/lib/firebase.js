import * as firebase from "firebase";

try {
    var firebaseConfig = {
        apiKey: "AIzaSyDHn__Ycd7k3uD7jTQKZOKLRnx0NhcOHmA",
        authDomain: "beautyfind-d8c36.firebaseapp.com",
        databaseURL: "https://beautyfind-d8c36.firebaseio.com",
        projectId: "beautyfind-d8c36",
        storageBucket: "beautyfind-d8c36.appspot.com",
        messagingSenderId: "710189971136",
        appId: "1:710189971136:web:f2a7898fd245e94ede9f25",
        measurementId: "G-8JE565RSX4"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//firebase.analytics();
} catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}

export default firebase;