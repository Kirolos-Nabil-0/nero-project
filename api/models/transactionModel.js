import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },




});

export const Transaction = mongoose.model('transaction', transactionSchema);