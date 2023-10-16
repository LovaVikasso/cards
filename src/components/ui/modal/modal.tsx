import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'
type ModalProps = {
  open?: boolean
  trigger?: ReactNode //не обязательно, потому что триггер может быть не там где в коде лежит сама модалка
  onOpenChange: (open: boolean) => void
  children: ReactNode
  // onClose?: () => void
  hideCloseIcon?: boolean
  modalTitle?: string
  line?: boolean
}
export const Modal: FC<ModalProps> = ({
  open,
  trigger,
  onOpenChange,
  children,
  hideCloseIcon,
  modalTitle,
  line = true,
}) => (
  <Dialog.Root onOpenChange={onOpenChange} open={open}>
    {/*передаем открыта ли и функцию на открытие*/}
    <Dialog.Trigger asChild>
      <button className="Button violet">{trigger}</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={s.dialogOverlay} />
      <Dialog.Content className={s.dialogContent}>
        <Dialog.Title className={s.dialogTitle}>{modalTitle}</Dialog.Title>
        {line && <hr className={s.line} />}
        {!hideCloseIcon && (
          <Dialog.Close asChild>
            <button className={s.closeButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        )}
        <div>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
