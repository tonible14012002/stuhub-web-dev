'use client'

import { PageTitle } from '@/components/page/PageTitleInput'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { PageContent } from '@/components/page/PageContent'
import { Skeleton } from '@nextui-org/react'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { TableOfContent } from '@/components/page/TableOfContent'
import { useEffect, useState } from 'react'
import { TOCHeading } from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { usePageLayoutContext } from '@/components/layout/PageLayout/context'
import { getRandomImageUrl } from '@/libs/image'

console.error = () => {}

export default function PageDetail() {
  const { pageID } = useParams<OrganizationPageParams>()
  const [headings, setHeadings] = useState<TOCHeading[]>([])
  const { setCoverImageUrl, currentCoverImageUrl } = usePageLayoutContext()

  const { data: { data: pageDetail } = {} } = useFetchPage({
    allowFetch: true,
    pageID,
  })

  const { data: { data: documentData } = {}, isRefetching } = useFetchDocument({
    allowFetch: !!pageDetail,
    pagePkID: pageDetail?.pkid ?? -1,
  })

  const onAddCoverBtn = () => {
    setCoverImageUrl(getRandomImageUrl(1400, 400))
  }

  useEffect(() => {
    if (pageDetail) setCoverImageUrl(pageDetail?.cover_image ?? '')
  }, [pageDetail, setCoverImageUrl])

  return (
    <div className="flex w-full">
      <div className="mx-auto max-w-[732px] w-full">
        <div className="flex flex-col py-8">
          <div className="flex flex-col">
            {pageDetail && (
              <PageTitle
                pageID={pageDetail?.id}
                key={pageDetail?.id}
                onAddCover={onAddCoverBtn}
                hasCorverImg={Boolean(currentCoverImageUrl)}
              />
            )}
          </div>
          <div className="-mx-3 pb-10">
            {documentData ? (
              <>
                <PageContent
                  documentData={documentData}
                  onContentHeadingChanged={setHeadings}
                  isReadOnly={isRefetching}
                  key={documentData.pkid}
                />
              </>
            ) : (
              <div className="flex flex-col gap-4 px-8 py-8">
                <Skeleton className="h-[44px] w-[400px] max-w-full rounded-small" />
                <Skeleton className="h-[30px] w-[600px] max-w-full rounded-small" />
              </div>
            )}
          </div>
        </div>
      </div>
      {documentData && (
        <TableOfContent key={isRefetching ? 'refetching' : documentData.pkid} headings={headings} />
      )}
    </div>
  )
}
