
const api = 'http://localhost:2000';

// window.location.href = `${api}/auth/login`;

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.error || data.statusCode === 401) {
        alert('Invalid username or password');
      } else {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = `${api}/`;
      }
    });
});
