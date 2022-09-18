# Why Does the World Need Stupid Queue?

It definitely does not need it.

There was one day when I was trying to do things The Right Way to pass messages between two web apps running in different browsers. So I did a bunch of research. And then I installed RabbitMQ and configured it. And then I imported a few different RabbitMQ client packages and tried to get them to work. There was a lot of hassle figuring out how to get Webpack 5, Create-React-App, and the web-based polyfills for removed Node functionality working together.

TL;DR - it was just simpler to write a message queue server from scratch. It took maybe 3 hours total for Node.js newb like me to do it. More and more, I'm finding it's just easier to write small pieces of functionality from scratch rather than dealing with imports and their ongoing maintenance.

# Why Might You Want to Use Stupid Queue?

It's small and understandable code to use as a starting point for learning or adding to. There's no build-time or run-time dependencies.

I'm not going to bother to publish it to NPM. Well, if you ask me to, I might.

# Features

* In-memory queue (no persistence)
* REST endpoints for sending and receiving messages on a single channel.
* Receiving messages uses long-polling.
* Disables CORS exceptions to support use case of browser code calling it from a different domain.

# Installation

1. Clone the source.
`git clone git@github.com:erikh2000/stupid-queue.git`

2. Install Node modules from the `stupid-queue` directory. (The one that has this file in it.)
`npm install`

3. Run it!
`npm run`

# Usage

To send a message: (try it from browser URL)

`http://localhost:3001/send?message=my+dog+has+fleas`

To receive any pending messages:

`http://localhost:3001/receive`

# The Future of Stupid Queue

It will be a very humble future, I'm sure. Why am I even writing this README?
