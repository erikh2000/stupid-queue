const EventEmitter = require('./EventEmitter.js');
const express = require('express');
const url = require('url');

const app = express();

const PORT = 3001;
const TIMEOUT_SECS = 5;

const eventEmitter = new EventEmitter();

let queue = [];

app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.contentType('application/json');
  next();
});

app.get('/send', (request, response) => {
  const urlParts = url.parse(request.url, true);
  const message = urlParts.query.message;
  if (!message) {
    response.send(`Missing message.`);
    response.sendStatus(400);
    return;
  }
  eventEmitter.fire(message);
  response.end();
});

app.get('/receive', (request, response) => {
  if (queue.length) {
    response.end( JSON.stringify(queue));
    queue = [];
    return;
  }

  const id = `${request.ip}-${new Date().toString()}`;
  const handler = function(event) {
    queue.push(event);
    eventEmitter.unregister(id);
    response.end( JSON.stringify(queue));
    queue = [];
  };
  eventEmitter.register(id, handler);
  
  timer = setTimeout(function(){ 
    const alreadyUnregistered = !eventEmitter.unregister(id);
    if (alreadyUnregistered) return;
    response.end('[]');
  }, TIMEOUT_SECS*1000);
});

// set the server to listen on port 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));