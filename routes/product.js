const Product = require('../models/product');
const {verifyToken, verifyTokenAndAuth, verifyTokenAdmin} = require("../routes/verifyToken");
const multer = require('multer');
const router = require('express').Router();

// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({storage: storage}).single('image');




// CREATE PRODUCT
router.post("/", verifyTokenAdmin, async (req, res) => {
    // add new product with image
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json(err);
        }
            const newProduct = new Product({
            title: req.body.title,
            image: req.file.path,
            desc: req.body.desc,
            categories: req.body.categories,
            size: req.body.size,
            color: req.body.color,
            price: req.body.price,
        });
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    });
});


    //     const newProduct = new Product({
    //         title: req.body.title,
    //         image: req.file.path,
    //         desc: req.body.desc,
    //         categories: req.body.categories,
    //         size: req.body.size,
    //         color: req.body.color,
    //         price: req.body.price,
    //     });
    //     try {
    //         const savedProduct = await newProduct.save();
    //         res.status(200).json(savedProduct);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // }



// );

// UPDATE PRODUCT
router.put("/:id", verifyTokenAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// DELETE PRODUCT
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET PRODUCT
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET ALL PRODUCTS
router.get("/", verifyToken, async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    try {
        let products;

        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (queryCategory) {
            products = await Product.find({
                categories: {
                    $in: [queryCategory],
                },
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// 



module.exports = router;