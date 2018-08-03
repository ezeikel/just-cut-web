const { buildSchema } = require('graphql');
const aws = require('aws-sdk');
const uuid = require('uuid');
const mongoose = require('mongoose');

// TODO: Probably need to move this related graphql stuff into a seperate graphql file
const User = mongoose.model('User'); // eslint-disable-line
const Shop = mongoose.model('Shop');
const Review = mongoose.model('Review'); // eslint-disable-line

// the GraphQL schema in string form
module.exports.schema = buildSchema(`
  type User {
    _id: ID,
    email: String,
    fullName: [String],
    username: String,
    resetPasswordToken: String,
    resetPasswordExpires: String,
    hearts: [ID]
  }
  type Shop {
    _id: ID,
    name: String,
    slug: String,
    description: String,
    tags: [String],
    priceLevel: String,
    ratings: [Int],
    reviews: [Review],
    location: Location,
    distance: Float,
    photo: String
  }
  type Location {
    coordinates: [Float],
    address: String
  }
  input LocationInput {
    coordinates: [Float],
    address: String
  }
  type Review {
    _id: ID,
    author: ID,
    shop: ID,
    text: String,
    rating: Int
  }
  type S3Payload {
    signedRequest: String!,
    url: String!
  }
  type Query {
    shops: [Shop!]!,
    getShopBySlug(slug: String!): Shop,
    findNearestShops(coordinates: [Float!]!): [Shop]
  }
  type Mutation {
    registerUser(email: String, fullName: [String], username: String, password: String, passwordConfirm: String): User,
    createShop(name: String, location: LocationInput, photo: String): Shop,
    signS3(filetype: String!): S3Payload!,
    addRating(_id: ID!, rating: Int!): Shop
  }
`);

// the root provides a resolver function for each API endpoint
module.exports.root = {
  // TODO: some validation on userfields
  // try to use validator middleware
  registerUser: (user) => new User(user).save(),
  shops: () => Shop.find(),
  createShop: (shop) => new Shop(shop).save(),
  getShopBySlug: ({ slug }) => Shop.findOne({ slug }),
  findNearestShops: async ({ coordinates }) => {
    const cursor = await Shop.aggregate([
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
    ]).cursor().exec(); // cursor/explain required from mongo 3.6

    return cursor.toArray();
  },
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
  },
  addRating: async ({ _id, rating }) => Shop.findOneAndUpdate(
    { _id },
    { $push: { ratings: rating } }
  )
};
