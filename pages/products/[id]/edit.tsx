// pages/products/[id]/edit.tsx
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

type EditProductProps = {
  product: {
    _id: string
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    stock: number
  }
}

export default function EditProductPage({ product }: EditProductProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    stock: product.stock
  })

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try {
      await axios.put(`/api/products/${product._id}`, formData)
      router.push('/')
    } catch (error) {
      setError('Error updating product. Please try again.')
      console.error('Error updating product:', error)
    }
  }

  return (
    <div>
      <head>
        <title>Edit {product.name}</title>
      </head>
      <h1>Edit Product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          id='description'
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          id='price'
          name='price'
          placeholder='Price'
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label htmlFor='imageUrl'>Image URL</label>
        <input
          type='text'
          id='imageUrl'
          name='imageUrl'
          placeholder='Image URL'
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          id='category'
          name='category'
          placeholder='Category'
          value={formData.category}
          onChange={handleChange}
          required
        />
        <label htmlFor='stock'>Stock</label>
        <input
          type='number'
          id='stock'
          name='stock'
          placeholder='Stock'
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <button type='submit'>Update Product</button>
      </form>
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
