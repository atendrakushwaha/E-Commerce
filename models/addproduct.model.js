const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
        pname: { type: String, required: true },
        pprice: { type: Number, required: true },
        pnewprice: { type: Number, required: true },
        pdescription: { type: String, required: true },
        pimage: { type: String, required: true },
        pcategory: { type: String, required: true },
        psubcategory: { type: String, required: true },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        sellerId: { type: Schema.Types.ObjectId, ref: 'signup', required: true }
    });

const product = mongoose.model('product', productSchema);
module.exports = product;