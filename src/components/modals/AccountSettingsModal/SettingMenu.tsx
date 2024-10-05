import { ACCOUNT_SETTINGS, WORKPLACE_SETTINGS } from '@/constants/settings'
import { cn } from '@/libs/utils'
import { Setting } from '@/schema/setting'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'

interface SettingMenuProps {
  selectedSetting: Setting
  setSelectedSetting: (value: Setting) => void
}

export const SettingMenu = (props: SettingMenuProps) => {
  return (
    <div className="flex w-[250px] flex-col items-start gap-4 bg-content2 p-3">
      <SettingCluster title="Account" settings={ACCOUNT_SETTINGS} {...props} />
      <SettingCluster title="Workplace" settings={WORKPLACE_SETTINGS} {...props} />
    </div>
  )
}

interface SettingClusterProps {
  title: string
  settings: Setting[]
  selectedSetting: Setting
  setSelectedSetting: (value: Setting) => void
}

const SettingCluster = ({
  title,
  settings,
  selectedSetting,
  setSelectedSetting,
}: SettingClusterProps) => {
  return (
    <Listbox variant="flat" aria-label="Listbox menu with sections">
      <ListboxSection title={title}>
        {settings.map((setting) => (
          <ListboxItem
            key={setting.key}
            startContent={<setting.icon size={20} />}
            onClick={() => setSelectedSetting(setting)}
            className={cn({
              'bg-content3': selectedSetting.key === setting.key,
            })}
          >
            {setting.label}
          </ListboxItem>
        ))}
      </ListboxSection>
    </Listbox>
  )
}
