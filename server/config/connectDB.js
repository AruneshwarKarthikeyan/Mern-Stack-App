import mongoose from "mongoose";

// database connection
const connect_to_mongo_db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("error connecting to mongo db: " + error);
    }
}

export default connect_to_mongo_db;
