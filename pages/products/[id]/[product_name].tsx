// pages/products/[id].tsx
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

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
    <div style={styles.container}>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div style={styles.gridContainer}>
        <div style={styles.imageContainer}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={styles.productImage}
          />
        </div>
        <div style={styles.contentContainer}>
          <h1 style={styles.productName}>{product.name}</h1>
          <p style={styles.productDescription}>{product.description}</p>
          <div style={styles.details}>
            <p style={styles.detailItem}>
              Category:{' '}
              <span style={styles.detailValue}>{product.category}</span>
            </p>
            <p style={styles.detailItem}>
              Price:{' '}
              <span style={styles.detailValue}>
                ${product.price.toFixed(2)}
              </span>
            </p>
            <p style={styles.detailItem}>
              Stock: <span style={styles.detailValue}>{product.stock}</span>
            </p>
          </div>
          <Link href={`/products/${product._id}/edit`}>
            <span style={styles.editButton}>Edit Product</span>
          </Link>
        </div>
      </div>
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
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '20px',
    alignItems: 'start'
  },
  imageContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  productImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover' as const
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center'
  },
  productName: {
    fontSize: '32px',
    fontWeight: '600' as const,
    color: '#333',
    margin: '0 0 10px'
  },
  productDescription: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  details: {
    fontSize: '18px',
    color: '#333'
  },
  detailItem: {
    marginBottom: '10px'
  },
  detailValue: {
    fontWeight: '600' as const,
    color: '#0070f3'
  },
  editButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    transition: 'background-color 0.3s ease'
  },
  editButtonHover: {
    backgroundColor: '#005bb5'
  }
}
