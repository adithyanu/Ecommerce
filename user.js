var express = require("express");
var router = express.Router();
const usercontroller = require('../controller/usercontroller');
const crypto = require('crypto');
const collection1 = require("../models/loginconfig") //conecting mongodb to make collection1



const checkSessionAndBlocked = async (req, res, next) => {
    console.log("Middleware working")
    if (req.session.user) {
      const userDetials = await collection1.findOne({ email: req.session.user });
      console.log(userDetials);
      if (!userDetials.isBlocked) {
        // User is not blocked, proceed to the next middleware or route handler
        next();
      } else {
       
        req.session.destroy((err) => {
          if (err) {
            console.log("Error destroying session: ", err);
            res.redirect("/login");
          } else {
            res.redirect("/login");
          }
        });
      }
    } else {
     
      res.redirect("/login");
    }
  };
  


router.get("/",usercontroller.landingpage);
router.get("/signup",usercontroller.signup);
router.post("/signup",usercontroller.signuppost);
router.get("/otpget",usercontroller.mailsender);
router.post("/verifyotp",usercontroller.otpvalidation);
router.get("/resendotp",usercontroller.resendotp);
router.get("/login",usercontroller.login);
router.post("/login",usercontroller.loginpost);
router.get("/home",checkSessionAndBlocked,usercontroller.home);
router.get("/productdescription/:id",checkSessionAndBlocked,usercontroller.productdescription);
router.get("/signout",usercontroller.logout)

router.get("/androidMain",checkSessionAndBlocked,usercontroller.nothing)
router.get("/android",usercontroller.android)
router.post('/android', usercontroller.androidPost);

router.get("/iosMain",checkSessionAndBlocked,usercontroller.iosMain);
router.get("/ios",usercontroller.ios)
router.post('/ios', usercontroller.iosPost);

router.get("/othersMain",checkSessionAndBlocked,usercontroller.othersMain);
router.get("/others",usercontroller.others)
router.post('/others', usercontroller.othersPost);

router.get("/forgotpassword",usercontroller.forgotpassword)
router.post("/forgotpassword",usercontroller.forgotpasswordpost)
router.post("/verifyforgototp",usercontroller.verifyforgototp) 
router.get("/resendforgototp",usercontroller.resendforgototp);
router.get("/changepassword",usercontroller.changepassword)
router.post("/changepassword",usercontroller.changepasswordpost)
// router.get("/cart",usercontroller.cart);
router.get("/cart",checkSessionAndBlocked, usercontroller.addToCart); 
router.get("/getcart/:userId",checkSessionAndBlocked,usercontroller.getCartPage);
router.post('/updateQuantity',checkSessionAndBlocked,usercontroller.updateQuantity)
router.get("/getcartnumber/:userId",checkSessionAndBlocked,usercontroller.getcartnumber);
// router.get('/check-quantity',checkSessionAndBlocked, usercontroller.checkQuantity);

router.get("/profile/:userId",checkSessionAndBlocked, usercontroller.profile);
router.get("/profileedit/:id",checkSessionAndBlocked, usercontroller.profileedit);
router.post("/updateProfile/:id",checkSessionAndBlocked, usercontroller.updateProfile);

router.get("/checkout",checkSessionAndBlocked, usercontroller.checkout);
router.post("/checkout",checkSessionAndBlocked, usercontroller.checkoutpost);
router.get('/checkStock/:userId/:productId', usercontroller.checkStock);
router.post("/create-razorpay-order",checkSessionAndBlocked, usercontroller.createrazorpayorder)

router.post("/removeFromCart/:productId",checkSessionAndBlocked, usercontroller.removeFromCart)

router.get("/addAddress",checkSessionAndBlocked, usercontroller.addAddress)
router.post("/addAddress",checkSessionAndBlocked, usercontroller.addAddresspost)   
router.get("/addnewaddress",checkSessionAndBlocked, usercontroller.addnewaddress)
router.post("/addnewaddress",checkSessionAndBlocked, usercontroller.addnewaddresspost)

router.get("/order",checkSessionAndBlocked, usercontroller.order)
router.get("/orderhistory",checkSessionAndBlocked, usercontroller.orderhistory)
router.post('/cancel-order/:orderId',checkSessionAndBlocked, usercontroller.cancelOrder);
router.post('/initiate-return/:orderId', usercontroller.initiateReturn);

router.get("/changepass",checkSessionAndBlocked, usercontroller.changepass);
router.post('/changepass',checkSessionAndBlocked, usercontroller.changepasspost);


router.get("/wishlistPage",checkSessionAndBlocked, usercontroller.wishlistPage);
router.post('/wishlistPage',checkSessionAndBlocked,usercontroller.wishlistPagePost)
router.get('/wishlistInfo',checkSessionAndBlocked, usercontroller.wishlistInfo);
router.post('/wishlistRemove',checkSessionAndBlocked, usercontroller.removeProductFromWishlist);

router.get("/wallet",checkSessionAndBlocked, usercontroller.wallet);
router.post('/generate-razorpay-order', usercontroller.generateRazorpayOrder);
router.post('/verify-razorpay-payment', usercontroller.verifyRazorpayPayment);

router.get('/generate-invoice/:orderId',checkSessionAndBlocked, usercontroller.generateInvoice);

router.post('/createReferral', checkSessionAndBlocked, usercontroller.createReferral)

module.exports = router;
