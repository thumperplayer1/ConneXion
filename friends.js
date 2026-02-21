// Send a friend request
function sendFriendRequest() {
  const targetRaw = document.getElementById("friendName").value.trim();
  const currentUser =
    localStorage.getItem("currentUser") ||
    localStorage.getItem("connexionUsername");

  if (!targetRaw) {
    alert("Enter a username.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // ⭐ ALWAYS resolve to the full username with tag
  const targetUserObj = users.find(u => {
    const base = u.username.split("#")[0];
    return u.username === targetRaw || base === targetRaw;
  });

  if (!targetUserObj) {
    alert("User does not exist.");
    return;
  }

  // ⭐ THIS is the correct username to save under
  const targetUser = targetUserObj.username;

  if (targetUser === currentUser) {
    alert("You cannot friend yourself.");
    return;
  }

  let requests = JSON.parse(localStorage.getItem("friendRequests")) || {};

  // ⭐ ALWAYS use the full tag as the key
  if (!requests[targetUser]) requests[targetUser] = [];

  if (requests[targetUser].includes(currentUser)) {
    alert("Request already sent.");
    return;
  }

  requests[targetUser].push(currentUser);
  localStorage.setItem("friendRequests", JSON.stringify(requests));

  alert("Friend request sent!");
}

// Accept a request
function acceptFriendRequest(sender) {
  const currentUser =
    localStorage.getItem("currentUser") ||
    localStorage.getItem("connexionUsername");

  let requests = JSON.parse(localStorage.getItem("friendRequests")) || {};
  let friends = JSON.parse(localStorage.getItem("friends")) || {};

  // Remove request
  requests[currentUser] = requests[currentUser].filter(u => u !== sender);
  localStorage.setItem("friendRequests", JSON.stringify(requests));

  // Add to friends list
  if (!friends[currentUser]) friends[currentUser] = [];
  if (!friends[sender]) friends[sender] = [];

  if (!friends[currentUser].includes(sender))
    friends[currentUser].push(sender);

  if (!friends[sender].includes(currentUser))
    friends[sender].push(currentUser);

  localStorage.setItem("friends", JSON.stringify(friends));

  loadRequests();
  loadFriends();
}

// Decline a request
function declineFriendRequest(sender) {
  const currentUser =
    localStorage.getItem("currentUser") ||
    localStorage.getItem("connexionUsername");

  let requests = JSON.parse(localStorage.getItem("friendRequests")) || {};

  requests[currentUser] = requests[currentUser].filter(u => u !== sender);
  localStorage.setItem("friendRequests", JSON.stringify(requests));

  loadRequests();
}
