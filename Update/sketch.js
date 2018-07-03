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
	//console.log(results.val());
	//processing

	let data = results.val();
	let keys = Object.keys(data);
	//console.log(keys.length);

	let email_bycount={};
	let users= [];
	for (let key of keys){
		let record= data[key];
		let id = record.displayName;
		
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
