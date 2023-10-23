import type { Meta } from '@storybook/react'

import { Rating } from './rating.tsx'

export default {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>

export const Zero = {
  args: {
    rating: 0,
  },
}
export const One = {
  args: {
    rating: 1,
  },
}
export const Two = {
  args: {
    rating: 2,
  },
}
export const Three = {
  args: {
    rating: 3,
  },
}
export const Four = {
  args: {
    rating: 4,
  },
}
export const Five = {
  args: {
    rating: 5,
  },
}
