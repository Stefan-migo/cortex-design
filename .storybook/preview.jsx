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

/** Centers stories and provides minimum canvas height. */
const withCanvas = (Story) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
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
  decorators: [withCanvas],
};

export default preview;