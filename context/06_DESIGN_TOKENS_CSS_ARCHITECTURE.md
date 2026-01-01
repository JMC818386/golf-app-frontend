# Design Tokens -> CSS Architecture (Figma-Friendly)

## Goal
Move from scattered CSS into a token-driven system:
- easy to map from Figma Variables/Tokens
- consistent spacing/typography/colors
- minimal duplication

## Folder Structure (frontend/src/styles)
styles/
  tokens/
    tokens.css              # generated/maintained token variables (CSS custom props)
    tokens.semantic.css     # semantic aliases (e.g. --color-bg, --color-text)
  base/
    reset.css
    typography.css
    layout.css
  components/
    button.css
    card.css
    forms.css
    nav.css
  utilities/
    utilities.css           # tiny utilities, avoid bloat
  index.css                 # single entry importing everything

## Token Strategy
### 1) Primitives (from brand palette)
:root {
  --color-green-900: #314035;
  --color-green-700: #46594B;
  --color-green-500: #698C75;
  --color-cream-50:  #F2EFDF;
  --color-orange-500:#F2A74B;
  ...
}

### 2) Semantics (used by UI)
:root {
  --color-bg: var(--color-green-700);
  --color-surface: var(--color-green-900);
  --color-text: var(--color-cream-50);
  --color-accent: var(--color-orange-500);
  --radius-md: 12px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  ...
}

## Component Contracts
- Buttons read semantic tokens only (never raw hex)
- Layout spacing uses --space-* scale only
- Typography uses a defined scale (e.g. --font-size-*, --line-height-*)

## Integration
- index.css imported once in main.jsx
- Bootstrap remains optional; if kept, tokens still control custom UI.
