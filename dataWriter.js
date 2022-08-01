const { Client, Databases } = require("node-appwrite");
const fs = require("fs");
const movies = require("./movies.json");
const dotenv = require('dotenv');

// Init SDK
let client = new Client();
dotenv.config();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(process.env.APPWRITE_PROJECTID) // Your project ID
  .setKey(process.env.APPWRITE_KEY) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert

let databases = new Databases(client, "movies-db");

//let promise = database.getDocument('627e9b5e008ffd8382ff', '6283ccb7773a9474319d')
const promises = movies.map((movie) =>
  databases.createDocument("movies-collection", String(Math.random()), {
    title: String(movie.title || Math.random()),
    id: String(movie.id || Math.random()),
    overview: String(movie.overview || Math.random()),
    genres: String(movie.genres || Math.random()),
  })
);

Promise.all(promises).then(
  function (response) {
    console.log("success", response); // Success
  },
  function (error) {
    console.log("fail", error); // Failure
  }
);