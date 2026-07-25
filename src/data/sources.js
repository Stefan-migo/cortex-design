import glitchTextCSS from '../components/TextAnimations/GlitchText.css?raw'
import curvedLoopCSS from '../components/TextAnimations/CurvedLoop.css?raw'

/* Convert PascalCase filename to kebab-case id: GlitchText → glitch-text */
function nameToId(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
}

/* Map: { 'glitch-text': { jsx: '...', css: '...' } } */
const sourceMap = {}

/* Load JSX from flat TextAnimations/*.jsx files */
const flatModules = import.meta.glob('../components/TextAnimations/*.jsx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

for (const [fileKey, content] of Object.entries(flatModules)) {
  const fileName = fileKey.split('/').pop().replace('.jsx', '')
  const id = nameToId(fileName)
  if (!sourceMap[id]) sourceMap[id] = {}
  sourceMap[id].jsx = content
}

/* Load JSX from nested Animations subdirectories */
const nestedModules = import.meta.glob('../components/Animations/!(*.jsx)/*.jsx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

for (const [fileKey, content] of Object.entries(nestedModules)) {
  const dirName = fileKey.split('/').slice(-2, -1)[0]
  const id = nameToId(dirName)
  if (!sourceMap[id]) sourceMap[id] = {}
  sourceMap[id].jsx = content
}

/* Add CSS from explicit imports */
sourceMap['glitch-text'] = { ...sourceMap['glitch-text'], css: glitchTextCSS }
sourceMap['curved-loop'] = { ...sourceMap['curved-loop'], css: curvedLoopCSS }

export function getComponentSource(id) {
  return sourceMap[id] || null
}
