// scripts/documents.js

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("userPhone").innerText = user.phoneNumber;
    fetchDocuments(user.uid);
  } else {
    window.location.href = "login.html"; // Redirect if not logged in
  }
});

// Upload Document
function uploadDocument() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Please select a file.");

  const userId = auth.currentUser.uid;
  const storageRef = storage.ref(`documents/${userId}/${file.name}`);

  storageRef.put(file).then(snapshot => {
    return snapshot.ref.getDownloadURL();
  }).then(url => {
    return db.collection("documents").add({
  userId,
  fileName: file.name,
  url,
  sharedWith: [], // initially not shared
  public: false,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
});
    // return db.collection("documents").add({
    //   userId,
    //   fileName: file.name,
    //   url,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // });
  }).then(() => {
    logAction("Upload", `Document ${file.name} uploaded`);
    alert("Upload successful!");
    fetchDocuments(userId);
  }).catch(error => {
    console.error("Upload error:", error);
  });
}

// Fetch & Display Documents
function fetchDocuments(userId) {
  const list = document.getElementById("docList");
  list.innerHTML = "";

  db.collection("documents")
    .where("userId", "==", userId)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
          📄 <a href="${data.url}" target="_blank">${data.fileName}</a>
          <button onclick="deleteDocument('${doc.id}', '${data.fileName}')">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}

// Delete Document
function deleteDocument(docId, fileName) {
  const userId = auth.currentUser.uid;
  const storageRef = storage.ref(`documents/${userId}/${fileName}`);

  storageRef.delete()
    .then(() => db.collection("documents").doc(docId).delete())
    .then(() => {
      logAction("Delete", `Document ${fileName} deleted`);
      alert("Deleted successfully.");
      fetchDocuments(userId);
    })
    .catch(error => {
      console.error("Delete error:", error);
    });
}

// Share Document's
function shareDocument(docId) {
  const shareTo = document.getElementById(`share-${docId}`).value.trim();
  if (!shareTo) return alert("Enter a valid phone/email");

  const docRef = db.collection("documents").doc(docId);

  docRef.update({
    sharedWith: firebase.firestore.FieldValue.arrayUnion(shareTo)
  }).then(() => {
    logAction("Shared Document", `Doc ID: ${docId} shared with ${shareTo}`);
    alert(`Document shared with ${shareTo}`);
  }).catch(error => {
    console.error("Error sharing:", error);
  });
}

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}