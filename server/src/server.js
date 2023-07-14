const express = require('express');
const morgan = require('morgan')
const app = express();



app.use(morgan('dev'))

app.get('/', (req, res) => {
   res.status(200).send({
      "msg": 'welcome to the server'
   })
})

app.get('/test', (req, res) => {
   res.status(200).send({
      message: "api is working fine"
   })
})
app.post('/test', (req, res) => {
   res.status(200).send({
      message: "api is working fine"
   })
})
app.put('/test', (req, res) => {
   res.status(200).send({
      message: "api is working fine"
   })
})
app.delete('/test', (req, res) => {
   res.status(200).send({
      message: "api is working fine"
   })
})



app.listen(7000, () => {
   console.log(`server is running at http://localhost:7000`);
})