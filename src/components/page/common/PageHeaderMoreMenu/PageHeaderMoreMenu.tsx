'use client'

import { Button, Skeleton } from '@nextui-org/react'
import { RiMore2Fill, RiShareFill, RiStarLine } from 'react-icons/ri'
import { PageActionMenuView } from '../../menu_view/MenuView'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'

export const PageHeaderMoreMenu = () => {
  const { pageID } = useParams<OrganizationPageParams>()
  const { data: { data: page } = {}, isPending } = useFetchPage({
    allowFetch: Boolean(pageID),
    pageID,
  })

  if (!pageID) {
    return null
  }
  
  return (
    <div className="flex items-center gap-3">
      <Button size="sm" variant="light" isIconOnly>
        <RiShareFill size={20} />
      </Button>
      <Button size="sm" variant="light" isIconOnly>
        <RiStarLine size={20} />
      </Button>
      {isPending && <Skeleton className=" h-6 w-6 rounded-md" />}
      {!isPending && page && (
        <PageActionMenuView page={page}>
          <Button isIconOnly size="sm" variant="flat">
            <RiMore2Fill size={20} />
          </Button>
        </PageActionMenuView>
      )}
    </div>
  )
}
