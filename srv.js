import express from 'express';
// import { listView } from './listView.mjs';
import { posts } from './posts.mjs';

const app = express();
const PORT = 8080;

app.use(express.static('client', { extensions: ['html'] }));


function makePost(req, res) {
  console.log(req.body);
  posts.push({ content: `${req.body.post}` });
  res.json(posts);
}

function getPost(req, res) {
  res.json(posts);
}

app.get('/posts', getPost);
// do post one and have it so when you scroll it you get to view the new items; time will be your main concern in tackling this problem
app.post('/post', express.json(), makePost);

app.listen(PORT);

console.log('server started');
