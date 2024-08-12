// models/Product.ts
import mongoose, { Document, Schema } from 'mongoose'

interface IProduct extends Document {
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema)
