import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCXJy2P5ziBmSqZMrOQBOZjBZBqOClkm68',
  authDomain: 'my-project-1525706860738.firebaseapp.com',
  databaseURL: 'https://my-project-1525706860738.firebaseio.com',
  projectId: 'my-project-1525706860738',
  storageBucket: 'my-project-1525706860738.appspot.com',
  messagingSenderId: '132702724130'
}
firebase.initializeApp(config)
const db = firebase.database().ref()
const storage = firebase.storage().ref()

export {
  firebase,
  db,
  storage
}
