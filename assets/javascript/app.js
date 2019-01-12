
/* 
PSUEDOCODE:

Get the inputs of the train name, destination, first train time, and frequency

Store that into a variable

Then added that to the table

After that works, take the first train time and convert it into non-military time

Take current time and calculate how many mins it will be for the train arrives 

When the train arrives, calculate the next arrival based off frequency.  

*/

// Global Variables
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = 0;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBETWUfBR4jrLHkzurZJFo9chep_B89ZSg",
    authDomain: "fir-train-time-ef321.firebaseapp.com",
    databaseURL: "https://fir-train-time-ef321.firebaseio.com",
    projectId: "fir-train-time-ef321",
    storageBucket: "",
    messagingSenderId: "755268863405"
};

// Initializes the firebase database
firebase.initializeApp(config);

// Variable set to grab firebase database information
var database = firebase.database();

database.ref().on("child_added", function(childSnapshot) {
    var childSnapVal = childSnapshot.val();
    console.log(childSnapVal);

    trainName = childSnapVal.trainName;

    destination = childSnapVal.destination;

    firstTrainTime = childSnapVal.firstTrainTime;
    console.log(firstTrainTime);

    frequency = childSnapVal.frequency;
    console.log(frequency);



    // Next Arrival
    // Take the first train time and frequency then add that to the first train time
    // This will result in next arrival time

    // Next Arrival with Moment JS
    var trainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted); //Object

    // Frequency Int
    var integerOfFrequency = parseInt(frequency);

    // Difference Between Time
    var differenceBetweenTime = moment().diff(moment(trainTimeConverted), "minutes");

    // Time Apart (remainder)
    var timeApartRemainder = differenceBetweenTime % integerOfFrequency;

    // Minutes Away
    var minutesAway = integerOfFrequency - timeApartRemainder;

    // Next Train Time
    var nextTrainTime = moment().add(minutesAway, "minutes").format("hh:mm A");


    //Change the HTML to reflect the inputs into the table
    var tableRow = $("<tr>");
    var tableTrainName = $("<td>");
    var tableDestination = $("<td>");
    var tableFrequency = $("<td>");
    var tableTrainTime = $("<td>");
    var tableMinutesAway = $("<td>");

    // Creates table data for each input.
    $("tbody").append(tableRow);
    tableRow.append(tableTrainName);
    tableRow.append(tableDestination);
    tableRow.append(tableFrequency);
    tableRow.append(tableTrainTime);
    tableRow.append(tableMinutesAway);


    // Appends the value to the table in single row
    tableTrainName.append(trainName);
    tableDestination.append(destination);
    tableFrequency.append(frequency);
    tableTrainTime.append(nextTrainTime);
    tableMinutesAway.append(minutesAway); 


    // If nextTrainTime has been met, then I need to add the frequency to make a new nextTrainTime.

}, function(errorObject){
    console.log("Error handled: " + errorObject.code);
});

// Whenever the user clicks the submit button
$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grab Inputs
    var trainName = $("#train-name").val().trim();
    $("#train-name").val("");

    var destination = $("#destination").val().trim();
    $("#destination").val("");

    var firstTrainTime = $("#first-train-time").val().trim();
    $("#first-name-time").val("");

    var frequency = $("#frequency").val().trim();
    $("#frequency").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

});










