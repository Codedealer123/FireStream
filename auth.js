import firebase from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import firebaseAuth from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import FirebaseFirestore from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// 🔹 Sign Up (Email & Password)
function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const displayName = document.getElementById("displayName").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            return userCredential.user.updateProfile({ displayName: displayName });
        })
        .then(() => alert("Sign-up successful! Please log in."))
        .catch(error => alert(error.message));
}

// 🔹 Log In (Email & Password)
function logIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert(`Welcome, ${userCredential.user.displayName || "User"}!`);
        })
        .catch(error => alert(error.message));
}

// 🔹 Google Sign-In
function googleSignIn() {
    auth.signInWithPopup(provider)
        .then(result => alert(`Welcome, ${result.user.displayName || "User"}!`))
        .catch(error => alert(error.message));
}

// 🔹 Log Out
function logOut() {
    auth.signOut()
        .then(() => alert("Logged out successfully."))
        .catch(error => alert(error.message));
}

// 🔹 Track Authentication State
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("userDisplay").innerText = `Welcome, ${user.displayName || "User"}!`;
    } else {
        document.getElementById("userDisplay").innerText = "Please log in.";
    }
});
