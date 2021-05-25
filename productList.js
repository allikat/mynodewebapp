const ProductDao = require("./models/productDao");

 class ProductList {
   /**
    * Handles the various APIs for displaying and managing tasks
    * @param {ProductDao} productDao
    */
   constructor(productDao) {
     this.productDao = productDao;
   }
   async showProducts(req, res) {
     const querySpec = {
       query: "SELECT * FROM c"      
     };

     const items = await this.productDao.find(querySpec);
     res.render("products", {
       title: "My Product List ",
       items: items
     });
   }

   async addProduct(req, res) {
     const item = req.body;

     await this.productDao.addItem(item);
     res.redirect("/products");
   }

   async updateProduct(req, res) {
     const updatedProducts = Object.keys(req.body);
     const products = [];

     updatedProducts.forEach(product => {
      products.push(this.productDao.updateItem(product));
     });

     await Promise.all(products);

     res.redirect("/products");
   }
 }

 module.exports = ProductList;