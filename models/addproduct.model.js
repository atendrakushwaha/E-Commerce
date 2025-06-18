const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Shopsy');
const Schema = mongoose.Schema;

const productSchema = new Schema({
        pname: { type: String, required: true },
        pprice: { type: Number, required: true },
        pnewprice: { type: Number, required: true },
        pdescription: { type: String, required: true },
        pimage: { type: String, required: true },
        pcategory: { type: String, required: true },
        psubcategory: { type: String, required: true },
    });

const product = mongoose.model('product', productSchema);
module.exports = product;