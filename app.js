const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const port = 3000;

app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));