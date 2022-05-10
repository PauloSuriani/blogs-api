const express = require('express');

const UserRouters = require('./routers/userRouters');
const LoginRouters = require('./routers/loginRouters');
const CategoriesRouters = require('./routers/categoriesRouters');
const PostRouters = require('./routers/postRouters');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/login', LoginRouters);
app.use('/user', UserRouters);
app.use('/categories', CategoriesRouters);
app.use('/post', PostRouters);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
