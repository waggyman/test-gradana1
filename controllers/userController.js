const { body, validationResult } = require('express-validator')
const UserModel = require('../models/user');

module.exports = {
    refresh: async (req, res, next) => {
        try {
            const reqUser = JSON.parse(req.headers['x-userinfo']);
            const user = await UserModel.findById(reqUser._id);

            res.json(user.toJSON());   
        } catch (error) {
            return next(error);
        }
    },
    store: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const data = req.body;
            
            const payload = {
                name: data.name,
                email: data.email.toLowerCase(),
                phoneNumber: data.phone,
                password: data.password
            }

            const user = await UserModel.create(payload)
            res.json(user.toJSON())
        } catch (err) {
            if (err.code == 11000) {
                const invalids = Object.keys(err.keyPattern);
                return res.status(400).json({ errors: [ {param: invalids[0], msg: `${invalids[0]} already in use!`} ]})
            }

            return next(err)
        }
    },
    authenticate: async (req, res, next) => {
        const data = req.body;
        try {
            const user = await UserModel.findOne({email: data.email});
            if (!user) {
                res.status(400).json({error: true, message: "Your email or password may be incorrect!"});
            }

            user.comparePassword(data.password, (matchError, isMatch) => {
                if (matchError) {
                    res.status(400).json({error: true, message: "Your email or password may be incorrect!"});
                } else if (!isMatch) {
                    res.status(400).json({error: true, message: "Your email or password may be incorrect!"});
                } else {
                    res.json(user.toJSON());
                }
            })
        } catch (err) {
            return next(err);
        }
    },
    // VALIDATION
    validate: (method) => {
        switch (method) {
            case 'createUser': 
                return [ 
                    body('name', 'Name is required').exists(),
                    body('email', 'Invalid email').exists().isEmail(),
                    body('phone', 'Phone is required').exists(),
                    body('phone', 'Phone is invalid. It should be in 9 to 15 characters').isLength({min: 9, max: 15})
                ];
            break;
            case 'authenticate': 
                return [ 
                    body('username', 'Username is required').exists(),
                    body('password', 'Password is required').exists()
                ];
            break;
            default:
                break;
        }
    }
}