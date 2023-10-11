const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const Order = require("../models/Order");
const stripe = require('stripe')(process.env.SECRETKEY)
dotenv.config();

//@desc Create Order
//@route
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const {
    canteen,
    orderItems,
    paymentMethod,
    paymentResult,
    totalPrice,
    isPaid,
    //paidAt,
    isDelivered,
    //deliveredAt,
  } = req.body;
  try {
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items!" });
    } else {
      const order = new Order({
        user: userId,
        canteen: canteen,
        orderItems: orderItems,
        paymentMethod: paymentMethod,
        paymentResult: paymentResult,
        totalPrice: totalPrice,
        isPaid: isPaid,
        //paidAt,
        isDelivered: isDelivered
        //deliveredAt,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .json({ success: true, message: "Order created!", createdOrder });
    }
  } catch (error) {
    res.status(500).json({ message: "catch" });
  }
};

//@desc Get Order by Id(Used by both canteen admin and user)
//@route GET api/orders/:id
const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error." });
  }
};

//@desc Update Order to delivered(Used by canteen admin)
//@route PUT
const updateOrderToDelivered = async(req, res)=>{
    const order = await Order.findById(req.params.id)
    try {
        if(order) {
            order.isDelivered = true
            order.deliveredAt = Date.now()
    
            const updatedOrder = await order.save()
            res.status(200).json({ message: 'Order updated!', updatedOrder})
        }
        else{
            return res.status(404).json({ message: 'Order not found!'})
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server error!'})
    }
    
}

//@desc Update Order to paid(used by canteen admin)
//@route PUT
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save()
      res.status(200).json({ success: true, message: 'Order updated!', updatedOrder})
    }
    else{
        res.status(404).json({ error: 'Order not found!'})
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error!'})
  }
};


//@desc get all user's orders(Used by admin)
//@route GET api/orders/myorder
const getMyOrders = async(req,res)=>{
    const userId = req.user.id
    console.log(userId)
    // try {
        const orders = await Order.find({userId})
        if(orders){
            return res.status(200).json(orders)
        }
        else{
            return res.status(404).json({ message: 'No orders found!'})
        }
    // } catch (error) {
    //     return res.status(500).json({ error: 'Internal server error!'})
    // }
}




const checkout_web = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      orderItems,
      paymentMethod,
      paymentResult,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items!" });
    } else {
      const session = await stripe.checkout.sessions.create({
        line_items: orderItems,
        mode: "payment",
        success_url: "",
        cancel_url: "",
      });
      if (session) {
        const order = new Order({
          userId,
          orderItems,
          paymentMethod,
          paymentResult,
          totalPrice,
          isPaid,
          paidAt,
          isDelivered,
          deliveredAt,
        });
        const createdOrder = await order.save();
        res
          .status(201)
          .json({ success: true, message: "Order created!", createdOrder });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const checkout_native = async (req, res) => {
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-08-16" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "inr",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  if (paymentIntent) {
    const order = new Order({
      userId,
      orderItems,
      paymentMethod,
      paymentResult,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    });
    const createdOrder = await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order created!", createdOrder });
  }
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.PUBLISHABLE_KEY
  });
};

const checkout = async(req, res)=>{
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true,
              },
        });
        res.json({ paymentIntent: paymentIntent.client_secret})
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, checkout_web, checkout_native, checkout}
