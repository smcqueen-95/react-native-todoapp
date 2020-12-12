import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmwlZ7GYQtR3sc2jGgBv04RH_VDOQTrCg",
  authDomain: "todo-app-reactnative-cc385.firebaseapp.com",
  databaseURL: "https://todo-app-reactnative-cc385.firebaseio.com",
  projectId: "todo-app-reactnative-cc385",
  storageBucket: "todo-app-reactnative-cc385.appspot.com",
  messagingSenderId: "337782145379",
  appId: "1:337782145379:web:f1acba17e339b2f8029356",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy('name')

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref

    ref.doc(list.id).update(list)
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
    .firestore()
    .collection("users")
    .doc(this.userId)
    .collection("lists");
  }

  detach() {
    this.unsubscribe();
}
}

export default Fire;
