export interface Bookmark {
  id: string
  title: string
  url: string
  host: string
  description?: string
  image?: string
  faviconUrl?: string
  tags: string[]
  createdAt: string
}

export const bookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'Claude Code Documentation',
    url: 'https://docs.anthropic.com/en/docs/claude-code',
    host: 'docs.anthropic.com',
    description:
      "Comprehensive documentation for Claude Code, Anthropic's official CLI for Claude AI assistance with coding tasks.",
    faviconUrl: 'https://docs.anthropic.com/favicon.ico',
    tags: ['AI', 'Development', 'Tools'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Next.js Documentation',
    url: 'https://nextjs.org/docs',
    host: 'nextjs.org',
    description:
      'The React framework for production - documentation for building full-stack web applications.',
    faviconUrl: 'https://nextjs.org/favicon.ico',
    tags: ['React', 'Framework', 'Web Development'],
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    host: 'tailwindcss.com',
    description:
      'A utility-first CSS framework for rapidly building custom user interfaces.',
    faviconUrl: 'https://tailwindcss.com/favicon.ico',
    tags: ['CSS', 'Design', 'Framework'],
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs/',
    host: 'typescriptlang.org',
    description:
      'The TypeScript handbook - a comprehensive guide to TypeScript for both beginners and experts.',
    faviconUrl: 'https://www.typescriptlang.org/favicon.ico',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'React Documentation',
    url: 'https://react.dev',
    host: 'react.dev',
    description:
      'The official React documentation - learn React from the ground up.',
    faviconUrl: 'https://react.dev/favicon.ico',
    tags: ['React', 'JavaScript', 'UI'],
    createdAt: '2024-01-11',
  },
  {
    id: '6',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    host: 'developer.mozilla.org',
    description:
      'The best resource for web developers, with comprehensive documentation on web technologies.',
    faviconUrl: 'https://developer.mozilla.org/favicon.ico',
    tags: ['Web Development', 'Reference', 'Documentation'],
    createdAt: '2024-01-10',
  },
]

export function getBookmarks() {
  return bookmarks.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getBookmarkById(id: string) {
  return bookmarks.find((bookmark) => bookmark.id === id)
}

export function getBookmarksByTag(tag: string) {
  return bookmarks.filter((bookmark) =>
    bookmark.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags() {
  const allTags = bookmarks.flatMap((bookmark) => bookmark.tags)
  return Array.from(new Set(allTags)).sort()
}
