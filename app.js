const indexRouter = require('./server/views/indexRouter');
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'client/dist')));


app.use("/", indexRouter);


app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client/dist/index.html'));
});

let config = {
    port: process.env.EXPRESS_PORT || 5000,
    host: process.env.EXPRESS_HOST_NAME || 'localhost'
};


app.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});
