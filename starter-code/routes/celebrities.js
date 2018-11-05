const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')

/* GET celebrities page */
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
      res.render('celebrities/index', {celebs})
    })
    .catch(error => {
      next(error)
    })
});


router.get('/show/:id', (req, res, next) => {
  let id = req.params.id
  Celebrity.findById(id)
    .then((celebFromDb) => {
      res.render('celebrities/show', {celeb: celebFromDb
      })
    })
    .catch(error => {
      next(error)
    })
})

router.get('/new', (req, res, next) => {
  res.render('celebrities/new')
})

router.post('/', (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body
  const newCeleb = new Celebrity({name, occupation, catchPhrase})
  newCeleb.save() 
    .then((newCeleb) => {
      Celebrity.find()
        .then((celebs) => {
          res.render('celebrities/index', {celebs})
        })
    })
    .catch(error => {
      res.render('celebrities/new')
      // console.log('there was an error')
      next(error)
    })
})

router.post('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Celebrity.findByIdAndDelete(id)
  .then(() => {
    Celebrity.find()
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(error => {
      next(error)
    })
  })
})

module.exports = router;
