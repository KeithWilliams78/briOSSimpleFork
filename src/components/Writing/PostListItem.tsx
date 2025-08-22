import * as React from 'react'

import { ListItem } from '~/components/ListDetail/ListItem'
import { Post } from '~/lib/posts'
import { timestampToCleanTime } from '~/lib/transformers'

interface Props {
  post: Post
  active: boolean
}

export const PostListItem = React.memo<Props>(({ post, active }) => {
  const publishedAt = post.date
    ? timestampToCleanTime({ timestamp: post.date })
    : null
  return (
    <ListItem
      key={post.slug}
      href="/writing/[slug]"
      as={`/writing/${post.slug}`}
      title={post.title}
      description={post.excerpt}
      byline={publishedAt ? publishedAt.formatted : 'Draft'}
      active={active}
    />
  )
})
