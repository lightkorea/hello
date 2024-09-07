const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware to parse JSON
app.use(bodyParser.json());

// POST endpoint to receive messages
app.post('/message', (req, res) => {
    const message = req.body.message;
    console.log('Received message:', message); // 로그 추가
    if (message) {
        fs.appendFile('messages.txt', message + '\n', (err) => {
            if (err) {
                console.error('Failed to write message to file:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.send('Message received and saved.');
        });
    } else {
        res.status(400).send('Bad Request: No message provided.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
