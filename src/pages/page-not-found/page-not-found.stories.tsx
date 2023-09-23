import type { Meta, StoryObj } from '@storybook/react'

import { PageNotFound } from '@/pages'

const meta = {
  title: 'Pages/PageNotFound',
  component: PageNotFound,
  // decorators: [
  //   Story => (
  //     <div style={{ margin: '3em' }}>
  //       {/*<Router >*/}
  //       <Story />
  //       {/*</Router>*/}
  //       {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
  //     </div>
  //   ),
  // ],
  tags: ['autodocs'],
} satisfies Meta<typeof PageNotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
