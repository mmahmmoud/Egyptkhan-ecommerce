import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Query to get all categories
export async function getAllCategories() {
  return client.fetch(`*[_type == "productCategory"] {
    _id,
    title,
    slug,
    description
  }`)
}

// Query to get a category by slug
export async function getCategoryBySlug(slug: string) {
  return client.fetch(`*[_type == "productCategory" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  }`, { slug })
}

// Query to get all products
export async function getAllProducts() {
  return client.fetch(`*[_type == "product"] {
    _id,
    title,
    description,
    price,
    image,
    category->{
      _id,
      title,
      slug
    }
  }`)
}

// Query to get a product by ID
export async function getProductById(id: string) {
  return client.fetch(`*[_type == "product" && _id == $id][0] {
    _id,
    title,
    description,
    price,
    image,
    category->{
      _id,
      title,
      slug
    }
  }`, { id })
}

// Query to get products by category slug
export async function getProductsByCategorySlug(slug: string) {
  return client.fetch(`*[_type == "product" && category->slug.current == $slug] {
    _id,
    title,
    description,
    price,
    image,
    category->{
      _id,
      title,
      slug
    }
  }`, { slug })
}

// Query to search products
export async function searchProducts(query: string) {
  const searchQuery = `*${query}*`;
  return client.fetch(`*[_type == "product" && (
    title match $searchQuery || 
    description match $searchQuery
  )] {
    _id,
    title,
    description,
    price,
    image,
    category->{
      _id,
      title,
      slug
    }
  }`, { searchQuery })
}
