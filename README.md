# StarWar — Character Cards (React + TypeScript)

Lightweight React app that displays Star Wars characters and character cards. Built with Create React App (TypeScript template) and a small assets set of SVG character icons.

---

## How to run (local)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm start
```

3. Run tests

```powershell
npm test
```

4. Build for production

```powershell
npm run build
```

Open http://localhost:3000 in your browser when the dev server starts.

---

## What I implemented (features)

- Character listing with search and pagination (client-side)
- Filters: filter by Homeworld, Species, and Film. Filters can be combined with the search box (client-side filtering)
- Character cards and a details modal that shows films and homeworld details
- Character SVG assets aggregator: `src/assets/character/index.ts` exports named assets and a default map
- Utilities: `FormatAllCharacter`, `formatDateForUI`, `getEmpty`, and helpers to get images / background colors
- Mock authentication (client-only):
  - `src/auth/AuthProvider.tsx` — mock login (`admin` / `password`), stores a mocked token in localStorage
  - Silent token refresh logic (mocked): token stored in localStorage is refreshed on a timer to simulate silent refresh
  - `src/pages/login` — simple login page
  - Header shows Login/Logout based on auth state
- Integration test: `src/__tests__/CharacterModal.int.test.tsx` tests that clicking a CharacterCard opens the modal and shows details

Bonus / small improvements included:

- A small assets map (`starWarImages`) and `getCharacterImageByName` for consistent image lookup
- Defensive data formatting when calling external APIs (FormatAllCharacter uses helper to fetch species/homeworld and maps film URLs to titles)

---

## Trade-offs & design choices

- Client-side filtering: I implemented filters and search on the client using data already fetched into Redux. This keeps the UI snappy and requires no backend changes, but it means:

  - Not suitable for extremely large datasets (thousands+ items) — for that, server-side filtering or pagination should be used.
  - Works well for the SWAPI-sized dataset and demo usage.

- Mock authentication: The AuthProvider stores a base64-encoded payload in localStorage and refreshes it on a timer. This is intentionally simple for demo purposes:

  - No real JWT validation or backend — do NOT use this for production authentication.
  - The mock flow is helpful for demonstrating login/logout UI and token refresh behavior.

- State & data fetching: I used a small Redux slice (`charactersSlice`) and a fetch thunk. I did not migrate to RTK Query or react-query to keep changes small and focused. Migrating to RTK Query would give caching, invalidation, and easier server-driven filtering.

- Tests: I added a single integration-style test for the Character modal. This gives basic confidence but is not a full test suite — adding unit tests for utils and more UI tests is recommended.

- Assets: Character SVGs are kept locally and re-exported via an aggregator to simplify imports. If the asset set grows, consider serving optimized images from a CDN and using lazy-loading.

---

## Credentials (mock)

- Username: `admin`
- Password: `password`

The auth is mocked client-side. The app stores a mock token in localStorage and refreshes it automatically.

---
