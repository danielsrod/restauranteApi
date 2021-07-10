const express = require('express');
const app = express();
const router = require('./router/routes');
const port = 3402;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(router);

app.listen(port, () => {
    console.log(`Rodando em *${port}`);
});