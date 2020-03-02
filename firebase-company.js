// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
    apiKey: "AIzaSyAo7WTi-Nyh4d7jgUGmdFlQqdfjHeJe3vY",
    authDomain: "motius.firebaseapp.com",
    databaseURL: "https://motius.firebaseio.com",
    projectId: "motius",
    storageBucket: "motius.appspot.com",
    messagingSenderId: "661680844985"
};

firebase.initializeApp(config);

// Reference messages collection
var messages = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');
    var date = Date(Date.now());

    // Save message
    saveMessage(name, email, message, date);
}

// Redirect to success page if form was submitted
document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        window.location.href = "success";
    });


// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message, date) {
    var newMessageRef = messages.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
        date: date
    });
}

