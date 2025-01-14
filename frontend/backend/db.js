import mongoose from "mongoose";

export const connectDB = async () => {
   try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('connected to db')
    const food_items =await  mongoose.connection.db.collection("food_items").find({}).toArray()
    const food_category = await mongoose.connection.db.collection("food_category").find({}).toArray()
   
    return {food_category: food_category, food_items: food_items}
} catch (err) {
    console.error("Error fetching food items:", err);
}

}

