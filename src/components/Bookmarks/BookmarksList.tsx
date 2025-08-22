import { LayoutGroup, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import * as React from 'react'

import { ListContainer } from '~/components/ListDetail/ListContainer'
import { Bookmark } from '~/data/bookmarks'

import { BookmarksListItem } from './BookmarkListItem'
import { BookmarksTitlebar } from './BookmarksTitlebar'

export const BookmarksContext = React.createContext({
  tag: null,
  setTag: (tag: string) => {},
})

interface BookmarksListProps {
  bookmarks: Bookmark[]
  allTags: string[]
}

export function BookmarksList({ bookmarks, allTags }: BookmarksListProps) {
  const router = useRouter()
  const tagQuery = router.query?.tag as string
  const [tag, setTag] = React.useState(tagQuery)
  const [isVisible, setIsVisible] = React.useState(false)
  const [scrollContainerRef, setScrollContainerRef] = React.useState(null)

  // Filter bookmarks by tag
  const filteredBookmarks = React.useMemo(() => {
    if (!tag) return bookmarks
    return bookmarks.filter((bookmark) =>
      bookmark.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
  }, [bookmarks, tag])

  const defaultContextValue = {
    tag,
    setTag,
  }

  // scroll to the top of the list whenever the filters are changed
  React.useEffect(() => {
    if (scrollContainerRef?.current) scrollContainerRef.current.scrollTo(0, 0)
  }, [tag])

  // if a user is linked to /bookmarks?tag=foo, clear the query filter but stay on the same page
  React.useEffect(() => {
    if (tagQuery) router.push(router.pathname, { query: null })
  }, [tagQuery])

  return (
    <BookmarksContext.Provider value={defaultContextValue}>
      <ListContainer data-cy="bookmarks-list" onRef={setScrollContainerRef}>
        <BookmarksTitlebar scrollContainerRef={scrollContainerRef} />
        <LayoutGroup>
          <div className="lg:space-y-1 lg:p-3">
            {filteredBookmarks.map((bookmark) => {
              const active = router.query.id === bookmark.id
              return (
                <motion.div layout key={bookmark.id}>
                  <BookmarksListItem active={active} bookmark={bookmark} />
                </motion.div>
              )
            })}
          </div>
        </LayoutGroup>
      </ListContainer>
    </BookmarksContext.Provider>
  )
}
