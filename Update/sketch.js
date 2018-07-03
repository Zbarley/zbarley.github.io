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
		console.log(database);
}
