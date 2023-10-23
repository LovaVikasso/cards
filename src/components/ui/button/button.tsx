import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T> //способ достать дефолтные пропсы любого стандартного элемента, исп. для рефа

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
  //С помощью Omit мы убираем из пропсов переданного компонента все пропсы, которые уже есть в наших кастомных пропсах, тем самым избегая коллизий.
) => {
  const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props

  return (
    <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
  )
}
// ${className} если будет уникальная кнока не по стандарту, перезаишет наши стили
// {s[variant]} применем стиль s в зависимоти от варианта, который переменная
// ${fullWidth ? s.fullWidth : '' если кнопка на всю длину
