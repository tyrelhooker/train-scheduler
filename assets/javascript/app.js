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

// Event for adding Train Information
$("#addTrainBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  // Converts user input from military time to 12hr
  var trainStartTime = moment($("#firstTrain-input").val().trim(), "HH:mm").format("hh.mm");
  var trainFrequency = $("#trainFrequency-input").val().trim();

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
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;
  var childKey = childSnapshot.key;
  console.log("childSnapshot Key: " + childKey);

  // Console log variables
  console.log("from database check: " + trainName);
  console.log("from database check: " + trainDestination);
  console.log("from database check: " + trainFrequency);

  // Next Train Arrival and Minutes Away Calculations
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
  
  // Dynamically creates delete button to remove row info and firebase key
  var deleteRow = "<button class='btn deleteBtn' attr='" + childKey + "'>delete train</button>";

  // Adds each train's data into the train table using es6 templating
  $("#trainTable tbody").append(
    `<tr>
      <td> ${trainName} </td>
      <td> ${trainDestination} </td>
      <td> ${trainFrequency} </td>
      <td> ${nextTrainArrival} </td>
      <td> ${minNextTrain} </td>
      <td> ${deleteRow} </td>
    </tr>`
  );
});

$(document).on("click", ".deleteBtn", function(event) {
  event.preventDefault();
  // database.ref(childKey).remove();
  console.log(this);
  var childKey = $(this).attr("attr");
  
  database.ref(childKey).remove();
  // rootRef.once("value")
  //   .then(function(childSnapshot) {
  //     var key = childSnapshot.val().name
  //   });
  $(this).closest('tr').remove();
});




