const firebaseConfig = {
	apiKey: 'AIzaSyD9sY7sVtxiljeAVfDIEHroDglNd_UJJjM',
	authDomain: 'integrate-d43d7.firebaseapp.com',
	databaseURL:
		'https://integrate-d43d7-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'integrate-d43d7',
	storageBucket: 'integrate-d43d7.appspot.com',
	messagingSenderId: '529128653902',
	appId: '1:529128653902:web:6cca6fc1e4705c26aa2f1f',
	measurementId: 'G-MQN4Z54WSS',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();
const user = auth.currentUser;

database.settings({ timestampsInSnapshots: true });

// Register function
function register() {
	//Get all input fields
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;

	if (validate_email(email) == false) {
		alert('Email is not valid');
		return;
		// Don't continue running the code
	}
	if (validate_password(password) == false) {
		alert('Password is not valid');
		return;
		// Don't continue running the code
	}

	// Move on with Auth
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((cred) => {
			console.log(cred.user);
			window.location.href = 'profile_edit.html';
		})
		.catch(function (error) {
			// var error_code = error.code;
			var error_message = error.message;

			alert(error_message);
		});
}

// Login function
function login() {
	email = document.getElementById('login_email').value;
	password = document.getElementById('login_password').value;

	// Validate email
	if (validate_email(email) == false) {
		alert('Email is not valid');
		return;
		// Don't continue running the code
	}

	// Validate password
	if (validate_password(password) == false) {
		alert('Password is not valid');
		return;
		// Don't continue running the code
	}

	auth
		.signInWithEmailAndPassword(email, password)
		.then((cred) => {
			console.log(cred.user);

			window.location.href = 'home.html';
		})
		.catch(function (error) {
			var error_message = error.message;

			alert(error_message);
		});
}

// Recognise logged in users
auth.onAuthStateChanged((user) => {
	if (user) {
		// Display email to create profile page
		if (location.href.split(location.host)[1] === '/profile_edit.html') {
			const displayEmail = document.getElementById('display_email');

			let html = `
            <div>${user.email}</div>`;
			displayEmail.innerHTML = html;
		}

		// Display user data on profile page
		if (location.href.split(location.host)[1] === '/profile.html') {
			function renderProfile(doc) {
				document.getElementById('profile_head').innerHTML = `<h5>${
					doc.data().first_name
				} ${doc.data().surname}</h5>`;
				document.getElementById('first_name').innerHTML = `<p>${
					doc.data().first_name
				}</p>`;
				document.getElementById('surname').innerHTML = `<p>${
					doc.data().surname
				}</p>`;
				document.getElementById('gender').innerHTML = `<p>${
					doc.data().gender
				}</p>`;
				document.getElementById('location').innerHTML = `<p>${
					doc.data().location
				}</p>`;
				document.getElementById('birthday').innerHTML = `<p>${
					doc.data().birthday
				}</p>`;
				document.getElementById('university').innerHTML = `<p>${
					doc.data().university
				}</p>`;
				document.getElementById('course').innerHTML = `<p>${
					doc.data().course
				}</p>`;
				document.getElementById('course_year').innerHTML = `<p>${
					doc.data().course_year
				}</p>`;
				document.getElementById('profile_pic').innerHTML = `<img src="${
					doc.data().profile_pic
				}"/>`;
			}

			database
				.collection('profile')
				.get()
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						if (doc.id == user.uid) {
							renderProfile(doc);
						}
					});
				})
				.catch(function (error) {
					// var error_code = error.code;
					var error_message = error.message;

					console.log(error_message);
				});
		}
	}
});

// Loads all users on messaging page
if (
	location.href.split(location.host)[1] === '/messages.html' ||
	location.href.split(location.host)[1] === '/messages.html#'
) {
	const userList = document.querySelector('#userList');
	function renderUsers(doc) {
		let li = document.createElement('li');
		let name = document.createElement('a');

		li.setAttribute('data-id', doc.id);
		name.textContent = `${doc.data().first_name} ${doc.data().surname}`;

		name.classList.add('nav-link', 'users');
		name.setAttribute('data-toggle', 'pill');
		name.setAttribute('role', 'tab');
		name.setAttribute('aria-selected', 'false');
		name.setAttribute('href', '#');

		li.appendChild(name);
		userList.appendChild(li);
	}

	database
		.collection('profile')
		.get()
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				renderUsers(doc);
			});
		})
		.catch(function (error) {
			// var error_code = error.code;
			var error_message = error.message;

			console.log(error_message);
		});
}

// Update profile
function createProfile() {
	const user = auth.currentUser;
	if (user != null) {
		database
			.collection('profile')
			.doc(user.uid)
			.set({
				first_name: document.getElementById('first_name').value,
				surname: document.getElementById('surname').value,
				gender: document.getElementById('gender').value,
				location: document.getElementById('location').value,
				birthday: document.getElementById('birthday').value,
				university: document.getElementById('university').value,
				course: document.getElementById('course').value,
				course_year: document.getElementById('course_year').value,
				profile_pic: document.getElementById('profile_pic').value,
			})
			.then(() => {
				window.location.href = 'profile.html';
			})

			.catch((error) => {
				// An error occurred
				var error_message = error.message;
				alert(error_message);
				// ...
			});
	} else {
		alert('something went wrong');
	}
}

// Update User Data
function update() {
	updateProfile(auth.currentUser, {
		firstName: document.getElementById('first_name').value,
		surname: document.getElementById('surname').value,
		gender: document.getElementById('gender').value,
		location: document.getElementById('location').value,
		birthday: document.getElementById('birthday').value,
		university: document.getElementById('university').value,
		course: document.getElementById('course').value,
		courseYear: document.getElementById('course_year').value,
	})
		.then(() => {
			var user = auth.currentUser;

			var database_ref = database.ref();

			alert('Profile updated');
		})
		.catch((error) => {
			// An error occurred
			var error_message = error.message;
			alert(error_message);
			// ...
		});
}

function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/;
	if (expression.test(email) == true) {
		// Email is good
		return true;
	} else {
		// Email is not good
		return false;
	}
}

function validate_password(password) {
	// Firebase only accepts lengths greater than 6
	if (password < 8) {
		return false;
	} else {
		return true;
	}
}

function validate_field(field) {
	if (field == null) {
		return false;
	}
	if (field.length <= 0) {
		return false;
	} else {
		return true;
	}
}

var logoutButton = document.getElementById("logout-button");

	logoutButton.addEventListener('click', function() {
			//get the current users authentication object
			const auth = firebase.auth();

			//log user out of web page
			auth.signOut().then(() => {
				//redirect the user to the login page
				window.location = 'index.html';
			})
	});
