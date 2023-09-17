const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('I m LIVE')
})
app.post('/hit', (req, res) => {
    res.send('hello world')
})

app.listen(3000)
