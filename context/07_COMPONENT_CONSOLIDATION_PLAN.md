# Component Consolidation Plan (Reduce Repetition)

## Current Feature Areas (from docs)
- user/: Login, Register, Profile
- round/: RoundSetup, Round, RoundHistory, RoundCard, RoundScorecard (+ older HoleEntry alt)
- shared: NavBar, Main dashboard

## Consolidation Targets
1) Round tracking:
   - Keep Round.js as canonical
   - Remove/retire HoleEntry.js if unused (or refactor Round.js to reuse it)
2) History display:
   - Make RoundCard purely presentational
   - Extract sorting/filtering into a hook: useRoundHistoryFilters
3) Auth pages:
   - Extract shared form components:
     - <AuthLayout>, <AuthTextField>, <AuthSubmitButton>, <AuthError>
4) Loading + Empty states:
   - One shared <Spinner/> and <EmptyState/>

## Non-negotiables
- No direct axios calls inside UI components
- No duplicate CSS rules per feature
