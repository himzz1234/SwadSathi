const dotenv = require("dotenv");
const Order = require("../models/Order");
const stripe = require("stripe")(
  "sk_test_51JbPb8SAyLsJj9bXPrPQlmesP7UMMFJZuO5CG4ZB7eOCYBi8Ako78OgGdk7d7h7KSjQTS0eikT3gCFfH5757bZoM00j7aEBdoH"
);

const moment = require("moment");
dotenv.config();
const mongoose = require("mongoose");
const Agenda = require("@hokify/agenda").Agenda;

const agenda = new Agenda({
  mongo: mongoose.connection,
});

agenda.define("decline pending orders", async (job, done) => {
  const date = moment().subtract(5, "minutes");

  await Order.updateMany(
    {
      createdAt: { $lte: date },
      status: "Pending",
    },
    { status: "Declined" }
  );

  done();
});

agenda.on("ready", async () => {
  await agenda.every("1 minute", "decline pending orders");
  await agenda.start();
});

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
      console.log(orders);
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

const orderPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.total * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getCanteenOrders,
  updateOrderDetails,
  orderPayment,
};
