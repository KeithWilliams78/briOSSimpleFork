import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'

import { BookmarksList } from '~/components/Bookmarks/BookmarksList'
import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { withProviders } from '~/components/Providers/withProviders'
import routes from '~/config/routes'
import { type Bookmark, getAllTags, getBookmarks } from '~/data/bookmarks'

interface BookmarksPageProps {
  bookmarks: Bookmark[]
  allTags: string[]
}

function BookmarksPage({ bookmarks, allTags }: BookmarksPageProps) {
  return (
    <NextSeo
      title={routes.bookmarks.seo.title}
      description={routes.bookmarks.seo.description}
      openGraph={routes.bookmarks.seo.openGraph}
    />
  )
}

BookmarksPage.getLayout = withProviders(function getLayout(page) {
  const { bookmarks, allTags } = page.props
  return (
    <SiteLayout>
      <ListDetailView
        list={<BookmarksList bookmarks={bookmarks} allTags={allTags} />}
        hasDetail={false}
        detail={page}
      />
    </SiteLayout>
  )
})

export const getStaticProps: GetStaticProps = async () => {
  const bookmarks = getBookmarks()
  const allTags = getAllTags()

  return {
    props: {
      bookmarks,
      allTags,
    },
  }
}

export default BookmarksPage
