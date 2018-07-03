let colorByLabel = {
'red-ish': [],
'green-ish': [],
'blue-ish': [],
'orange-ish': [],
'yellow-ish': [],
'pink-ish': [],
'purple-ish': [],
'brown-ish': [],
'grey-ish': []
}
let colorVector=['red-ish','green-ish','blue-ish','orange-ish','yellow-ish','pink-ish','purple-ish','brown-ish','grey-ish'];

let data;
let keys;
let ref;
let email_bycount={};
let users= [];
let x=0;
let y=0;



function setup() {
	createCanvas(400,400);
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
		  database= firebase.database();

		  ref = database.ref('colors');
		  ref.once('value',gotData);
}
function gotData(results){
	//console.log(results.val());
	//processing

	data = results.val();
	keys = Object.keys(data);
	//console.log(keys.length);
	classifica(keys);
	groupColori();
	for (let color of colorVector){
		fill(0,00,0);
		text(color,x,y);
		y+=10
		disegnaColori(color);
		y+=30;
		x=0;
	}
	

}

function groupColori(){
	for (let key of keys){
		let record = data [key];
		let col = color(record.r,record.g,record.b);
		colorByLabel[record.label].push(col);
	}
}

function disegnaColori(color){
	let colore = colorByLabel[color];
	for (let i =0; i<colore.length;i++){
		noStroke();
		fill(colore[i]);
		rect(x,y,10,10);
		x+=10;
		if (x>=width){
			x=0;
			y+=10; 
		}
	}






}
function classifica(){

	for (let key of keys){
		let record= data[key];
		let id = record.user;
		
		if (!email_bycount[id]){
			email_bycount[id]=1;
			users.push(id);
		}
		else{
			email_bycount[id]++;
		}
		users.sort(function(a,b){
			return (email_bycount[a] - email_bycount[b]);

		})
		
		//console.log(email_bycount);
	}
	for (let id of users){
			console.log(id + " ha fatto " + email_bycount[id]+ " test.");
	}
}
