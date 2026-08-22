# Delta for dependencies

## ADDED Requirements

### Requirement DEP-001: Unused dependencies removed

The system MUST remove the four unused dependencies from `package.json`: `gl-matrix`, `maath`, `meshline`, and `@react-three/rapier`. After removal, the project SHALL contain no source import that references any of them.

#### Scenario: Deps absent from manifest
- GIVEN the change applied
- WHEN inspecting `package.json` `dependencies` and `devDependencies`
- THEN none of `gl-matrix`, `maath`, `meshline`, `@react-three/rapier` appear.

#### Scenario: No residual imports
- GIVEN the change applied
- WHEN searching `src/` for the four package names
- THEN no import or require statement references any of them.

### Requirement DEP-002: Build and tests pass after removal

`npm run build` MUST succeed and any configured test suite MUST pass with the four dependencies absent. Their removal MUST NOT ripple into runtime failures caused by a forgotten import.

#### Scenario: Build green without deps
- GIVEN the four deps removed from `package.json` and lockfile
- WHEN `npm run build` executes
- THEN exit code is 0 AND the bundle contains no reference to the removed packages.

#### Scenario: No runtime regression
- GIVEN a fresh install (`npm ci`) after removal
- WHEN the app surface loads
- THEN the Library renders from the catalog AND no module-not-found error appears.
