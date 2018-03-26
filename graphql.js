const { buildSchema } = require('graphql');
const aws = require('aws-sdk');
const uuid = require('uuid');
const mongoose = require('mongoose');

// TODO: Probably need to move this related graphql stuff into a seperate graphql file
const Shop = mongoose.model('Shop');

// the GraphQL schema in string form
module.exports.schema = buildSchema(`
  type Shop {
    _id: ID,
    name: String,
    slug: String,
    description: String,
    tags: [String],
    ratings: [Int]
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
module.exports.root = {
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
