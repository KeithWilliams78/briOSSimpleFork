// import { useGetStacksQuery } from '~/graphql/types.generated'

export function StackList() {
  // TODO: Convert to static data
  return null

  /*
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false)
  let [scrollContainerRef, setScrollContainerRef] = React.useState(null)

  const { data, loading, fetchMore } = useGetStacksQuery()

  function handleFetchMore() {
    return fetchMore({
      variables: {
        after: data.stacks.pageInfo.endCursor,
      },
    })
  }

  React.useEffect(() => {
    if (isVisible) handleFetchMore()
  }, [isVisible])

  if (loading && !data?.stacks) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        <StackTitlebar scrollContainerRef={scrollContainerRef} />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer data-cy="stack-list" onRef={setScrollContainerRef}>
      <StackTitlebar scrollContainerRef={scrollContainerRef} />

      <div className="lg:space-y-1 lg:p-3">
        {data.stacks.edges.map((stack) => {
          const active = router.query.slug === stack.node.slug
          return (
            <StackListItem
              key={stack.node.id}
              stack={stack.node}
              active={active}
            />
          )
        })}

        {data.stacks.pageInfo.hasNextPage && (
          <ListLoadMore setIsVisible={setIsVisible} />
        )}
      </div>
    </ListContainer>
  )
  */
}
