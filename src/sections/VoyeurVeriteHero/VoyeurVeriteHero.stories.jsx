import { VoyeurVeriteHero } from './VoyeurVeriteHero'

export default {
  component: VoyeurVeriteHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  /* Remove global withDark decorator — this component manages its own background */
  decorators: [],
}

export const Default = {}
