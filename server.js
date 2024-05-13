const http = require("http")

const port = 3000
const host = "127.0.0.1"

let db = [];
  

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => body += chunk.toString())
        req.on("end", () => {
            db.push(JSON.parse(body))
            res.end(body)
            console.log(db)
        })
       
    } else if (req.url === "/" && req.method === "GET") {
        res.end(JSON.stringify(db))
    } else if (req.method === "PATCH" && req.url.startsWith("/jokes")) {
        let body = "";

        req.on("data", (chunk) => body += chunk.toString())
        req.on("end",() => {
            // The request received from the PATCH method is a string, so we need to parse it to JSON.
            const parsedBody = JSON.parse(body);
            // Split the URL into parts and fetch the id
            const jokeID = Number(req.url.split("/")[2]);
            // Find the joke in the database where the ID matches
            const oldJoke = db.find((joke) => joke.id === jokeID);
            // update the old joke details using destructing
            const newJoke = {...oldJoke, ...parsedBody}
            // update the joke in the database
            db = db.map((joke) => (joke.id === jokeID ? newJoke : joke))
                console.log(db);
            // send the updated joke to the client
            res.end(JSON.stringify(newJoke))
            console.log(newJoke);
        })
    } else if (req.method === "DELETE" && req.url.startsWith("/jokes")) {
        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", () => {
          // Split the URL into parts and fetch the id
          const deleteJokeID = Number(req.url.split("/")[2]);
          // Find the joke in the database where the ID matches
          const findJoke = db.findIndex((joke) => joke.id === deleteJokeID);
          
          // If the ID doesn't exist, return not found
          if (findJoke === -1) {
            res.writeHead(404);
            res.end("Joke not found. Is that even funny??? 🙄");
            return;
          }
          // Delete the joke from the database
          const deleteJoke = db.splice(findJoke, 1);
          // Send the update joke to the client
          res.writeHead(200);
          res.end(JSON.stringify(deleteJoke));
          console.log(deleteJoke);
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: "Entry not found"}))
    }
})


server.listen(port, host, () => {
    console.log(`server running on port:${port} host:${host}`)
})