import stripe from 'stripe';

stripe(process.env.STRIPE_SECRET_KEY);

export const payment = async (req, res, next) => {
    const { amount, id } = req.body;
    try {
        await stripe.pay
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'this is description',
            payment_method: id,
            confirm: true,
        });
        res.json({
            message: 'Payment Successful',
            success: true,
        });
    } catch (error) {
        res.json({
            message: 'Payment Failed',
            success: false,
        });
    }
};
