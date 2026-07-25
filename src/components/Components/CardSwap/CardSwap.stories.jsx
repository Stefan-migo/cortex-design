import { CardSwap, Card } from './CardSwap'

const meta = {
  component: CardSwap,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'range', min: 100, max: 800, step: 10 } },
    height: { control: { type: 'range', min: 100, max: 800, step: 10 } },
    cardDistance: { control: { type: 'range', min: 10, max: 200, step: 5 } },
    verticalDistance: { control: { type: 'range', min: 10, max: 200, step: 5 } },
    delay: { control: { type: 'range', min: 1000, max: 15000, step: 500 } },
    pauseOnHover: { control: 'toggle' },
    easing: { control: 'select', options: ['elastic', 'linear'] },
  },
}

export default meta

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold',
}

export const Default = {
  args: {
    width: 300,
    height: 200,
    cardDistance: 60,
    verticalDistance: 70,
    delay: 4000,
    pauseOnHover: true,
    easing: 'elastic',
    children: [
      <Card key={0} style={{ background: '#6366f1', ...cardStyle }}>Card 1</Card>,
      <Card key={1} style={{ background: '#ec4899', ...cardStyle }}>Card 2</Card>,
      <Card key={2} style={{ background: '#14b8a6', ...cardStyle }}>Card 3</Card>,
    ],
  },
}

export const LinearEasing = {
  args: {
    width: 300,
    height: 200,
    cardDistance: 60,
    verticalDistance: 50,
    delay: 3000,
    pauseOnHover: true,
    easing: 'linear',
    children: [
      <Card key={0} style={{ background: '#f59e0b', ...cardStyle }}>First</Card>,
      <Card key={1} style={{ background: '#8b5cf6', ...cardStyle }}>Second</Card>,
      <Card key={2} style={{ background: '#ef4444', ...cardStyle }}>Third</Card>,
      <Card key={3} style={{ background: '#06b6d4', ...cardStyle }}>Fourth</Card>,
    ],
  },
}

export const FastSwap = {
  args: {
    width: 300,
    height: 200,
    cardDistance: 40,
    verticalDistance: 40,
    delay: 1500,
    pauseOnHover: true,
    easing: 'elastic',
    children: [
      <Card key={0} style={{ background: '#10b981', ...cardStyle }}>A</Card>,
      <Card key={1} style={{ background: '#f472b6', ...cardStyle }}>B</Card>,
      <Card key={2} style={{ background: '#3b82f6', ...cardStyle }}>C</Card>,
    ],
  },
}
