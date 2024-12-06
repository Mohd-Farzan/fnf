const paypal = require('../../helpers/paypal');
const orderModel = require('../../models/Order');
const cartModel=require('../../models/cartModel')

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId,
        } = req.body;

        // Calculate total amount from cart items
        const calculatedTotal = cartItems.reduce(
            (acc, item) => acc + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
            0
        ).toFixed(2);

        console.log("Calculated Total:", calculatedTotal);

        // Create PayPal payment JSON
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel',
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: (item.salePrice > 0 ? item.salePrice : item.price).toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: 'USD',
                        total: calculatedTotal, // Use the server-calculated total
                    },
                    description: 'Your purchase description',
                },
            ],
        };

        // Create PayPal payment
        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: 'Error while creating PayPal payment',
                });
            } else {
                // Save the order in the database
                const newlyCreatedOrder = new orderModel({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmmount: calculatedTotal, // Store the calculated total
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                    cartId
                });

                

                await newlyCreatedOrder.save();

                // Extract approval URL from PayPal response
                const approvalURL = paymentInfo.links.find((link) => link.rel === 'approval_url').href;
                

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id,
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Error',
        });
    }
};

const capturePayment = async (req, res) => {
    try {
        const{paymentId,payerId,orderId}=req.body;
        let order=await orderModel.find(orderId);
        if(!order){
            return res.status(404).json({
                success:false,
                message:'order can not be found'
            })
        }
        order.paymentStatus='Paid';
        order.orderStatus='confirmed';
        order.paymentId=paymentId;
        order.payerId=payerId;
        const getCartId=order.cartId
        await cartModel.findByIdAndDelete(getCartId)
        await order.save()
        res.status(200).json({
            success:true,
            message:'order updated successfully',
            data:order
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Error',
        });
    }
};

module.exports = { createOrder, capturePayment };
