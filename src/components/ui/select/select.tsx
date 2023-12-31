import { CSSProperties, FC } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { ChevronDown } from '../../../assets/icons/chevron-down.tsx'
import { Typography } from '../typography'

import s from './select.module.scss'

export type Option = { label: string; value: string }

type ConditionalMultipleProps = {
  multiple?: true
  value: string
  onChange: (value: string) => void
}

type CommonProps = {
  className?: string
  disabled?: boolean
  name?: string
  placeholder?: string
  required?: boolean
  variant?: 'primary' | 'pagination'
  options: Array<Option>
  portal?: boolean
  errorMessage?: string
  label?: string
  width?: CSSProperties['width']
  rootClassName?: string
}
export type SelectProps = CommonProps & ConditionalMultipleProps

export const Select: FC<SelectProps> = ({
  variant = 'primary',
  placeholder,
  value,
  disabled,
  className,
  onChange,
  errorMessage,
  options,
  label,
  rootClassName,
  width,
}) => {
  const showError = !!errorMessage && errorMessage.length > 0
  const classNames = {
    root: rootClassName,
    trigger: clsx(s.trigger, s[variant], showError && s.error, className),
    icon: clsx(s.icon, s[variant]),
    item: clsx(s.item, s[variant]),
    content: clsx(s.content, s[variant]),
    label: clsx(s.label, disabled && s.disabled),
  }
  const withoutPlaceholder = variant === 'pagination' ? value : 'Select Box'
  const rootStyles = { width }

  return (
    <div className={classNames.root}>
      <Typography variant={'body2'} as="label" className={classNames.label}>
        {label}
      </Typography>
      <SelectRadix.Root disabled={disabled} onValueChange={onChange}>
        <SelectRadix.Trigger className={classNames.trigger} style={rootStyles}>
          <SelectRadix.Value placeholder={placeholder || withoutPlaceholder}>
            {value}
          </SelectRadix.Value>
          <SelectRadix.Icon className={classNames.icon}>
            <ChevronDown size={16} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={classNames.content} position={'popper'}>
            {options.map(option => (
              <SelectRadix.Item value={option.value} className={classNames.item} key={option.value}>
                {option.label}
              </SelectRadix.Item>
            ))}
          </SelectRadix.Content>
        </SelectRadix.Portal>
        {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </SelectRadix.Root>
    </div>
  )
}
