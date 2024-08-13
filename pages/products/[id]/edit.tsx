// pages/products/[id]/edit.tsx
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
    <div style={styles.container}>
      <Head>
        <title>Edit {product.name}</title>
      </Head>
      <h1 style={styles.title}>Edit Product</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor='name' style={styles.label}>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label htmlFor='description' style={styles.label}>
          Description
        </label>
        <input
          type='text'
          id='description'
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label htmlFor='price' style={styles.label}>
          Price
        </label>
        <input
          type='number'
          id='price'
          name='price'
          placeholder='Price'
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label htmlFor='imageUrl' style={styles.label}>
          Image URL
        </label>
        <input
          type='text'
          id='imageUrl'
          name='imageUrl'
          placeholder='Image URL'
          value={formData.imageUrl}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label htmlFor='category' style={styles.label}>
          Category
        </label>
        <input
          type='text'
          id='category'
          name='category'
          placeholder='Category'
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label htmlFor='stock' style={styles.label}>
          Stock
        </label>
        <input
          type='number'
          id='stock'
          name='stock'
          placeholder='Stock'
          value={formData.stock}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type='submit' style={styles.submitButton}>
          Update Product
        </button>
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

const styles = {
  container: {
    maxWidth: '800px',
    margin: '60px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600' as const,
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center' as const
  },
  error: {
    color: 'red',
    textAlign: 'center' as const,
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  label: {
    fontSize: '16px',
    fontWeight: '500' as const,
    color: '#333'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box' as const,
    width: '100%'
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer' as const,
    transition: 'background-color 0.3s ease',
    alignSelf: 'center' as const
  },
  submitButtonHover: {
    backgroundColor: '#005bb5'
  }
}
