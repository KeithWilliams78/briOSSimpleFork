import { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'

import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { withProviders } from '~/components/Providers/withProviders'
import { PostDetail } from '~/components/Writing/PostDetail'
import { PostsList } from '~/components/Writing/PostsList'
import { getAllPosts, getPostBySlug, type Post } from '~/lib/posts'

interface WritingPostPageProps {
  post: Post
  allPosts: Post[]
}

function WritingPostPage({ post, allPosts }: WritingPostPageProps) {
  return <PostDetail post={post} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      allPosts,
    },
  }
}

WritingPostPage.getLayout = withProviders(function getLayout(page) {
  const { allPosts } = page.props
  return (
    <SiteLayout>
      <ListDetailView
        list={<PostsList posts={allPosts} />}
        hasDetail
        detail={page}
      />
    </SiteLayout>
  )
})

export default WritingPostPage
