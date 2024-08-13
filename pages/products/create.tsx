import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/CreateProduct.module.css'
import { createProduct } from '@/services/api'

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

    // Basic validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.imageUrl ||
      !formData.category ||
      !formData.stock
    ) {
      setError('Please fill in all fields.')
      return
    }

    try {
      await createProduct(formData)
      router.push('/')
    } catch (error) {
      setError('Error creating product. Please try again.')
      console.error('Error creating product:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create Product</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor='name' className={styles.label}>
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
          className={styles.input}
        />
        <label htmlFor='description' className={styles.label}>
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
          className={styles.input}
        />
        <label htmlFor='price' className={styles.label}>
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
          className={styles.input}
        />
        <label htmlFor='imageUrl' className={styles.label}>
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
          className={styles.input}
        />
        <label htmlFor='category' className={styles.label}>
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
          className={styles.input}
        />
        <label htmlFor='stock' className={styles.label}>
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
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          Create Product
        </button>
      </form>
    </div>
  )
}

export default CreateProductPage
