const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

mongoose.connect(
    process.env.DEV_MONGO_URL, 
    { useNewUrlParser: true}
)
.then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}).catch(err => {
    throw err;
})
