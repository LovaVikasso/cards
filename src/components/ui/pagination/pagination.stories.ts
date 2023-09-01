import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationMain: Story = {
  args: {
    totalCount: 300,
    currentPage: 1,
    pageSize: 10,
  },
}
