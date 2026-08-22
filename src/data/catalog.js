import catalog from '../../.storybook/component-catalog.json'

const entries = catalog.components // [{ id, storyFile, visualContext, moodTags, adaptationRules }]

export const getAll = () => entries
export const getById = (id) => entries.find((entry) => entry.id === id) ?? null
