# Proposal: Storybook Migration

## Intent

Integrate Storybook 9 with Controls, a11y, and MCP into the cortex-design library so components can be visually reviewed, accessibility-checked, and AI-agent-queried — replacing the hand-rolled showcase incrementally.

## Scope

### In Scope
- Storybook 9 + @storybook/react-vite init, config, preview setup
- 4 CSF stories (GlitchText, CurvedLoop, TextPressure, FuzzyText) with Controls argTypes
- @storybook/addon-a11y for accessibility panel
- @storybook/addon-mcp for AI agent querying
- @storybook/essentials (Docs, Controls, Viewport, backgrounds)
- Vite dev server (port 5173) + Vitest preserved — separate Storybook dev on port 6006

### Out of Scope
- Component implementation changes (zero touch)
- Old showcase deletion (Library.jsx, App.jsx, registry.js, etc.) — Phase 4 deferred
- Chromatic / visual regression testing
- Storybook custom themes, brand config, or deployment

## Capabilities

### New Capabilities
- `storybook-setup`: SB9 + react-vite builder + addon config + preview decorators
- `glitch-text-story`: CSF story with Controls, a11y, Docs
- `curved-loop-story`: same
- `text-pressure-story`: same (preview-head font loading)
- `fuzzy-text-story`: same (canvas ref via decorator)

### Modified Capabilities
- None — pure new capabilities. Existing specs unchanged.

## Approach

4 incremental phases:

1. **Setup**: `npx storybook@latest init`, configure `.storybook/main.js` + `preview.js`, add @storybook/addon-a11y + @storybook/addon-mcp, verify both dev servers
2. **GlitchText story**: Write 1 CSF file with argTypes mapped from `registry.js` control config, verify Controls + Docs + a11y
3. **Remaining 3 stories**: CurvedLoop, TextPressure, FuzzyText — one commit each
4. **Cleanup** (separate change, later): delete old showcase files

**Decisions**:
- Stories co-located at `src/components/TextAnimations/*.stories.jsx`
- Storybook 9.x over 8.x (fresh install, React 19 parity)
- Keep Vite app — Storybook augments, doesn't replace

## Affected Areas

| Area | Impact | Details |
|------|--------|---------|
| `.storybook/main.js` | **New** | SB9 config, stories glob, addons, viteFinal |
| `.storybook/preview.js` | **New** | Decorators, viewport, a11y, backgrounds |
| `.storybook/preview-head.html` | **New** | @fontsource loading for TextPressure |
| `src/components/TextAnimations/*.stories.jsx` | **New** | 4 CSF files, one per component |
| `package.json` | **Modified** | Storybook scripts added by `init`, no manual edits |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Storybook 9 + React 19 compat | Low | @storybook/react-vite, confirmed working |
| FuzzyText canvas element ref | Med | Preview decorator wraps in canvas container |
| CSS conflicts in iframe | Low | BEM classes + isolated iframe scope |
| 80-120MB dep cost | Med | Separates cleanly, no test/dev impact |

## Rollback Plan

1. `git checkout package.json` (revert script additions)
2. `rm -rf .storybook/`
3. `npm uninstall @storybook/react-vite @storybook/addon-a11y @storybook/addon-mcp @storybook/essentials @storybook/react @storybook/core`
4. `rm -f src/components/TextAnimations/*.stories.jsx`
5. `npm install && npm run dev && npm test` to verify

## Dependencies

- None external. All Storybook packages from npm (devDependencies only). No runtime impact.

## Success Criteria

- [ ] `npm run storybook` starts on port 6006, no errors
- [ ] All 4 stories render with Controls panel interactive
- [ ] A11y panel shows results per story
- [ ] MCP addon responds to queries
- [ ] `npm run dev` (Vite) + `npm test` (Vitest) pass unchanged
