
// alert('this shit works');
const api = 'http://localhost:2000';

if (
  localStorage.getItem('token') === undefined ||
  localStorage.getItem('token') === null
) {
  document.getElementById(
    'login',
  ).innerHTML = `<a href="${api}/auth/login">Login</a>`;
} else {
  document.getElementById(
    'createANewPost',
  ).innerHTML = `<button id="createNewPost" onClick="showModal()">Create a new post</button>`;
  document.getElementById(
    'login',
  ).innerHTML = `<button id="logOut" onClick="logOut()">LogOut</button>`;
}

if(JSON.parse(localStorage.getItem('user')).role === "admin"){
  document.getElementById('toUsersView').innerHTML = `<a href="${api}/users">Users</a>`;
}

document.getElementById('createPostForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target));
  data = {
    ...data,
    userId: JSON.parse(localStorage.getItem('user')).id,
  };
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.status === 200) {
      window.location.href = `${api}/`;
    }
  });
});

function showModal() {
  document.getElementById('createNewPostModal').classList.toggle('hidden');
}

function logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = `${api}/`;
}