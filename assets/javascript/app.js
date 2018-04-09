// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZj_BBL_zRY8v0aA3eLp0EUS38sKiLgzI",
  authDomain: "trainscheduler-1d313.firebaseapp.com",
  databaseURL: "https://trainscheduler-1d313.firebaseio.com",
  projectId: "trainscheduler-1d313",
  storageBucket: "trainscheduler-1d313.appspot.com",
  messagingSenderId: "780814497125"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Train
$("#addTrainBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  // Converts user input from military time to 12hr
  var trainStartTime = moment($("#firstTrain-input").val().trim(), "HH:mm").format("hh.mm");
  var trainFrequency = $("#trainFrequency-input").val().trim();

  // Check format of trainStartTime
  // console.log("trainStartTime format check: " + trainStartTime);

  // Creates local object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStartTime,
    frequency: trainFrequency
  };

  // Uploads train data to firebase
  database.ref().push(newTrain);

  // Console logs to check functionality
  console.log(newTrain.name);
  console.log(newTrain.destination);
  // console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Clear out the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#trainFrequency-input").val("");
});

// Creates firebase event for adding train to the database and dynamically add rows to the html
database.ref().on("child_added", function(childSnapshot) {
  // nextTrain();
  // Store everything as variables
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Console log variables
  console.log("from database check: " + trainName);
  console.log("from database check: " + trainDestination);
  // console.log("from database check: " + trainStartTime);
  console.log("from database check: " + trainFrequency);

  // Console log everything that's coming out of snapshot
  // console.log(snapshot.val());
  
  // Calculate the next arrival time using first train time, current time, and frequency
  // Calculate how many minutes away the train is using current time, first train time, and frequency
  var firstTrainTimeConverted = moment(trainStartTime, "HH.mm").subtract(1, "years");
  console.log("checking firstTrainTimeConverted" + firstTrainTimeConverted);

  // Converts current time to 12 hr format
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Capture difference between the two times
  var diffTime = currentTime.diff(moment(firstTrainTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log("remainder: " + tRemainder);

  // Minutes until next train
  var minNextTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minNextTrain);

  // Next Train Arrival Time
  var nextTrainArrival = moment(currentTime.add(minNextTrain, "minutes")).format("hh:mm a");
  // nextTrainArrival = moment(nextTrainArrival).format("hh:mm");
  console.log("ARRIVAL TIME: " + nextTrainArrival);
  
  var deleteRow = "<button class='btn deleteBtn'>delete train</button>";

  // Add each train's data into the table
  $("#trainTable tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainArrival + "</td><td>" + minNextTrain + "</td><td>" + deleteRow + "</td></tr>");
});


$(document).on("click", ".deleteBtn", function(event) {
  event.preventDefault();
  var rootRef = database.ref();
  // rootRef.once("value")
  //   .then(function(childSnapshot) {
  //     var key = childSnapshot.val().name
  //   });
  var $row = $(this).closest("tr");
  rootRef.remove();
  $(this).closest('tr').remove();

});
// function nextTrain(trainFrequency, trainStartTime) {
//   // var trainFrequency = $("#trainFrequency-input").val().trim();
//   // var trainStartTime = $("#firstTrain-input").val().trim();
//   console.log("check firstTrainTime: " + trainStartTime);
//   // var trainFrequency = $("#trainFrequency-input").val().trim();

//   // First Train Time (pushed back 1 year to make sure it comes before current time)
//   var firstTrainTimeConverted = moment(trainStartTime, "HH.mm").subtract(1, "years");
//   console.log("checking firstTrainTimeConverted" + firstTrainTimeConverted);

//   // Converts current time to 12 hr format
//   var currentTime = moment();
//   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//   // Capture difference between the two times
//   var diffTime = currentTime.diff(moment(firstTrainTimeConverted), "minutes");
//   console.log("DIFFERENCE IN TIME: " + diffTime);

//   // Time apart (remainder)
//   var tRemainder = diffTime % trainFrequency;
//   console.log("remainder: " + tRemainder);

//   // Minutes until next train
//   var minNextTrain = trainFrequency - tRemainder;
//   console.log("MINUTES TILL TRAIN: " + minNextTrain);

//   // Next Train Arrival Time
//   var nextTrainArrival = currentTime.add(minNextTrain, "minutes");
//   console.log("ARRIVAL TIME: " + moment(nextTrainArrival).format("hh:mm"));

//   var newTrainClock = {
//     arrivalTime: nextTrainArrival,
//     minutesAway: minNextTrain
//   };

//   database.ref().push(newTrainClock);

// }



