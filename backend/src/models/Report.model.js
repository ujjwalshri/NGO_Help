import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    ngoId: {
        type: Number,
        required: [true, 'NGO ID is required']
    },
    month: {
        type: String,
        required: [true, 'Month is required'],
        validate: {
            validator: function(v) {
                return /^(January|February|March|April|May|June|July|August|September|October|November|December)$/.test(v);
            },
            message: props => `${props.value} is not a valid month!`
        }
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [2023, 'Year cannot be less than 2023'],
        max: [2030, 'Year cannot be greater than 2030'],
        validate: {
            validator: function(v) {
                return Number.isInteger(v);
            },
            message: props => `${props.value} is not a valid year!`
        }
    },
    peopleHelped: {
        type: Number,
        required: [true, 'Number of people helped is required'],
        min: [0, 'People helped cannot be negative']
    },
    eventsConducted: {
        type: Number,
        required: [true, 'Number of events conducted is required'],
        min: [0, 'Number of events cannot be negative']
    },
    fundsUtilized: {
        type: Number,
        required: [true, 'Funds utilized is required'],
        min: [0, 'Funds utilized cannot be negative']
    }
}, {
    timestamps: true
});

// Add compound index for month and year to prevent duplicate reports
reportSchema.index({ ngoId: 1, month: 1, year: 1 }, { unique: true });

const Report = mongoose.model('Report', reportSchema);

export default Report;

