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
    <div style={styles.container}>
      <h1 style={styles.heading}>Product List</h1>
      <div style={styles.productList}>
        {products.map(product => (
          <Link
            href={`/products/${product._id}/${product.name}`}
            key={product._id}
            style={{ textDecoration: 'none' }}
          >
            <span>
              <div style={styles.productCard}>
                <img
                  style={styles.productImage}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div style={styles.productContent}>
                  <h2 style={styles.productName}>{product.name}</h2>
                  <p style={styles.productCategory}>{product.category}</p>
                  <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
                </div>
              </div>
            </span>
          </Link>
        ))}
      </div>
      <Link href='/products/create'>
        <p style={styles.createLink}>Create New Product</p>
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

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '40px'
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    cursor: 'pointer'
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'contain' as const
  },
  productContent: {
    padding: '15px'
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    margin: '10px 0 5px',
    color: '#333'
  },
  productCategory: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '10px'
  },
  productPrice: {
    fontSize: '16px',
    color: '#0070f3',
    fontWeight: 'bold' as const
  },
  createLink: {
    textAlign: 'center' as const,
    fontSize: '18px',
    color: '#0070f3',
    marginTop: '40px',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  },
  createLinkHover: {
    color: '#005bb5'
  }
}
