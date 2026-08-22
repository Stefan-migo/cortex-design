/** Dark wrapper: matches our design system background. Centers stories. */
const withDark = (Story) => (
  <div
    style={{
      background: '#0a0a0f',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '2rem',
      boxSizing: 'border-box',
    }}
  >
    <Story />
  </div>
);

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withDark],
};

export default preview;
