const express = require('express');
const cors = require('cors');
const api = require('./api');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello world');
});
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening at http://localhost:${port}`);
});
