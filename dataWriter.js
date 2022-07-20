const { Client, Databases } = require("node-appwrite");
const fs = require("fs");
const movies = require("./movies.json");

// Init SDK
let client = new Client();

client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("62d6cfec7e3d84860d11") // Your project ID
  .setKey(
    "dee0866241292bbaef0a71b95e448b0f2c6237afdced3c588026f97ad639a49477252c4cb794289806268744abd6e7da3698c942ac0cd1fc786f8f8af534053e1dfde6d2b1e02df92e8ac663d4e0ae0897af53626759d55962f347046189fcc71165f570afd4fb1778d17a36f0d72b02f9ada5bf2323f57d557d1daeb3dcbff8"
  ) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert

let databases = new Databases(client, "62d6d081c21d9cc665e7");

//let promise = database.getDocument('627e9b5e008ffd8382ff', '6283ccb7773a9474319d')
const promises = movies.map((movie) =>
  databases.createDocument("62d704e49589a492971a", String(Math.random()), {
    title: String(movie.title || Math.random()),
    id: String(movie.id || Math.random()),
    overview: String(movie.overview || Math.random()),
    genres: String(movie.genres || Math.random()),
  })
);

Promise.all(promises).then(
  function (response) {
    console.log("auccess", response); // Success
  },
  function (error) {
    console.log("fail", error); // Failure
  }
);