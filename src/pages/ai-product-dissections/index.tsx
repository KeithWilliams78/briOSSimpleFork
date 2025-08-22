import { NextSeo } from 'next-seo'
import * as React from 'react'

import { AIProductDissectionList } from '~/components/AIProductDissections/AIProductDissectionList'
import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { withProviders } from '~/components/Providers/withProviders'
import routes from '~/config/routes'

function AIProductDissectionsPage() {
  return (
    <NextSeo
      title={routes.aiProductDissections.seo.title}
      description={routes.aiProductDissections.seo.description}
      openGraph={routes.aiProductDissections.seo.openGraph}
    />
  )
}

AIProductDissectionsPage.getLayout = withProviders(function getLayout(page) {
  return (
    <SiteLayout>
      <ListDetailView
        list={<AIProductDissectionList />}
        hasDetail={false}
        detail={page}
      />
    </SiteLayout>
  )
})

export default AIProductDissectionsPage
