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
    // console.log(newTrn);
    // console.log(newTrn.name);
    // console.log(newTrn.destination);
    // console.log(newTrn.start);
    // console.log(newTrn.frequency);

    // Clear Form Text-Boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase Event to Add Train to Database & a Row Table
database.ref().on("child_added",function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store Items into a Variable
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().destination;
    var trnFirst = childSnapshot.val().start;
    var trnFreq = childSnapshot.val().frequency;

    // Log Train Info from Database
    console.log("Database: " + trnName);
    console.log("Database: " + trnDest);
    console.log("Database: " + trnFirst);
    console.log("Database: " + trnFreq);

    // Calculate Next Arrival

    // Push value of trnFirst back a year to ensure it's before current time, NECESSARY?
    var trnFirstCnvrt = moment(trnFirst, "X").subtract(1,"years");
    // UNSURE IF WORKING APPROPRIATELY
    console.log("1 Yr Back= " + trnFirstCnvrt);

    // Current Time
    var currentTime = moment();
    console.log("CURRENTLY: " + moment(currentTime).format("X"));

    // Difference Between Times
    var timeDiff = moment().diff(moment(trnFirstCnvrt), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);

    // Time Apart
    var tRemainder = moment(timeDiff).format("minutes") % trnFreq;
    // Console shows NaN
    console.log(tRemainder);

    // Minutes Until Arrival
    var minutesTillArrival = trnFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillArrival);

    // Next Train
    var nxtTrain = moment().add(minutesTillArrival, "minutes");
    console.log("ARRIVAL TIME: " + moment(nxtTrain).format("HH:mm"));


});