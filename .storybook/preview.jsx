import React from 'react';

/** Injects Roboto Flex variable font for TextPressure stories. */
export const withFont = (Story) => {
  React.useEffect(() => {
    if (!document.querySelector('#sb-font-loader')) {
      const link = document.createElement('link');
      link.id = 'sb-font-loader';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,wght@8..144,100..900&display=swap';
      document.head.appendChild(link);
    }
  }, []);
  return <Story />;
};

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
