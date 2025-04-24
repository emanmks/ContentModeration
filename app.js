const express = require('express');
const app = express();
const port = process.env.PORT || 3456;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Content Moderation running on https://0.0.0.0:${port}`);
});
