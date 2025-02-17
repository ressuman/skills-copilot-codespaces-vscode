// Create web server
// 1. Create a web server
// 2. Listen for incoming requests
// 3. When a request comes in, read the body of the request
// 4. Read the list of comments from the file
// 5. Add the new comment to the list
// 6. Write the list of comments back to the file
// 7. Send a response back to the client
// 8. When a request comes in for the comments, read the file and send the comments back to the client

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/comments', (req, res) => {
    const newComment = req.body;
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.status(201).send();
});

app.get('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    res.json(comments);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

// To test the server, you can use the following curl commands:
// curl -X POST -H "Content-Type: application/json" -d '{"author": "Alice", "text": "Hello World!"}' http://localhost:3000/comments
// curl http://localhost:3000/comments
// The first command sends a POST request to the server with the comment data in the request body. The second command sends a GET request to the server to retrieve the list of comments.