const express = require('express');
var enforce = require('express-sslify');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
