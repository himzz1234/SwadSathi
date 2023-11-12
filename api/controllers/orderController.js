const { body, validationResult } = require("express-validator");
const Razorpay = require('razorpay')
const dotenv = require("dotenv");
const Order = require("../models/Order");
const stripe = require("stripe")(process.env.SECRETKEY);
dotenv.config();

//@desc Create Order
//@route
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const {
    canteen,
    orderItems,
    totalPrice,
    isPaid,
    //paidAt,
    status,
    //deliveredAt,
  } = req.body;
  try {
    if (!orderItems.length) {
      return res.status(400).json({ message: "No order items!" });
    } else {
      const order = new Order({
        user: userId,
        canteen: canteen,
        orderItems: orderItems,
        totalPrice: totalPrice,
        isPaid: isPaid,
        status: status,
      });

      const createdOrder = await order
        .save()
        .then((order) =>
          order.populate([{ path: "orderItems.product" }, { path: "user" }])
        )
        .then((order) => order);

      res.status(201).json({
        success: true,
        message: "Order created!",
        details: createdOrder,
      });
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
    const order = await Order.findById(orderId)
      .populate({ path: "orderItems.product" })
      .exec();
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error." });
  }
};

//@desc Update Order By Id(Used by both canteen admin and user)
//@route GET api/orders/:id
const updateOrderDetails = async (req, res) => {
  const order = await Order.findById(req.params.id);
  try {
    if (req.body.status && req.body.status == "Preparing") {
      const currentDate = new Date();

      const startTime = new Date(currentDate);
      startTime.setHours(0, 0, 0, 0);

      const endTime = new Date(currentDate);
      endTime.setHours(23, 59, 59, 999);
      const total = (
        await Order.find({
          status: { $in: ["Ready", "Preparing", "Delivered"] },
          canteen: order.canteen,
          createdAt: {
            $gte: startTime,
            $lte: endTime,
          },
        })
      ).length;

      req.body = { ...req.body, tokenNumber: total + 1 };
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (updatedOrder) {
      return res
        .status(200)
        .json({ message: "Order Details Updated!", order: updatedOrder });
    } else return res.status(404).json({ message: "Order Not Updated!" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error!" });
  }
};

//@desc Update Order to delivered(Used by canteen admin)
//@route PUT
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  try {
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json({ message: "Order updated!", updatedOrder });
    } else {
      return res.status(404).json({ message: "Order not found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error!" });
  }
};

//@desc Update Order to paid(used by canteen admin)
//@route PUT
const updateOrderToPaid = async (req, res) => {
  try {
    a;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      res
        .status(200)
        .json({ success: true, message: "Order updated!", updatedOrder });
    } else {
      res.status(404).json({ error: "Order not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

//@desc update

//@desc get all user's orders(Used by admin)
//@route GET api/orders/myorder
const getMyOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate(["orderItems.product", "canteen"])
      .exec();
    if (orders) {
      return res.status(200).json({ orders });
    } else {
      return res.status(404).json({ message: "No orders found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const getCanteenOrders = async (req, res) => {
  const canteenId = req.params.id;
  try {
    const orders = await Order.find({ canteen: canteenId })
      .populate("orderItems.product")
      .populate({
        path: "user",
        select: ["name"],
      })
      .sort({ createdAt: -1 })
      .exec();
    if (orders) {
      console.log(orders);
      return res.status(200).json(orders);
    } else {
      return res.status(404).json({ message: "No orders found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Interval server error!" });
  }
};

// const checkout_web = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
//       orderItems,
//       paymentMethod,
//       paymentResult,
//       totalPrice,
//       isPaid,
//       paidAt,
//       isDelivered,
//       deliveredAt,
//     } = req.body;
//     if (orderItems && orderItems.length === 0) {
//       return res.status(400).json({ message: "No order items!" });
//     } else {
//       const session = await stripe.checkout.sessions.create({
//         line_items: orderItems,
//         mode: "payment",
//         success_url: "",
//         cancel_url: "",
//       });
//       if (session) {
//         const order = new Order({
//           userId,
//           orderItems,
//           paymentMethod,
//           paymentResult,
//           totalPrice,
//           isPaid,
//           paidAt,
//           isDelivered,
//           deliveredAt,
//         });
//         const createdOrder = await order.save();
//         res
//           .status(201)
//           .json({ success: true, message: "Order created!", createdOrder });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server error." });
//   }
// };

// const checkout_native = async (req, res) => {
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     { customer: customer.id },
//     { apiVersion: "2023-08-16" }
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: "inr",
//     customer: customer.id,
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   if (paymentIntent) {
//     const order = new Order({
//       userId,
//       orderItems,
//       paymentMethod,
//       paymentResult,
//       totalPrice,
//       isPaid,
//       paidAt,
//       isDelivered,
//       deliveredAt,
//     });
//     const createdOrder = await order.save();
//     res
//       .status(201)
//       .json({ success: true, message: "Order created!", createdOrder });
//   }
//   res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//     publishableKey: process.env.PUBLISHABLE_KEY,
//   });
// };

const checkout = async (req, res)=>{
  const {totalAmount} = req.body
  const customer = new Razorpay({
    key_id: 'rzp_test_PcxhieGrBs8lON',
    key_secret: '83Bd4X8JzoWps23LubCHKlgi'
  })
  const options = {
    amount: totalAmount,
    currency: "INR",
    receipt: "order_rcptid_11"
  }
customer.orders.create(options, function(err, order){
  res.send(order);
})
}

// const checkout = async (req, res) => {
//   const customer = await stripe.customers.create();
//   const ephemeralKey = await stripe.ephemeralKeys.create(
//     { customer: customer.id },
//     { apiVersion: "2023-08-16" }
//   );
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: "eur",
//     customer: customer.id,
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.json({
//     paymentIntent: paymentIntent.client_secret,
//     ephemeralKey: ephemeralKey.secret,
//     customer: customer.id,
//     publishableKey: process.env.PUBLISHABLEKEY,
//   });
// };

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getCanteenOrders,
  //checkout_web,
  //checkout_native,
  checkout,
  updateOrderDetails,
};
