import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
      try{
           const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
              console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
             // console.log(`Connected at PORT: ${process.env.PORT}`);
      }catch(error){
        console.error(`MongoDB connection Failed: ${error.message}`);
        process.exit(1);
      }
}

export default connectDB;