'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');

const user = {
  _id: '1007',
  name: 'Maisy',
  friends: ['1006', '1008', '1009'],
  avatarUrl: '/images/profile-pics/000002.jpg',
};

let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const handleHomepage = (req, res) => {
  res.status(200).render('pages/homepage', { users: users });
};

const handleProfilePage = (req, res) => {
  res.status(200).render('pages/profile', {
    users: users,
    user: user,
  });
};

const handleSignin = (req, res) => {
  res.status(200).render('pages/signin');
};

const handleName = (req, res) => {
  let firstName = req.query.firstName;
  console.log(firstName);
  let loginName = users.find((user) => user.name === firstName);
  if (loginName !== undefined) {
    res.status(200).redirect('/users/1007');
  } else {
    res.status(404).render('pages/signin');
  }
};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .get('/', handleHomepage)
  .get('/users/1007', handleProfilePage)
  .get('/signin', handleSignin)
  .get('/getname', handleName)

  // a catchall endpoint that will send the 404 message.
  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));
