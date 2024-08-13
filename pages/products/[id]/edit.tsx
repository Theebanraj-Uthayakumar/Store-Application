import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { deleteProduct, fetchProductByID, updateProduct } from '@/services/api'
import styles from '../../../styles/EditPage.module.css'

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
      await updateProduct(product._id, formData)
      router.push('/')
    } catch (error) {
      setError('Error updating product. Please try again.')
      console.error('Error updating product:', error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit {product.name}</title>
      </Head>
      <h1 className={styles.title}>Edit Product</h1>
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
        <button type='submit' className={styles.submitButton}>
          Update Product
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string }
  try {
    const product = await fetchProductByID(id)
    return {
      props: {
        product: product.data
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      notFound: true
    }
  }
}
