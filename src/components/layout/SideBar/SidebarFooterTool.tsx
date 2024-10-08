import { useAuthContext } from '@/components/auth/AuthGuard'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import { useOrganization } from '@/components/providers/organization'
import { getPermissionText } from '@/utils/organization'
import { Button } from '@nextui-org/react'
import { AiOutlineTeam } from 'react-icons/ai'

export const SidebarFooter = () => {
  const { currentUserRole } = useOrganization()
  const { user } = useAuthContext()
  return (
    <>
      {/* <div className="shrink-0 pt-4">
        <Card shadow="sm" radius="sm">
          <CardHeader className="p-2" />
          <CardBody className="pt-0 text-small">
            <Typography level="p5" color="textSecondary">
              <LuSparkle className="inline-block" /> Get 1 month free and unlock all the features of
              the pro plan.
            </Typography>
          </CardBody>
          <CardFooter className="p-2 pt-0">
            <Button color="primary" fullWidth size="sm">
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>
      </div> */}
      <div className="mt-2 flex gap-2">
        <ProfileBadge
          variant="light"
          firstName={user?.first_name}
          lastName={user?.last_name}
          description={getPermissionText(currentUserRole ?? 'other')}
          size="sm"
        />
        <Button isIconOnly variant="flat">
          <AiOutlineTeam />
        </Button>
      </div>
    </>
  )
}
