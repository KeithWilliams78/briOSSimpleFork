import { useRouter } from 'next/router'
import * as React from 'react'

import { ListContainer } from '~/components/ListDetail/ListContainer'
import { type Post } from '~/lib/posts'

import { PostListItem } from './PostListItem'
import { WritingTitlebar } from './WritingTitlebar'

export const WritingContext = React.createContext({
  filter: 'published',
  setFilter: (filter: string) => {},
})

interface PostsListProps {
  posts: Post[]
}

export function PostsList({ posts }: PostsListProps) {
  const router = useRouter()
  const [filter, setFilter] = React.useState('published')
  let [scrollContainerRef, setScrollContainerRef] = React.useState(null)

  // Filter posts based on the current filter
  const filteredPosts = React.useMemo(() => {
    return filter === 'published'
      ? posts.filter((post) => post.published)
      : posts.filter((post) => !post.published)
  }, [posts, filter])

  const defaultContextValue = {
    filter,
    setFilter,
  }

  return (
    <WritingContext.Provider value={defaultContextValue}>
      <ListContainer data-cy="posts-list" onRef={setScrollContainerRef}>
        <WritingTitlebar scrollContainerRef={scrollContainerRef} />

        <div className="lg:space-y-1 lg:p-3">
          {filteredPosts.map((post) => {
            const active = router.query?.slug === post.slug

            return <PostListItem key={post.slug} post={post} active={active} />
          })}
        </div>
      </ListContainer>
    </WritingContext.Provider>
  )
}
