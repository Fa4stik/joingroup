const express = require('express');
const path = require('path');

const PORT = 8080

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'joingroup', 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'joingroup', 'public', 'index.html'));
})

app.listen(PORT);
