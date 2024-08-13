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

const CreateProductPage = () => {
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
    <div style={styles.container}>
      <h1 style={styles.heading}>Create Product</h1>
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
        <button type='submit' style={styles.button}>
          Create Product
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: '#333'
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
    fontWeight: 'bold' as const,
    color: '#555'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
}

export default CreateProductPage
