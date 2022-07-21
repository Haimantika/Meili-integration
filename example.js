const { MeiliSearch } = require('meilisearch')
const { Client, Databases } = require("node-appwrite");
const fs = require("fs");
const dotenv = require('dotenv');


let movies = []
// Init SDK
let Appwriteclient = new Client();
dotenv.config();

Appwriteclient
  .setEndpoint(process.env.AAPPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(process.env.APPWRITE_PROJECTID) // Your project ID
  .setKey(process.env.APPWRITE_KEY) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert



let databases = new Databases(Appwriteclient, "62d6d081c21d9cc665e7");
const fetcher = async () => {
  const response = await databases.listDocuments('62d704e49589a492971a', [], 100);
  movies = response.documents
}
const client = new MeiliSearch({ host: 'http://127.0.0.1:7700',apiKey: 'masterKey' })
fetcher().then(()=>{
 console.log("mymovies",movies)
 client.index('anotherindex').addDocuments(movies).then((res) => console.log("writesuccess",res))

})

setTimeout(() => {
  client.getTasks({ indexUid: ['anotherindex'] }).then((res) => console.log("writesuccess",res.results[0].details))
  client.index("anotherindex").search("Star Wars").then(res => console.log("search",res))
}, 5000);



//client.index('movies').deleteAllDocuments()
//client.index('movie').deleteAllDocuments()
//client.index('movies').getTask(0)
//client.index('movies').search('botman').then((res) => console.log("search",res))


