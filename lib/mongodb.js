import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    })
    console.log('Connected to MongoDB.')
  } catch (error) {
    console.log('Error connecting to MongoDB:', error)
  }
}

export default connectMongoDB
