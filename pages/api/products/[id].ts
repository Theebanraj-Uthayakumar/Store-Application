import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '../../../lib/mongodb'
import Product from '../../../models/Product'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id }
  } = req

  await connectMongoDB()

  console.log(method);

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id)
        if (!product) {
          return res
            .status(404)
            .json({ success: false, error: 'Product not found' })
        }
        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' })
      }
      break
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!product) {
          return res
            .status(404)
            .json({ success: false, error: 'Product not found' })
        }
        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Bad Request' })
      }
      break
    case 'DELETE':
      try {
        const deletedProduct = await Product.deleteOne({ _id: id })
        if (!deletedProduct) {
          return res
            .status(404)
            .json({ success: false, error: 'Product not found' })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
