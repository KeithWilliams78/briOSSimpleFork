import * as React from 'react'

import { Detail } from '~/components/ListDetail/Detail'
import { TitleBar } from '~/components/ListDetail/TitleBar'
import { MarkdownRenderer } from '~/components/MarkdownRenderer'
import { Post } from '~/lib/posts'
import { timestampToCleanTime } from '~/lib/transformers'

import { PostSEO } from './PostSEO'

interface PostDetailProps {
  post: Post
}

export function PostDetail({ post }: PostDetailProps) {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef(null)
  const publishedAt = post.date
    ? timestampToCleanTime({ timestamp: post.date })
    : null
  return (
    <>
      <PostSEO post={post} />
      <Detail.Container data-cy="post-detail" ref={scrollContainerRef}>
        <TitleBar
          backButton
          globalMenu={false}
          backButtonHref={'/writing'}
          magicTitle
          title={post.title}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />

        <Detail.ContentContainer>
          <Detail.Header>
            <Detail.Title ref={titleRef}>{post.title}</Detail.Title>
            <span
              title={publishedAt?.raw || post.date}
              className="text-tertiary inline-block leading-snug"
            >
              {publishedAt?.formatted || post.date}
            </span>
          </Detail.Header>

          <MarkdownRenderer children={post.content} className="prose mt-8" />

          {/* bottom padding to give space between post content and comments */}
          <div className="py-6" />
        </Detail.ContentContainer>
      </Detail.Container>
    </>
  )
}
