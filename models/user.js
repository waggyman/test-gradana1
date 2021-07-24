const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const TopUpHistories = new Schema({
    date: Date,
    value: String,
    historyType: {
        type: String,
        enum: ["INCOME", "OUTCOME"]
    }
})

const UserSchema = new Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    histories: [TopUpHistories]
});

UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
        
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
  })

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            return callback(null, isMatch)
        }
    })
}

module.exports = mongoose.model('user', UserSchema );