import * as SliderR from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const Slider = () => (
  <form>
    <SliderR.Root className={s.SliderRoot} defaultValue={[0, 10]} max={100} step={1}>
      <SliderR.Track className={s.SliderTrack}>
        <SliderR.Range className={s.SliderRange} />
      </SliderR.Track>
      <SliderR.Thumb className={s.SliderThumb} aria-label="Volume" />
    </SliderR.Root>
  </form>
)
