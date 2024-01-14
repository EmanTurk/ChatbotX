import mongoose from mongoose


const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Should add a name"]
    },
    description: {
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    volunteersNeeded: Number,
    volunteersAttending: Number,
    date: {
        type: Date
    },
    location: {
        type: {
            latitude: Number,
            longitude: Number    
        },
        required: true
    },
    images: [{
        fileName: String
        // We could add a description to each image
    }],
    volunteers: [{
        type: String
    }]
});

const Activity = mongoose.model('Activity', ActivitySchema);
export default Activity