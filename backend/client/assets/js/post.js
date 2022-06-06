const api = 'http://localhost:2000';

document.getElementById('createCommentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target));
  data = {
    ...data,
    userId: JSON.parse(localStorage.getItem('user')).id,
  };
  console.log(data);
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
});

document.querySelector('.replyComment').addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target.dataset.commentid);
  /* const commentId = e.target.dataset.commentId;
  const comment = document.getElementById(`replyComment${commentId}`);
  comment.classList.toggle('hidden'); */
});
