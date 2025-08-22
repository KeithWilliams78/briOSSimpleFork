import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'writing')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  published: boolean
}

export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug: data.slug || slug,
          title: data.title || '',
          date: data.date || '',
          excerpt: data.excerpt || '',
          content,
          published: data.published !== false, // default to true
        }
      })
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))

    return allPostsData
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => post.published)
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const posts = getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error('Error finding post:', error)
    return null
  }
}
