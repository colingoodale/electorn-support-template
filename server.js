const express = require('express');
const dotenv = require('dotenv');
const session = require("express-session");
const enforce = require('express-sslify');
const helmet = require("helmet");
const mongoose = require('mongoose');
const MongoDbStore = require("connect-mongodb-session")(session);
const routes = require('./routes');


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGOD_URI || 'mongodb://localhost:27017/support-playbook';

const sessionCookieExpiration = 1000 * 60 * 60 * 8 //8 hours

const store = new MongoDbStore({
    use: mongoURI,
    collection: 'sessions',
    expires: sessionCookieExpiration
});

store.on('error', err => {
    console.log("MongoDBStore error");
    console.log(err)
});

const sess = {
    secret:"supercalifragilisticexpialidocious",
    cookie:{
        maxAge: sessionCookieExpiration
    },
    store:store,
    resave:true,
    saveUnitialized: true
};

if(process.env.NODE_ENV === 'production'){
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(helmet());
app.use(require('express-session')(sess));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const options = {
  useNewUrlParser: true
};

mongoose.connect(
    mongoURI, 
    options
)
.then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}).catch(err => {
    throw err;
})
