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
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  // Creates local object for holding train data
  // Uploads train data to firebase
  // Console logs to check functionality
  // Clear out the text-boxes


// Creates firebase event for adding train to the database and dynamically add rows to the html
  // Store everything as variables
  // Console log variables
  // Console log everything that's coming out of snapshot
  console.log(snapshot.val());
  // Calculate the next arrival time using first train time, current time, and frequency
  // Calculate how many minutes away the train is using current time, first train time, and frequency
  // Add each train's data into the table