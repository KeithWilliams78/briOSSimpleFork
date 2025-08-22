import { NextSeo } from 'next-seo'
import * as React from 'react'
import removeMd from 'remove-markdown'

import { AIProductDissectionDetail } from '~/components/AIProductDissections/AIProductDissectionDetail'
import { AIProductDissectionList } from '~/components/AIProductDissections/AIProductDissectionList'
import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { Detail } from '~/components/ListDetail/Detail'
import { withProviders } from '~/components/Providers/withProviders'
import { baseUrl } from '~/config/seo'
import designDetailsPosts from '~/data/aiProductDissections'
import { DesignDetailsPost } from '~/data/aiProductDissections'

interface Props {
  post: DesignDetailsPost
}

function AIProductDissectionPage({ post }: Props) {
  if (!post) return <Detail.Null />

  if (post) {
    return (
      <>
        <NextSeo
          title={`${post.title} · AI Product Dissections`}
          description={post.description}
          openGraph={{
            url: `${baseUrl}/ai-product-dissections/${post.slug}`,
            title: post.title,
            description: removeMd(post.description),
            site_name: 'AI Product Dissections',
            images: [
              {
                url: `${baseUrl}/static/og/ai-product-dissections.png`,
                alt: 'AI Product Dissections',
              },
            ],
          }}
        />

        <AIProductDissectionDetail post={post} />
      </>
    )
  }

  return null
}

export async function getStaticPaths() {
  const paths = designDetailsPosts.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      post: designDetailsPosts.find((post) => post.slug === slug) || null,
    },
  }
}

AIProductDissectionPage.getLayout = withProviders(function getLayout(page) {
  return (
    <SiteLayout>
      <ListDetailView
        list={<AIProductDissectionList />}
        hasDetail
        detail={page}
      />
    </SiteLayout>
  )
})

export default AIProductDissectionPage
