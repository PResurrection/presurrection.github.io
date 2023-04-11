const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
//const cookieParser = require('cookie-parser');

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

const host = 'localhost';
const port = 3001;

const app = express();

app.set('views', './static');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/static')));
//app.use(cookieParser());

function setupRouting() {
  const indexRouter = require('./routes/index');
  const shopRouter = require('./routes/shop');

  app.use('/', indexRouter);
  app.use('/shop', shopRouter);
}

(async () => {
  try {
      // Connect to database MongoDB
      await mongoClient.connect();
      exports.shop_data = mongoClient.db("seabattle").collection("shop_data");
      exports.users_data = mongoClient.db("seabattle").collection("users_data");
      console.log("Connection to database was successfully established");

      // Run Webserver
      setupRouting();
      app.listen(port, host, () => {
          console.log(`SeaBattle Shop is running on http://${host}:${port}`);
      });
  } catch (err) {
      return console.log(err);
  }
})();

process.on("SIGINT", async() => {
  await mongoClient.close();
  console.log("Сonnection to database was successfully terminated");
  console.log("The application has shut down");
  process.exit();
});