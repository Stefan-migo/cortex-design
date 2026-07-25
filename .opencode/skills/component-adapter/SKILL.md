# Skill: component-adapter

Deterministic catalog query + token adaptation engine. Reads
`.storybook/component-catalog.json` and produces structured output with no
generative AI — all rules are applied by the LLM following this spec.

## Data Source

`.storybook/component-catalog.json` — static JSON, git-tracked. Regenerated
via `npx storybook extract` or a Node script parsing CSF3 stories.

### Schema

```json
{
  "version": "1",
  "components": [
    {
      "id": "glitch-text",
      "storyFile": "TextAnimations/GlitchText.stories.jsx",
      "visualContext": ["hero", "callout", "feedback"],
      "moodTags": ["edgy", "tech", "playful"],
      "tokenSlots": ["--od-color-primary", "--od-color-secondary"],
      "defaultProps": { "glitchSpeed": 300 },
      "adaptationRules": {
        "variants": {
          "Default": {},
          "HoverOnly": { "trigger": "hover" },
          "SlowMotion": { "glitchSpeed": 800 },
          "WithShadows": { "showShadows": true }
        },
        "defaults": {
          "--od-color-primary": "#6366f1",
          "--od-color-secondary": "#a855f7"
        }
      }
    }
  ]
}
```

ponytail: Flat JSON, no DB, no MCP server. If the catalog grows past 500
components, add an index map (component id → `visualContext` + `moodTags`)
to avoid O(n) scans. YAGNI for now.

## Operations

### 1. Query by Context

```
Input:  { operation: "query", visualContext: "hero", moodTags: ["dramatic", "bold"] }
Output: { componentId, visualContext, moodTags, adaptationRules }
```

Query logic:
1. Load `.storybook/component-catalog.json`
2. Filter components where `component.visualContext` matches the query value
   AND `component.moodTags` intersects `query.moodTags` (OR semantics within
   the set — any matching tag is sufficient)
3. Return all matches (empty array if none — no error)

### 2. Map Tokens

```
Input:  { operation: "map-tokens", componentId: "glitch-text", projectTokens: { ... } }
Output: { componentId, tokenMap: { "--od-color-primary": "...", ... }, warnings: [] }
```

Mapping logic:
1. Find component in catalog by `id`
2. For each slot in `component.tokenSlots`:
   - If `projectTokens` defines it → use the project value
   - Else → use `component.adaptationRules.defaults[slot]`
3. If any slot falls back to defaults, record a warning

### 3. Apply Variant

```
Input:  { operation: "apply-variant", componentId: "glitch-text", variantName: "SlowMotion" }
Output: { componentId, adaptedProps: { ... }, warnings: [] }
```

Variant logic:
1. Find component in catalog by `id`
2. If `variantName` exists in `adaptationRules.variants`:
   - Deep-merge variant overrides with `defaultProps` (variant wins)
3. Else: return `defaultProps` as-is and log an unknown-variant warning

### 4. Combined: adapt

```
Input:  { operation: "adapt", visualContext, moodTags, projectTokens, variantName }
Output: { componentId, adaptedProps, tokenMap, warnings }
```

Runs query → map-tokens → apply-variant sequentially on the first matching
component. This is the most common invocation — called by `design-agent-lead`
after Finalize phase.

## Output Contract

Every successful operation returns JSON with:

| Key | Type | Always | Description |
|-----|------|--------|-------------|
| `componentId` | string | yes | Catalog component id |
| `adaptedProps` | object | yes | Merged props (defaults + variant) |
| `tokenMap` | object | yes | CSS variable key/value pairs |
| `warnings` | string[] | yes | Non-empty if fallbacks or errors |

## Dependencies

- `.storybook/component-catalog.json` — MUST exist before first invocation
- No NPM packages, no MCP servers, no runtime dependencies
