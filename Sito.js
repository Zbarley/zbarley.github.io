
let r, g, b;
let authPromise;
let database;
let rgbDiv;
let email='simonezorzo@gmail.com';
let password='password1';
let bodyElement;
let buttons = [];
let ready = false;
let dataSave;


function pickColor() {
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);
  updateBodyBG();
}

function setup() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyASOr3yFQVk4yRcp0uzkKWI1lX0ewYdLtM",
    authDomain: "color-classifier-zbarley.firebaseapp.com",
    databaseURL: "https://color-classifier-zbarley.firebaseio.com",
    projectId: "color-classifier-zbarley",
    storageBucket: "color-classifier-zbarley.appspot.com",
    messagingSenderId: "646085122999"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  authPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  });


  createCanvas(100, 100).parent("#root");

  rgbDiv = createDiv().parent("#root");

  createCanvas(200, 200).parent('#root');

  rgbDiv = createDiv().parent('#root');

  bodyElement = document.body;

  pickColor();

  ready = true;
  rgbDiv.html(`R:${r} G:${g} B:${b}`);
  
  buttons.push(createButton('red-ish').parent('#root').class('red-ish'));
  buttons.push(createButton('green-ish').parent('#root').class('green-ish'));
  buttons.push(createButton('blue-ish').parent('#root').class('blue-ish'));
  buttons.push(createButton('orange-ish').parent('#root').class('orange-ish'));
  buttons.push(createButton('yellow-ish').parent('#root').class('yellow-ish'));
  buttons.push(createButton('pink-ish').parent('#root').class('pink-ish'));
  buttons.push(createButton('purple-ish').parent('#root').class('purple-ish'));
  buttons.push(createButton('brown-ish').parent('#root').class('brown-ish'));
  buttons.push(createButton('grey-ish').parent('#root').class('grey-ish'));


  for (let i = 0; i < buttons.length; i++) {
    buttons[i].mouseClicked(sendData);
  }


async function sendData() {

     if(!ready) return;
      showLoading();
    let colorDatabase = database.ref('colors');
    var data = {
      r: r,
      g: g,
      b: b,
      label: this.html()
    }
    console.log ("saving data");
    console.log(data);

    let color = colorDatabase.push(data,finished);
    console.log("firebase generated key: "+ color.key);
      function finished(err) {
    if (err) {
      console.error("ooops, something went wrong.");
      console.error(err);
    } else {
      console.log('Data saved successfully');
      setTimeout(hideLoading, 600);
      pickColor();
    }
  }
    
  };

}

function showLoading() {
  select('.loading').show();
  select('canvas').hide();
  for (button of buttons) button.addClass("disabled");
  ready = false;
}

function hideLoading() {
  select('.loading').hide();
  select('canvas').show();
  rgbDiv.html(`R:${r} G:${g} B:${b}`);
  for (button of buttons) button.removeClass("disabled");
  setTimeout(function(){ ready = true;}, 600);
}


function updateBodyBG(){
  bodyElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1.0)`;
}