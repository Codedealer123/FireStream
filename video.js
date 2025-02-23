import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'

// 🔹 Add Video (Allow users to post videos)
function addVideo() {
    const videoTitle = document.getElementById("videoTitle").value;
    const videoURL = document.getElementById("videoURL").value;
    const category = document.getElementById("category").value;
    const playlist = document.getElementById("playlist").value;

    db.collection("videos").add({
        title: videoTitle,
        url: videoURL,
        category: category,
        playlist: playlist,
        likes: 0,
        comments: []
    })
    .then(() => alert("Video added successfully!"))
    .catch(error => alert(error.message));
}

// 🔹 Load Videos from Firestore (With Likes & Comments)
function loadVideos() {
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = "";

    db.collection("videos").get().then(snapshot => {
        snapshot.forEach(doc => {
            const videoData = doc.data();
            const videoElement = `
                <div class="video-card">
                    <h3>${videoData.title}</h3>
                    <iframe width="560" height="315" src="${videoData.url}" frameborder="0" allowfullscreen></iframe>
                    <p>Category: ${videoData.category}</p>
                    <p>Playlist: ${videoData.playlist}</p>
                    <button onclick="likeVideo('${doc.id}')">Like (${videoData.likes})</button>
                    <input type="text" id="commentText_${doc.id}" placeholder="Add a comment">
                    <button onclick="addComment('${doc.id}')">Post Comment</button>
                    <div id="comments_${doc.id}">
                        ${videoData.comments.map(comment => `<p>${comment}</p>`).join('')}
                    </div>
                </div>
            `;
            videoContainer.innerHTML += videoElement;
        });
    });
}

// 🔹 Like Video
function likeVideo(videoId) {
    const videoRef = db.collection("videos").doc(videoId);
    videoRef.update({
        likes: firebase.firestore.FieldValue.increment(1)
    });
}

// 🔹 Add Comment
function addComment(videoId) {
    const commentText = document.getElementById(`commentText_${videoId}`).value;
    if (commentText) {
        const videoRef = db.collection("videos").doc(videoId);
        videoRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentText)
        })
        .then(() => loadVideos()); // Refresh the video list to show new comments
    } else {
        alert("Please enter a comment.");
    }
}

// Load videos when the page is ready
window.onload = loadVideos;
