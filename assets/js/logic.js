// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXE_jCyyxKzd6sCnklhA_QDaC0JVt2wAY",
    authDomain: "train-scheduler-79eab.firebaseapp.com",
    databaseURL: "https://train-scheduler-79eab.firebaseio.com",
    storageBucket: "train-scheduler-79eab.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();
console.log(database);

// Button to Add Trains
$("#add-train-btn").on("click", function(event) {

    // Grabs User Input
    var trnName = $("#train-name-input")



});