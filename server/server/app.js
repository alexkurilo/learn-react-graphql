const express =  require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('../schema/schema');
const PORT = 3005;

const app = express();

mongoose.connect('mongodb://alexkurilo:qwerty12@ds137600.mlab.com:37600/learn-graphql', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`server started on port ${PORT}`);
});
