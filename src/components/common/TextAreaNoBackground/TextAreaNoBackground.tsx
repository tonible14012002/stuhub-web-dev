import { cn } from '@/libs/utils'
import { Textarea, TextAreaProps } from '@nextui-org/react'

export const TextAreaNoBackground = (props: TextAreaProps) => {
  const { classNames, ...rest } = props
  const { inputWrapper, ...restClassNames } = classNames ?? {}
  return (
    <Textarea
      {...rest}
      classNames={{
        inputWrapper: cn(
          'border-0 bg-transparent',
          'group-data-[focus=true]:bg-transparent',
          'data-[hover=true]:bg-transparent',
          'shadow-none',
          'group-data-[focus-visible=true]:!ring-0',
          'group-data-[focus-visible=true]:!ring-offset-0',
          inputWrapper,
        ),
        ...restClassNames,
      }}
    />
  )
}
