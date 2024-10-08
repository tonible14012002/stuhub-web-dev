import Typography from '@/components/common/Typography'
import { useFormContext } from 'react-hook-form'
import { FormInput } from '../common/Form/FormInput'
import { Avatar, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { RiArrowLeftLine, RiArrowRightLine, RiCloseLine } from 'react-icons/ri'
import { LuDot } from 'react-icons/lu'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { OnboardingFormValues } from './utils'
import { FileUploadWrapper } from '../common/FileUploadWrapper/FileUploadWrapper'

interface CreateFirstOrgOnboardingProps {
  onContinue?: () => void
  onBack?: () => void
  selectedOrgAvatar?: Blob
  onSelectedOrgAvatar?: (image?: Blob) => void
  loading?: boolean
}

export const CreateFirstOrgOnboarding = ({
  onContinue,
  onBack,
  selectedOrgAvatar,
  onSelectedOrgAvatar,
  loading,
}: CreateFirstOrgOnboardingProps) => {
  const form = useFormContext<OnboardingFormValues>()

  const wOrgName = form.watch('orgName')
  const wOrgDescription = form.watch('orgDescription')
  const [previewOrgAvatar, setPreviewOrgAvatar] = useState<string>()

  const onRemoveOrgAvatar = () => {
    if (selectedOrgAvatar) {
      setPreviewOrgAvatar(undefined)
      onSelectedOrgAvatar?.(undefined)
      return
    }
  }

  useEffect(() => {
    if (selectedOrgAvatar) {
      const preview = URL.createObjectURL(selectedOrgAvatar)
      setPreviewOrgAvatar(preview)
      return () => URL.revokeObjectURL(preview)
    }
    setPreviewOrgAvatar(undefined)
  }, [selectedOrgAvatar])

  return (
    <form
      id="create-first-org-onboarding"
      className="flex min-h-[400px] w-[560px] max-w-full flex-col"
      onSubmit={(e) => {
        e.preventDefault()
        onContinue?.()
      }}
    >
      <Typography level="h3" className="mb-1">
        Setting thing up
      </Typography>
      <Typography level="p2" color="textTertiary">
        Update your first organization info
      </Typography>

      <div className="mt-8 flex flex-col gap-8">
        <FormInput size="lg" className="scale-105" label="Organization's name" name="orgName" />
        <FormInput
          size="lg"
          className="scale-105"
          label="Organization's description"
          name="orgDescription"
        />
      </div>
      <div className="mt-8 space-y-4">
        <Typography level="h5" color="textSecondary">
          Your organization&apos; card
        </Typography>
        <div className="flex items-start gap-4">
          <OrganizationCard
            name={wOrgName}
            description={wOrgDescription}
            avatar={previewOrgAvatar}
          />
          {previewOrgAvatar ? (
            <Button
              size="sm"
              variant="flat"
              color="danger"
              type="button"
              onClick={onRemoveOrgAvatar}
            >
              <RiCloseLine size={16} />
              Remove
            </Button>
          ) : (
            <FileUploadWrapper
              onSelectedFile={onSelectedOrgAvatar}
              isSelected={!!selectedOrgAvatar}
            >
              <Button size="sm" color="primary" variant="flat">
                Upload Avatar
              </Button>
            </FileUploadWrapper>
          )}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-2">
        <Button
          size="lg"
          type="button"
          variant="flat"
          className="w-fit text-text-tertiary"
          onClick={() => {
            onBack?.()
          }}
          disabled={loading}
        >
          <RiArrowLeftLine size={16} />
          Back
        </Button>
        <Button
          size="lg"
          disabled={
            (form.formState.isSubmitted && !form.formState.isValid) ||
            form.formState.isSubmitting ||
            loading
          }
          variant="solid"
          color="primary"
          type="submit"
          form="create-first-org-onboarding"
          isLoading={loading}
        >
          Continue
          <RiArrowRightLine size={18} />
        </Button>
      </div>
    </form>
  )
}

interface OrganizationCardProps {
  name?: string
  description?: string
  avatar?: string
}

export const OrganizationCard = (props: OrganizationCardProps) => {
  const { name, description, avatar } = props
  return (
    <Card className="min-w-[300px] max-w-[400px]">
      <CardHeader className="flex justify-between">
        <div className="flex w-full gap-3">
          <Avatar fallback={name?.[0]} src={avatar} className="shrink-0 uppercase" />
          <div className="flex flex-1 flex-col overflow-hidden pr-2">
            <Typography noWrap level="p4">
              {name || 'Untitled'}
            </Typography>
            <Typography level="p5" color="textTertiary" className="flex items-center gap-1">
              {dayjs().format('MMM D, YYYY')}
              <LuDot />3 members
            </Typography>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Typography color="textTertiary" className="line-clamp-5">
          {description || 'No description'}
        </Typography>
      </CardBody>
    </Card>
  )
}
