import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_KEY);
    console.log("sucessfully connect to DB");
    
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
