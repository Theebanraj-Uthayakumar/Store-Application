import type { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../../lib/mongodb.mjs'
import connectMongoDB from '../../../lib/mongodb'
import Product from '../../../models/Product'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB()
  
  const { method } = req

  console.log(method);

  try {
    switch (method) {
      case 'GET':
        try {
          const products = await Product.find({})
          res.status(200).json({ success: true, data: products })
        } catch (error) {
          console.error('Error fetching products:', error)
          res
            .status(500)
            .json({ success: false, error: 'Error fetching products' })
        }
        break
      case 'POST':
        try {
          const product = await Product.create(req.body)
          res.status(201).json({ success: true, data: product })
        } catch (error) {
          console.error('Error creating product:', error)
          res
            .status(400)
            .json({ success: false, error: 'Error creating product' })
        }
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({ success: false, error: 'Server Error' })
  }
}
