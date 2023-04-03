import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getFirestore,collection,addDoc} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsw8cVFyZj5KwRAMID2Dc06amVD6_LVg",
  authDomain: "login-for-the-artmart.firebaseapp.com",
  databaseURL: "https://login-for-the-artmart-default-rtdb.firebaseio.com",
  projectId: "login-for-the-artmart",
  storageBucket: "gs://login-for-the-artmart.appspot.com",
  messagingSenderId: "453895598278",
  appId: "1:453895598278:web:cac2395b4d9c635e54a7c7"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

var files = [];
var reader = new FileReader();

var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('uploadProgress');
var select = document.getElementById('selectbtn');
var upload = document.getElementById('uploadbtn');
var download = document.getElementById('downloadbtn');

var input = document.createElement('input');
input.type = 'file';
input.onchange = e =>{
    files = e.target.files;
    var extension = GetFileExt(files[0]);
    var name = GetFileName(files[0]);
    namebox.value = name;
    extlab.innerHTML = extension;
    reader.readAsDataURL(files[0]);
}

reader.onload = function(){
    myimg.src = reader.result;
}
//selecting an image
selectbtn.onclick = function(){
    input.click();
}

function GetFileExt(file){
    var temp = file.name.split('.');
    var ext = temp.slice((temp.length-1),(temp.length));
    return '.' + ext[0];
}

function GetFileName(file){
    var temp = file.name.split('.');
    var fname = temp.slice(0,-1).join('.');
    return fname;
}
//uploading an image
async function UploadProcess(){
    var ImgToUpload = files[0];
    var ImgName = namebox.value + extlab.innerHTML;
    const metaData = {
        contentType: ImgToUpload.type
    }
    const storage = getStorage();
    const storageRef = sRef(storage, "Images/"+ImgName);
    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);
    UploadTask.on('state-changed', (snapshot)=>{
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.innerHTML = "Upload "+ progress + "%";
    },
    (error) =>{
        alert("error: image upload failed");
    },
    () =>{
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
            console.log(downloadURL);
        })
    });
}

uploadbtn.onclick = UploadProcess;
/*
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var password = document.getElementById("password");



  window.signup = function(e){
    e.preventDefault();

    createUserWithEmailAndPassword(auth,email.value,password.value)
    .then(function(success){

      const docRef = addDoc(collection(db,"Users"),{
        email:email.value,
        name:firstname.value,
        lname:lastname.value

      });
      alert("signup sucessfully")
     


    })
    .catch(function(err){
      alert("error" + err)
    })

    

    
  }*/