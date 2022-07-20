const { MeiliSearch } = require('meilisearch')
const { Client, Databases } = require("node-appwrite");
const fs = require("fs");

let movies = []
// Init SDK
let Appwriteclient = new Client();

Appwriteclient
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("62d6cfec7e3d84860d11") // Your project ID
  .setKey(
    "dee0866241292bbaef0a71b95e448b0f2c6237afdced3c588026f97ad639a49477252c4cb794289806268744abd6e7da3698c942ac0cd1fc786f8f8af534053e1dfde6d2b1e02df92e8ac663d4e0ae0897af53626759d55962f347046189fcc71165f570afd4fb1778d17a36f0d72b02f9ada5bf2323f57d557d1daeb3dcbff8"
  ) // Your secret API key
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


