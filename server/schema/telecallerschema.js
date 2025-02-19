const mongoose = require("mongoose");

const telecallerschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', 
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["telecaller"], 
        default: "telecaller",  
        required: true
    },
    username: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
        default: "active"
    },
    number: {
        type: Number
    },
    address: {
        type: String
    },
    leads: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Lead"
        }
    ],

    /** OVERALL CALL STATS **/
    totalcalls: {
        type: Number,
        default: 0
    },
    answeredcalls: {
        type: Number,
        default: 0
    },
    notansweredcalls: {
        type: Number,
        default: 0
    },
    confirmed: {
        type: Number,
        default: 0
    },

    /** DAILY CALL STATS **/
    dailyStats: [
        {
            date: {
                type: String, // Store date as YYYY-MM-DD for easy lookup
                required: true
            },
            totalcalls: {
                type: Number,
                default: 0
            },
            answeredcalls: {
                type: Number,
                default: 0
            },
            notansweredcalls: {
                type: Number,
                default: 0
            },
            confirmed: {
                type: Number,
                default: 0
            }
        }
    ],

    /** CALL HISTORY **/
    history: [
        {
            leadId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Lead",
                required: true
            },
            action: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            notes: {
                type: String
            },
            callbackTime: {
                type: Date,
            },
            callbackScheduled: {
                type: Boolean,
                default: false,
            },
        }
    ]
});

module.exports = telecallerschema;
