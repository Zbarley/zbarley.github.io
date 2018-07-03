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
		  database= firebase.database();

		  let ref = database.ref('colors');
		  ref.once('value',gotData);
}
function gotData(results){
	console.log(results.val());
	//processing

	let data = results.val();
	let keys = Object.keys(data);
	console.log(keys.length);


	for (let key of keys){
		let record= deta[key];
		console.log(record.email);

	}


}
