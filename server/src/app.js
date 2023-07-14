const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const isLoggedIn = (req, res, next) => {
   const login = false;

   if (login) {
      req.body.id = 101;
      next();
   } else {
      return res.status(401).json({ message: 'Please login first...' })
   }

}


app.get('/test', (req, res) => {
   res.status(200).send({
      message: "This is a server file"
   })
})

app.get('/api/user', isLoggedIn, (req, res) => {
   console.log(req.body.id);
   console.log('user profile')
   res.status(200).send({
      message: 'user profile is returned'
   })
})

//client error handling
app.use((req, res, next) => {
   // res.status(404).json({ message: 'opes! page is not found!' })
   next(createError(404, 'opes! page is not found!'));
})

// Server error handling 
app.use((err, req, res, next) => {
   return res.status(err.status || 500).json({
      success: false,
      message: err.message
   })

})

module.exports = app;