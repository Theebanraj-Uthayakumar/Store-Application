// pages/products/[id].tsx
import { GetServerSideProps } from 'next'
import axios from 'axios'

type Product = {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
}

type ProductProps = {
  product: Product
}

export default function ProductPage({ product }: ProductProps) {
  return (
    <div>
      <head>
        <title>{product.name}</title>
      </head>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string }

  try {
    const { data } = await axios.get(`http://localhost:3001/api/products/${id}`)
    return {
      props: {
        product: data.data
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      notFound: true
    }
  }
}
