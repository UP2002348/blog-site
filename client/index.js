const el = {};

function removeContentFrom(what) {
  what.textContent = '';
}

function listView(posts, where) {
  for (const post of posts) {
    const li = document.createElement('li');
    li.dataset.postid = post.id;
    li.textContent = post.content;

    where.append(li);
  }
}

async function loadPosts() {
  const response = await fetch('posts');
  if (response.ok) {
    const posts = await response.json();
    // removeContentFrom(el.postList);
    listView(posts, el.postList);
  } else {
    console.log('failed to load posts, try again later', response);
  }
}

async function createPost() {
  console.log(el.postBox.value);
  let response;
  if (el.postBox.value) {
    const payload = { post: el.postBox.value };
    console.log(payload);
    response = await fetch('post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  if (response.ok) {
    el.postBox.value = '';
    const updatedPosts = await response.json();
    removeContentFrom(el.postList);
    listView(updatedPosts, el.postList);
  } else {
    console.log('failed to create post', response);
  }
}

function checkKeys(e) {
  if (e.key === 'Enter') {
    createPost();
  }
}

function addEventListeners() {
  el.postBox.addEventListener('keyup', checkKeys);
  el.postButton.addEventListener('click', createPost);
}

function prepareHandles() {
  el.postBox = document.querySelector('#post-box');
  el.postButton = document.querySelector('#post-button');
  el.postList = document.querySelector('#post-list');
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadPosts();
}

window.addEventListener('load', pageLoaded);
