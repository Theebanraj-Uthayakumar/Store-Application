// pages/index.tsx
import { GetServerSideProps } from 'next'
import Link from 'next/link'
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

type HomeProps = {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <Link href={`/products/${product._id}/${product.name}`}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href='/products/create'>
        Create New Product
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3001/api/products')

  return {
    props: {
      products: data.data
    }
  }
}