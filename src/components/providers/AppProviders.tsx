'use client'

import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'
import { SidebarProvider } from './sidebar'
import { CreatePageProvider } from './newpage'
import { CollapsePersistProvider } from './collapse'
import { AssetUploaderContextProvider } from './asset_upload'
import { InfoProvider } from './info'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <InfoProvider>
      <OrganizationProvider>
        <CollapsePersistProvider>
          <CreatePageProvider>
            <SidebarProvider>
              <AssetUploaderContextProvider>{children}</AssetUploaderContextProvider>
            </SidebarProvider>
          </CreatePageProvider>
        </CollapsePersistProvider>
      </OrganizationProvider>
    </InfoProvider>
  )
}
