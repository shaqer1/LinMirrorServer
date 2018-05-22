const admin = require('firebase');
//const serviceAccount = require('./linmirror-bd427-firebase-adminsdk-l6jnh-0e1179b944.json');
var exec = require('child_process').exec;


admin.initializeApp({
  apiKey: "AIzaSyBH_bhUqNwxTsWHu202ecy7zkPD5SFVmtE",
    authDomain: "linmirror-bd427.firebaseapp.com",
    databaseURL: "https://linmirror-bd427.firebaseio.com",
    projectId: "linmirror-bd427",
    storageBucket: "linmirror-bd427.appspot.com",
    messagingSenderId: "554603673774"
});
const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

/*
var addDoc = db.collection('notifications').add({
  packageName: 'Hi',
  text:'bye',
  tickerText: 'ticker',
  title: 'test'
}).then(ref =>{
  console.log('Added doc', ref.id);
})
*/
var ref = admin.database().ref('notifications');
var now = Date.now();
var cutoff = now - 2 * 60 * 60 * 1000;
var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
var listener = old.on('child_added', function(snapshot) {
    snapshot.ref.remove();
});

var query = db.collection('notifications').where('timestamp', '>=', new Date(new Date().getTime()-10000))
              .orderBy('timestamp', 'desc')/*.limit(1)*/;//doc('hi');

var title = 'null';
var observer = query.onSnapshot(function(querySnapshot) {
  console.log(`Received doc snapshot: ${querySnapshot.size}`);
  //var doc = querySnapshot.getChildren().iterator().next();
  var doc = querySnapshot.docs[0];
    if(doc != null){
      console.log('recieved new');
      console.log(doc.data().packageName + ':\\ ' + doc.data().title + ' ' + doc.data().tickerText + ':\\ ' + doc.data().text);
      exec('notify-send '
      + doc.data().packageName + ':\\ ' + doc.data().title + ' ' + doc.data().tickerText + ':\\ ' + doc.data().text
      , function(err, stdout, stderr){
        console.log(stdout);
      });
    }

}, err => {
  console.log(err);
});

console.log('title',title);
