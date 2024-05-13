<h4>JOKE API</h4>
<ol>
<li>This Project has just one file server.js. This doesn't include all the auto-created files like package.json etc.</l1>
<li>This project used nodemon command to run the server instead of the node command </li>
<li>This server is able to receive POST and GET requests on the home/route</li>
<li>This Server has a variable called db as it's database</li>
<li>When the server receives a POST request, it adds a joke to the db and returns the entire joke db to the client</li>
<li>When the server receives a GET request, it returns all jokes to the client</li>
<li>The server receives PATCH and DELETE requests on a route like (/joke/1). Note: 1 as seen in the url here represents the id.</li>
<li>When the server receives a PATCH request, it updates a joke which matches the id provided in the url. The information for the update is sent via the request body and the response sent to the client is the updated joke only</li>
<li>When the server receives a DELETE request, it deletes the joke which matches the id provided in the url and returns the deleted joke to the user as response.</li>
</ol>