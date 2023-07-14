const express = require('express');
const morgan = require('morgan')
const app = express();



app.use(morgan('dev'))




app.listen(7000, () => {
   console.log(`server is running at http://localhost:7000`);
})