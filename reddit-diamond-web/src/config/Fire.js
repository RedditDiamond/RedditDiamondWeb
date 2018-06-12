import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDbUrYY649lt_Gp3cZ9-agQGMkes1APfy8",
  authDomain: "redditdiamond.firebaseapp.com",
  databaseURL: "https://redditdiamond.firebaseio.com",
  projectId: "redditdiamond",
  storageBucket: "redditdiamond.appspot.com",
  messagingSenderId: "311279073068"
}

const fire = firebase.initializeApp(config);

export default fire;