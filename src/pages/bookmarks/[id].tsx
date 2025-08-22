import { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'

import { BookmarkDetail } from '~/components/Bookmarks/BookmarkDetail'
import { BookmarksList } from '~/components/Bookmarks/BookmarksList'
import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { withProviders } from '~/components/Providers/withProviders'
import {
  type Bookmark,
  getAllTags,
  getBookmarkById,
  getBookmarks,
} from '~/data/bookmarks'

interface BookmarkPageProps {
  bookmark: Bookmark
  allBookmarks: Bookmark[]
  allTags: string[]
}

function BookmarkPage({ bookmark, allBookmarks, allTags }: BookmarkPageProps) {
  return <BookmarkDetail bookmark={bookmark} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const bookmarks = getBookmarks()
  const paths = bookmarks.map((bookmark) => ({
    params: { id: bookmark.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const bookmark = getBookmarkById(id)
  const allBookmarks = getBookmarks()
  const allTags = getAllTags()

  if (!bookmark) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      bookmark,
      allBookmarks,
      allTags,
    },
  }
}

BookmarkPage.getLayout = withProviders(function getLayout(page) {
  const { allBookmarks, allTags } = page.props
  return (
    <SiteLayout>
      <ListDetailView
        list={<BookmarksList bookmarks={allBookmarks} allTags={allTags} />}
        hasDetail
        detail={page}
      />
    </SiteLayout>
  )
})

export default BookmarkPage
