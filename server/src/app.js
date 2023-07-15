const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const bodyParser = require('body-parser');

const app = express();

const isLoggedIn = (req, res, next) => {
   const login = true;

   if (login) {
      req.body.id = 101;
      next();
   } else {
      return res.status(401).json({ message: 'Please login first...' })
   }

}

const rateLimiter = rateLimit({
   windowMs: 5 * 60 * 1000, // 5 minutes
   max: 3, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
   message: 'Too many request from this IP, please try again after an few minutes',
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(xssClean())
app.use(morgan('dev'))
app.use(express.json())
app.use(isLoggedIn)
app.use(rateLimiter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/users/', userRouter)




app.get('/', (req, res) => {
   res.status(200).send(
      { message: 'Welcome to root server.' }
   )
})

app.get('/test', (req, res) => {
   res.status(200).send({
      message: "This is for test server   "
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