import glitchTextCSS from '../components/TextAnimations/GlitchText.css?raw'
import curvedLoopCSS from '../components/TextAnimations/CurvedLoop.css?raw'

/* Load JSX component files as raw strings via import.meta.glob */
const jsxModules = import.meta.glob('../components/TextAnimations/*.jsx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/* Convert PascalCase filename to kebab-case id: GlitchText → glitch-text */
function nameToId(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
}

/* Map: { 'glitch-text': { jsx: '...', css: '...' } } */
const sourceMap = {}

for (const [fileKey, content] of Object.entries(jsxModules)) {
  /* fileKey: '../components/TextAnimations/GlitchText.jsx' */
  const fileName = fileKey.split('/').pop().replace('.jsx', '') // 'GlitchText'
  const id = nameToId(fileName)
  if (!sourceMap[id]) sourceMap[id] = {}
  sourceMap[id].jsx = content
}

/* Add CSS from explicit imports */
sourceMap['glitch-text'] = { ...sourceMap['glitch-text'], css: glitchTextCSS }
sourceMap['curved-loop'] = { ...sourceMap['curved-loop'], css: curvedLoopCSS }

export function getComponentSource(id) {
  return sourceMap[id] || null
}
