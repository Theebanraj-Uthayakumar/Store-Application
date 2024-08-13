import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { deleteProduct, fetchProductByID } from '@/services/api'
import styles from '../../../styles/ProductPage.module.css'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id)
      router.push('/')
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className={styles.gridContainer}>
        <div className={styles.imageContainer}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.contentContainer}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.details}>
            <p className={styles.detailItem}>
              Category:{' '}
              <span className={styles.detailValue}>{product.category}</span>
            </p>
            <p className={styles.detailItem}>
              Price:{' '}
              <span className={styles.detailValue}>
                ${product.price.toFixed(2)}
              </span>
            </p>
            <p className={styles.detailItem}>
              Stock: <span className={styles.detailValue}>{product.stock}</span>
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Link
              href={`/products/${product._id}/edit`}
              className={styles.editButton}
            >
              Edit Product
            </Link>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
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
