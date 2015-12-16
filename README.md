## InstaCollection

### About

Search Instagram images by hashtag within a specific range of dates. User will be able to store and delete images in their personal collection stash.

### Table of Contents
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Keys](#keys)
- [Getting Started](#getting-started)
- [Team](#team)
- [Contributing](#contributing)

### Tech-Stack
	- Front End
		- Angular 
		- Instagram API

	- Back end
		- PostgreSQL with Sequelize -- Allows for relations between users and personal image collections
		- Node.js/Express

### Requirements 
- PostgreSQL
- Grunt
- Node
- Angular.js
- Express 4.x
- NPM

### Keys
- Request Instagram Access token [Instagram](http://instagram.pixelunion.net/)
- Create instagramkey.js in server directory 
- Add module.exports = 'key'

- Web App
  - Fork the repo
  - Clone from your fork
  - npm install
  - bower install
- Database
  - install PostgreSQL
  - open up the postgres shell
  - CREATE ROLE postgres LOGIN;
  - CREATE DATABASE instacollection;
- Run the App
  - node server.js

### Team
  - __Product Owner__: [@jeremyhu9](https://github.com/jeremyhu9)