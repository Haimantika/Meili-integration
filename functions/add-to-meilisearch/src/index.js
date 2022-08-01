const sdk = require("node-appwrite");
const { MeiliSearch } = require('meilisearch')
/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {

  console.log(JSON.stringify(req.env))
  const client = new sdk.Client();

  // You can remove services you don't use
  let account = new sdk.Account(client);
  let avatars = new sdk.Avatars(client);
  let database = new sdk.Databases(client, 'movies-db');
  let functions = new sdk.Functions(client);
  let health = new sdk.Health(client);
  let locale = new sdk.Locale(client);
  let storage = new sdk.Storage(client);
  let teams = new sdk.Teams(client);
  let users = new sdk.Users(client);

  if (
    !req.env['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.env['APPWRITE_FUNCTION_API_KEY'] ||
    !req.env['APPWRITE_MEILISEARCH_HOST'] ||
    !req.env['APPWRITE_MEILISEARCH_API_KEY']

  ) {
    throw "Environment variables are not set. Function cannot use Appwrite SDK.";
  } else {
    client
      .setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.env['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  if (
    !req.env['APPWRITE_FUNCTION_EVENT_DATA']
  ) {
    throw "Missing event data!";
  }

  const meiliConfig = {
    host: req.env['APPWRITE_MEILISEARCH_HOST'],
    apiKey: req.env['APPWRITE_MEILISEARCH_API_KEY']
  }

  const meiliClient = new MeiliSearch(meiliConfig);
  const data = JSON.parse(req.env['APPWRITE_FUNCTION_EVENT_DATA']);
  const result = await meiliClient.index('movie').updateDocuments(data);
  console.log(result);

  res.json(data, 200);
};
