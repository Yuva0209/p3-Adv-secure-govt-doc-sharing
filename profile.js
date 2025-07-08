// scripts/profile.js

auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    const userRef = db.collection("users").doc(uid);

    // Load profile info
    userRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("profileName").value = data.name || "";
        document.getElementById("profileEmail").value = data.email || "";
        document.getElementById("displayName").innerText = data.name || "N/A";
        document.getElementById("displayEmail").innerText = data.email || "N/A";
        if (data.photoURL) {
          document.getElementById("displayPhoto").src = data.photoURL;
        }
      }
    });
  }
});

function updateProfile() {
  const name = document.getElementById("profileName").value;
  const email = document.getElementById("profileEmail").value;
  const file = document.getElementById("profilePhoto").files[0];
  const uid = auth.currentUser.uid;
  const userRef = db.collection("users").doc(uid);

  if (file) {
    // Upload new profile photo
    const photoRef = storage.ref(`profilePhotos/${uid}/${file.name}`);
    photoRef.put(file).then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        return userRef.set({ name, email, photoURL: url }, { merge: true });
      })
      .then(() => {
        logAction("Profile Update", `Name: ${name}, Email: ${email}`);
        alert("Profile updated!");
        location.reload();
      });
  } else {
    // Update name/email only
    userRef.set({ name, email }, { merge: true })
      .then(() => {
        logAction("Profile Update", `Name: ${name}, Email: ${email}`);
        alert("Profile updated!");
        location.reload();
      });
  }
}