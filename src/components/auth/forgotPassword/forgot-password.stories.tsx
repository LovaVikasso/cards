import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from '@/components/auth/forgotPassword/forgot-password.tsx'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
