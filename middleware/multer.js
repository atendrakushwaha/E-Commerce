const multer = require('multer');

 const productImage = multer.diskStorage({
        destination:'public/productimage',
        filename:(req,file,tempname)=>{
            tempname(null,file.originalname)
        },
    })
    const uploadimage = multer({storage:productImage})
    module.exports = uploadimage