const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', function (req, res) {

    if (!req.headers.host.includes('localhost')) {
        res.redirect('https://' + req.headers.host + req.url);
    }
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
