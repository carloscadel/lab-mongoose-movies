const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')

const dbMovies = 'mongoose-movies'
mongoose.connect(`mongodb://localhost/${dbMovies}`, { useNewUrlParser: true });

const celebrities = [
  {
    name: 'Ramoncin',
    occupation: 'Prick',
    catchPhrase: 'I\'m the prickest prick'
  },{
    name: 'Hancock',
    occupation: 'Allegedly a hero',
    catchPhrase: 'My name is Han and this is my...'
  },{
    name: 'Supercunt',
    occupation: 'Cunt',
    catchPhrase: 'Well, you know... I don\'t give a...'
  }
]

Celebrity.create(celebrities, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${celebrities.length} celebrities`);
  mongoose.connection.close();
});

module.exports = Celebrity