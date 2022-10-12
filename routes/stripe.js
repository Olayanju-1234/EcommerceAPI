const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Payment Route
router.post('/payment', (req, res) => {
    stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

module.exports = router