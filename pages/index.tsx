import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { fetchProducts } from '../services/api'
import styles from '../styles/Home.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.heading}>Product List</h1>
      <div className={styles.productList}>
        {products.map(product => (
          <Link
            href={`/products/${product._id}/${product.name}`}
            key={product._id}
            passHref
          >
            <div className={styles.productCard}>
              <img
                className={styles.productImage}
                src={product.imageUrl}
                alt={product.name}
              />
              <div className={styles.productContent}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productCategory}>{product.category}</p>
                <p className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href='/products/create' passHref>
        <p className={styles.createLink}>Create New Product</p>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchProducts()

  return {
    props: {
      products
    }
  }
}
