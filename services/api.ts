import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchProducts = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/products`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch products', error)
    throw error
  }
}

export const fetchProductByID = async (id: string) => {
  try {
    const { data } = await api.get(`/products/${id}`)
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const createProduct = async (productData: any) => {
  try {
    const { data } = await api.post('/products', productData)
    return data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const updateProduct = async (id: string, productData: any) => {
  try {
    const { data } = await api.put(`/products/${id}`, productData)
    return data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await api.delete(`/products/${id}`)
    return data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}
