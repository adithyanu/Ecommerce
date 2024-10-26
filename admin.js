// const express = require("express");
// const mongoose = require("mongoose");
// const router  = express.Router();
// const db = require('../models/products');

// const controller = require("../controller/usercontroller")

// router.get('/login', async(req,res)=>{
//     res.render('admin/login')
// });

// router.post('/login', async(req,res)=>{
//     const productdatadetails = await db.find();
//     res.redirect('/admin/homee')
// });

// router.get('/homee', async(req,res)=>{
//     const productdatadetails = await db.find();
//     res.render('admin/homee',{productdatadetails})
// });
// router.get('/addproduct', (req,res)=>{
//     res.render('admin/addproduct')
// });
// router.post('/addproduct', async(req,res)=>{
//     const data ={
//         productname:req.body.productname, 
//         price:req.body.price,
//         rating:req.body.rating,
//         model:req.body.model,
//         description:req.body.description,
//         stock:req.body.stock,
//         image:req.body.image,
//         category:req.body.category
//     }
//     console.log(data)
//     const productdata = await db.insertMany(data)
//     console.log(productdata);
//     const productdatadetails = await db.find();
//     res.redirect('/admin/homee');
// })
// module.exports = router;
var express = require("express");
var router = express.Router();
var admincontroller = require("../controller/admincontroller")
var upload = require("../multer")


router.post("/login",admincontroller.loginpost)
router.get("/homee",admincontroller.homee)
router.get("/dashboard",admincontroller.dashboard)
router.get("/user",admincontroller.user)
router.get("/login",admincontroller.login)
router.get("/edit/:id",admincontroller.edit)
router.get("/delete/:id",admincontroller.del)
router.get("/toggleuser/:id",admincontroller.toggleUser)
router.post("/update/:id",upload,admincontroller.update)
router.get("/signout",admincontroller.logoutadmin)
router.get("/addproduct",admincontroller.create)
router.post("/addproduct",upload,admincontroller.register)
router.post("/delete-image/:id",upload,admincontroller.deleteimage)

router.get("/add-category",admincontroller.viewcategory) 
router.get("/categoryadding",admincontroller.categoryadding) 
router.post("/categoryadding",admincontroller.categoryaddpost)
router.get("/deletecategory/:id",admincontroller.deletecategory)
router.get('/updatecategory/:id',admincontroller.categoryupdateget)
router.post('/updatecategory/:id',admincontroller.categoryupdatepost)
// router.post('/toggleVisibility', admincontroller.toggleVisibility);

router.get("/order",admincontroller.order) 
router.post('/updateorder',admincontroller.updateOrderStatus)

router.get('/coupon', admincontroller.renderCreateCouponPage);
router.post('/coupon', admincontroller.createCoupon);
router.get('/available', admincontroller.getAvailableCoupons);
router.delete('/coupon/:id', admincontroller.deleteCoupon);

// router.get('/sales-report', admincontroller.getSalesReport);
router.get("/sales",admincontroller.sales)
router.post('/filter-sales', admincontroller.filterSales)
router.post('/filter-sales-by-date', admincontroller.filterSalesByDate);
router.post('/filter-sales-by-date-range', admincontroller.filterByDateRange);
module.exports = router;