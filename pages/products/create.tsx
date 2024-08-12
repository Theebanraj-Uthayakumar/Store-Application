// pages/products/create.tsx
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

type FormData = {
  name: string
  description: string
  price: string
  imageUrl: string
  category: string
  stock: string
}

export default function CreateProductPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
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
      await axios.post('/api/products', formData)
      router.push('/')
    } catch (error) {
      setError('Error creating product. Please try again.')
      console.error('Error creating product:', error)
    }
  }

  return (
    <div>
      <h1>Create Product</h1>
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
        <button type='submit'>Create Product</button>
      </form>
    </div>
  )
}
