const express = require('express');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors({
    origin: '*'
}))

const objectRouter = require('./router/Object');
app.use(objectRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));