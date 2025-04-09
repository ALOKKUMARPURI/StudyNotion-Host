const Razorpay = require("razorpay");

//console.log("Razorpay Key ID:", process.env.REACT_APP_RAZORPAY_KEY);
//console.log("Razorpay Key Secret:", process.env.RAZORPAY_SECRET ? "Present" : "Missing"); // Security check

exports.instance = new Razorpay({
    key_id: process.env.REACT_APP_RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});