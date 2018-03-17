const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const aws = require('aws-sdk');
const uuid = require('uuid');
// const errorHandlers = require('./handlers/errorHandlers');

const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

// TODO: Probably need to move this related graphql stuff into a seperate graphql file
const Shop = mongoose.model('Shop');

// some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// the GraphQL schema in string form
const schema = buildSchema(`
  type Book { title: String, author: String }
  type Shop {
    id: ID,
    name: String,
    slug: String,
    description: String,
    tags: [String],
    location: Location,
    distance: Float,
    photo: String
  }
  input LocationInput {
    coordinates: [Float],
    address: String
  }
  type Location {
    coordinates: [Float],
    address: String
  }
  type S3Payload {
    signedRequest: String!,
    url: String!
  }
  type Query {
    books: [Book!]!,
    shops: [Shop!]!,
    getShopBySlug(slug: String!): Shop,
    findNearestShops(coordinates: [Float!]!): [Shop]
  }
  type Mutation {
    createShop(name: String, location: LocationInput, photo: String): Shop,
    signS3(filetype: String!): S3Payload!
  }
`);

// the root provides a resolver function for each API endpoint
const root = {
  books: () => books,
  shops: async () => Shop.find(),
  createShop: async (obj) => new Shop(obj).save(),
  getShopBySlug: async ({ slug }) => Shop.findOne({ slug }),
  findNearestShops: async ({ coordinates }) => Shop.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates },
        distanceMultiplier: 0.000621371,
        distanceField: 'distance',
        minDistance: 0,
        maxDistance: 5 * 1609.344,
        spherical: true
      }
    }
  ]),
  signS3: async ({ filetype }) => {
    const extension = filetype.split('/')[1];
    const name = `${uuid.v4()}.${extension}`;

    const s3 = new aws.S3({
      signatureVersion: 'v4',
      region: 'eu-west-2'
    });

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${name}`,
      Expires: 60 * 5,
      ContentType: filetype
    };

    const signedRequest = await s3.getSignedUrl('putObject', s3Params);
    const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/uploads/${name}`;
    return {
      signedRequest,
      url
    };
  }
};

// kept from express-generator
const favicon = require('serve-favicon');

// create our Express app
const app = express();

// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure app to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization'
  );
  next();
});

// exposes a bunch of methods for validation data
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// sessions allow us to store data on visitors from request to request
// this keeps user logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passportjs is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// pass variables to our templates + helpers
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// after allll that above middleware, we finally handle our own routes!
app.use('/', routes);

// the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  pretty: true,
  graphiql: true // GraphiQL, a visual editor for queries
}));

app.use('/public', express.static(path.join(__dirname, '/public')));

if (app.get('env') === 'production') {
  // express will serve up production assets like main.js or main.css
  app.use(express.static('client/build'));

  // express will serve up the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// done! we export is so we can start the site in start.js
module.exports = app;
