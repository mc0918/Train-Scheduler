console.log("good to go!");

$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyBc63At8NfTsMoC0CMqhuBeSVd32bHv6tE",
    authDomain: "class-test-da92e.firebaseapp.com",
    databaseURL: "https://class-test-da92e.firebaseio.com",
    projectId: "class-test-da92e",
    storageBucket: "class-test-da92e.appspot.com",
    messagingSenderId: "39262339831"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  database.ref("/train_schedule").on(
    "child_added",
    function(snapshot) {
      var trainInfo = snapshot.val();
      console.log(trainInfo);

      var newRow = $("<tr>");
      var nameCol = $("<td>").attr("class", "train-name");
      var destinationCol = $("<td>").attr("class", "train-destination");
      var frequencyCol = $("<td>").attr("class", "train-frequency");
      var firstTrain = moment(trainInfo.trainFirst, "HH:mm").subtract(
        1,
        "months"
      );

      $(nameCol).html(trainInfo.trainName);
      $(destinationCol).html(trainInfo.trainDestination);
      $(frequencyCol).html(trainInfo.trainFrequency);

      var now = moment();
      console.log(now);
      var difference = moment().diff(moment(firstTrain), "minutes");
      var remainder = difference % trainInfo.trainFrequency;
      console.log(remainder);
      var minutes = trainInfo.trainFrequency - remainder;

      var minutesCol = $("<td>").attr("class", "minutes-away");
      $(minutesCol).html(minutes);

      var newTrain = moment().add(minutes, "minutes");
      var newTrainFormat = moment(newTrain).format("HH:mm");
      console.log("NEW TIME FORMAT!!", newTrainFormat);
      var newTrainCol = $("<td>").attr("class", "train-next");
      newTrainCol.html(newTrainFormat);

      newRow.append(
        nameCol,
        destinationCol,
        frequencyCol,
        minutesCol,
        newTrainCol
      );

      $("#train-scheduler").append(newRow);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    console.log("click!");

    var trainName = $("#inputName").val();
    var trainDestination = $("#inputDestination").val();
    var trainFrequency = $("#inputFrequency").val();
    var trainFirst = $("#inputFirstRun").val();

    console.log("ONCLICK TRAIN FREQUENCY!", trainFrequency);

    database.ref("/train_schedule").push({
      trainName: trainName,
      trainDestination: trainDestination,
      trainFrequency: trainFrequency,
      trainFirst: trainFirst
    });
  });
});
//date code

// date = "03/12/2019";
// format = "MM/DD/YYYY";
// convertedDate = moment(date, "MM/DD/YYYY");

// convertedDate.diff(moment(), "days");
//timeNow = moment().format("MMM Do, YYYY hh:mm:ss");
