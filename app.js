const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
const ProductList = require('./productList')
const ProductDao = require('./models/productDao')

const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = 4242;

//routes 
const routes = require('./routes/index');
const products = require('./routes/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/products', products);

const cosmosClient = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
  })
  const productDao = new ProductDao(cosmosClient, config.databaseId, config.containerId)
  const productList = new ProductList(productDao)
  productDao
    .init(err => {
      console.error(err)
    })
    .catch(err => {
      console.error(err)
      console.error(
        'Shutting down because there was an error setting up the database.'
      )
      process.exit(1)
    })
 
  app.get('/showproducts', (req, res, next) => productList.showProducts(req, res).catch(next))
  app.post('/addproduct', (req, res, next) => productList.addProduct(req, res).catch(next)) 
  app.post('/updateproduct', (req, res, next) =>
    productList.updateProduct(req, res).catch(next)
  )
  
 
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

 // error handler
 app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
 
    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;

