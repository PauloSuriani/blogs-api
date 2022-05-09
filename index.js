const express = require('express');

const UserRouters = require('./routers/userRouters');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserRouters);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
