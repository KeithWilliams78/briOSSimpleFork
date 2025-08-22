import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'

import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { withProviders } from '~/components/Providers/withProviders'
import { PostsList } from '~/components/Writing/PostsList'
import routes from '~/config/routes'
import { getAllPosts, type Post } from '~/lib/posts'

interface WritingPageProps {
  posts: Post[]
}

function WritingPage({ posts }: WritingPageProps) {
  return (
    <NextSeo
      title={routes.writing.seo.title}
      description={routes.writing.seo.description}
      openGraph={routes.writing.seo.openGraph}
    />
  )
}

WritingPage.getLayout = withProviders(function getLayout(page) {
  const { posts } = page.props
  return (
    <SiteLayout>
      <ListDetailView
        list={<PostsList posts={posts} />}
        hasDetail={false}
        detail={page}
      />
    </SiteLayout>
  )
})

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default WritingPage
