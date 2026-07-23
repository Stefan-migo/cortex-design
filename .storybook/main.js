

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-mcp'],
  framework: '@storybook/react-vite',
};
export default config;