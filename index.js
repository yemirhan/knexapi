require('dotenv').config();
const app = require('./api/server');
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
