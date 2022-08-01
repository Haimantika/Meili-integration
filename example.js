const { MeiliSearch } = require('meilisearch')
const { Client, Databases } = require("node-appwrite");
const fs = require("fs");
const dotenv = require('dotenv');


let movies = []
// Init SDK
let Appwriteclient = new Client();
dotenv.config();

Appwriteclient
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(process.env.APPWRITE_PROJECTID) // Your project ID
  .setKey(process.env.APPWRITE_KEY) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert



let databases = new Databases(Appwriteclient, "movies-db");
const fetcher = async () => {
  const response = await databases.listDocuments('movies-collection', [], 100);
  movies = response.documents
}
const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' })
fetcher().then(()=>{
 console.log("mymovies",movies)
 client.index('movie').addDocuments(movies);
})

setTimeout(() => {
  client.getTasks({ indexUid: ['movie'] })
  client.index("movie").search("Star Wars")
}, 5000);



//client.index('movies').deleteAllDocuments()
//client.index('movie').deleteAllDocuments()
//client.index('movies').getTask(0)
//client.index('movies').search('botman').then((res) => console.log("search",res))


