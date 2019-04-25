// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXE_jCyyxKzd6sCnklhA_QDaC0JVt2wAY",
    authDomain: "train-scheduler-79eab.firebaseapp.com",
    databaseURL: "https://train-scheduler-79eab.firebaseio.com",
    projectId: "train-scheduler-79eab",
    storageBucket: "train-scheduler-79eab.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button to Add Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs User Input
    var trnName = $("#train-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var trnFirst = moment($("#first-input").val().trim(), "HH:mm").format("X");
    var trnFreq = $("#frequency-input").val().trim();

    // Create Local/Temporary Object to hold Train Data
    var newTrn = {
        name: trnName,
        destination: trnDest,
        start: trnFirst,
        frequency: trnFreq,
    };

    // Upload Train Data to Database
    database.ref().push(newTrn);

    // LOG ALL THE THINGS
    console.log(newTrn);
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.start);
    console.log(newTrn.frequency);

    // Clear Form Text-Boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
});