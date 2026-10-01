# COBIT Web — Project Context

## Project overview

Web-based COBIT 2019 assessment tool. Vite + React 19 + TypeScript SPA with client-side routing (react-router-dom v7). No backend — all data is mocked in `src/data/mockData.ts`.

## Key paths

| What | Path |
|------|------|
| Project root | `C:\Users\Afif\Documents\GitHub\cobit-web` |
| Source code | `src/` |
| Pages | `src/pages/` (Dashboard, AssessmentSetup, AssessmentWorkspace, CapabilityResult, GapAnalysis, EvidenceFindings, Recommendations, Landing) |
| Components | `src/components/` |
| Styles | `src/styles/` (global.css, ui.css) |
| Mock data | `src/data/mockData.ts` |
| Types | `src/types/index.ts` |
| **Reports / docs output** | `C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen` |
| Report template | `C:\Users\Afif\OneDrive\Kuliah\Semester 7\metopen\Template Metopen Draft.docx` |

## Commands

```powershell
npm run dev       # start dev server
npm run build     # type-check + production build
npm run lint      # oxlint
npm run preview   # preview production build
```

## Report generation

A skill for writing .docx reports is available at `.opencode/skills/docx-report/SKILL.md`. It uses pandoc to convert markdown to Word format, matching the template in the metopen directory.

## Tech stack

- React 19, TypeScript, Vite 8
- react-router-dom v7
- oxlint for linting
- No CSS framework — hand-written CSS per component
