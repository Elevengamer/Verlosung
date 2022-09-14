// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjGOwVroHncXJ2JVHkOHqi9lOHpX52bRY",
  authDomain: "verlosung-af1a4.firebaseapp.com",
  projectId: "verlosung-af1a4",
  storageBucket: "verlosung-af1a4.appspot.com",
  messagingSenderId: "428208427800",
  appId: "1:428208427800:web:4780aa418aa399106c046d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
var location;

if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(position=>{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    var api_key = 'a773d570c88b4504934f8e3a0af3b65f';

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
      + '?'
      + 'key=' + api_key
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1';

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {
      
      if (request.status === 200){
        // Success!
        data = JSON.parse(request.responseText);
        //alert(data.results[0].formatted); // print the location
        location=data.results[0].formatted;

  
      } else if (request.status <= 500){
        // We reached our target server, but it returned an error
  
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    };
  
    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };
  
    request.send();  // make the request


  },error=>{
    console.log(error.code);
  })
}
    
else{
console.log("not supported")
}


send.addEventListener('click', (e) =>{


    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    var console = document.getElementById('console').value;


createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;

    var date = new Date();
    
    set(ref(database, 'users/' + user.uid), {
    name: name,
    email: email,
    password: password,
    console: console,
    date: date.toLocaleDateString()+" | "+date.toLocaleTimeString(),
    location: location
    })
    .then(() => {
      alert("Teilnahme Erfolgreich");
    })
    .catch((error) =>{
      alert(error);
    })
    

  })
  .catch((error) => {
    const errorCode = error.Code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

  document.getElementById('name').value="";
  document.getElementById('email').value="";
  document.getElementById('psw').value="";
  document.getElementById('console').value="";

}


)


// https://youtu.be/KSf417F3ui0
// video URL



























