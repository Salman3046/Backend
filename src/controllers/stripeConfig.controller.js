import { successResponse, errorResponse } from "../helpers/responce"
require('dotenv').config();

export const stripeKeys = async (req, res) => {
    try {
        let stripeKey;
        if (req.body.key === "test") {
            stripeKey = {
                STRIPE_CLIENT_SECRET: process.env.STRIPE_CLIENT_SECRET,
                STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
            };
        };
        if (req.body.key === "prod") {
            stripeKey = {
                STRIPE_CLIENT_SECRET: process.env.STRIPE_CLIENT_SECRET,
                STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
            };
        };
        successResponse(req, res, stripeKey);
    } catch (error) {
        return errorResponse(req, res, error)
    };
};