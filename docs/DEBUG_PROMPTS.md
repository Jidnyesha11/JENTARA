# 🔧 VS Code Agent Debugging Prompts for Jentara Apparel

## ⚡ Quick Start: Use These Prompts in VS Code Agent

---

## PROMPT 1: Initial Project Validation & Error Detection

```
Analyze my entire jentara-apparel Next.js project and identify all errors. 

CRITICAL TASKS:
1. Check all TypeScript/JavaScript files for syntax errors
2. Find missing imports and dependencies
3. Identify broken file references and paths
4. Check for missing type definitions
5. Validate all component prop types
6. Check for circular dependencies
7. Verify all API route handlers are properly exported
8. Check for missing environment variables
9. Identify missing Supabase schema/table references
10. Flag any duplicate or conflicting exports

PROVIDE:
- List of ALL files with errors (mark in RED)
- Specific error messages for each file
- Line numbers where errors occur
- Severity level (CRITICAL/WARNING/INFO)
- Quick fix suggestions

START WITH:
1. First, list all files in the project structure
2. Then, check each file type (*.ts, *.tsx, *.js, *.css)
3. Report errors in this format:

FILE: path/to/file.tsx
ERROR TYPE: [Import/Type/Export/Logic/Config]
LINE: XX
MESSAGE: [Specific error]
SEVERITY: CRITICAL/WARNING
FIX: [Quick solution]
```

---

## PROMPT 2: Fix All Import Errors

```
I have a Next.js project with broken imports. Fix ALL import errors:

TASKS:
1. Scan all .ts and .tsx files for import errors
2. Identify missing module references
3. Fix relative path issues (../, ./, etc)
4. Add missing 'use client' directives for client components
5. Add missing 'use server' directives for server actions
6. Fix circular imports
7. Ensure all exports are properly named
8. Add missing index.ts files for barrel exports
9. Fix Supabase import paths
10. Verify all @/ aliases work correctly

PRIORITY ORDER:
- lib/ files (foundation)
- types/ files (dependencies)
- hooks/ files (used by components)
- components/ files (page dependencies)
- app/ files (pages)

PROVIDE:
For each file with import errors:
1. Current incorrect import
2. Corrected import
3. Explanation of the fix
```

---

## PROMPT 3: Fix Component & Page File Issues

```
My component and page files have errors. Fix them all:

CHECK IN EACH .tsx FILE:
1. Proper React imports (import React from 'react')
2. Client component marker ('use client' at top if needed)
3. Correct component export (default or named)
4. All props interfaces defined
5. All hook usage is valid
6. All child components are imported
7. Proper TypeScript types
8. No undefined variables
9. Event handlers are properly typed
10. Styling imports (CSS modules, inline Tailwind)

FOR PAGES:
1. Verify they're in correct app/ directory
2. Check metadata exports
3. Verify page props types
4. Check dynamic segment handling [id]
5. Verify layout.tsx files in each directory

FOR LAYOUTS:
1. Check children prop is properly typed
2. Verify providers are set up correctly
3. Check metadata exports
4. Verify nested layout inheritance

REPORT FORMAT:
FILE: app/path/page.tsx
ISSUES FOUND: 3
1. Missing 'use client' directive
2. Undefined import: useAuth
3. Missing component export

FIXED VERSIONS PROVIDED BELOW
```

---

## PROMPT 4: Fix TypeScript Type Errors

```
Fix all TypeScript type definition and usage errors:

TASKS:
1. Find all implicit 'any' types and define them
2. Fix React.FC and component prop types
3. Add missing type exports
4. Fix union type mismatches
5. Add proper null/undefined handling
6. Fix Promise<T> return types for async functions
7. Add proper typing for Supabase responses
8. Fix object type mismatches
9. Add string literal types where needed
10. Fix generic type parameters <T>

SPECIFIC CHECKS:
- All function parameters are typed
- All function return types are defined
- All state hook types are correct (useState<T>)
- All event handlers are properly typed
- All API responses are typed
- All Supabase queries return proper types
- All component props extend React attributes if needed

VALIDATION:
Run: npx tsc --noEmit
Report all errors found

FORMAT RESPONSE AS:
FILE: types/product.ts
ERROR: Type 'string | undefined' is not assignable to type 'string'
LINE: 42
CAUSE: [Explanation]
FIX: [Solution with code]
```

---

## PROMPT 5: Fix Supabase & Database Errors

```
Fix all Supabase client and database-related errors:

CHECK:
1. Supabase client initialization (lib/supabase/client.ts)
2. Missing Supabase environment variables
3. All database table queries match schema
4. Proper RLS (Row Level Security) handling
5. Correct type casting for database responses
6. Missing Supabase service role key usage
7. Auth state subscription setup
8. All database method names are correct (.from().select().eq())
9. Verify all table names exist
10. Check column names are correct

VERIFY SCHEMA:
- users table exists
- products table exists
- orders table exists
- cart table exists
- wishlist table exists
- All required columns are defined

FIXES NEEDED:
1. Update Supabase URLs if wrong
2. Add missing environment variables
3. Fix any table/column name mismatches
4. Add proper error handling
5. Fix type casting issues
6. Update RLS policies if needed

REPORT:
FILE: lib/supabase/client.ts
ISSUE: Missing NEXT_PUBLIC_SUPABASE_URL
ENVIRONMENT: .env.local
STATUS: Critical - App won't start without this

ALSO CHECK:
- All API routes that query Supabase
- All hooks that fetch from Supabase
- All components that use Supabase
```

---

## PROMPT 6: Fix API Route Errors

```
Debug and fix all app/api/* route handler errors:

EACH API ROUTE MUST HAVE:
1. Proper HTTP method export (GET, POST, PUT, DELETE)
2. Correct function signature: async (req: Request) => Response
3. Proper error handling with try-catch
4. Correct response format (JSON, status codes)
5. CORS headers if needed
6. Authentication checks
7. Input validation
8. Proper TypeScript typing
9. All dependencies imported
10. Environment variables accessed correctly

COMMON ISSUES TO FIX:
1. Missing export for HTTP method
2. Wrong function signature
3. Improper error responses
4. Missing authentication
5. Unvalidated user input
6. Missing Supabase queries
7. Incorrect JSON response format
8. Missing status codes
9. Unhandled promise rejections
10. Missing request body parsing

VALIDATE ALL ROUTES:
- /api/auth/* → User authentication
- /api/products/* → Product CRUD
- /api/cart/* → Cart operations
- /api/orders/* → Order management
- /api/payment/* → Payment processing

RESPONSE FORMAT:
ROUTE: /api/products/route.ts
ERRORS: 2
1. Missing default export for GET
2. Missing error handling

FIXED CODE:
[Provide corrected code]
```

---

## PROMPT 7: Fix Missing Files & Create Them

```
Identify all missing files and CREATE them properly:

SCAN FOR MISSING:
1. All .tsx files referenced in imports
2. All type definition files in types/
3. All utility files in lib/utils/
4. All hook files in hooks/
5. All store files in store/
6. All component files in components/
7. All API route files in app/api/
8. All page files in app/

FOR EACH MISSING FILE:
1. Create with proper boilerplate
2. Add proper imports/exports
3. Add TypeScript types
4. Add function signatures
5. Add proper documentation

PRIORITY:
TIER 1 (Create First):
- types/*.ts
- lib/supabase/client.ts
- lib/constants.ts
- hooks/useAuth.ts

TIER 2:
- components/ui/*.tsx
- components/layout/*.tsx
- store/*.ts

TIER 3:
- components/products/*.tsx
- components/sections/*.tsx
- app/(storefront)/page.tsx

TIER 4:
- All remaining files

REPORT MISSING FILES AS:
MISSING: lib/utils/formatting.ts
SEVERITY: WARNING
DEPENDENCY COUNT: 5 files depend on this
REQUIRED BY:
- components/products/ProductCard.tsx
- app/(storefront)/page.tsx

TEMPLATE PROVIDED BELOW
```

---

## PROMPT 8: Fix CSS & Styling Errors

```
Debug and fix all CSS and Tailwind styling issues:

CHECK:
1. Global CSS file syntax (app/globals.css)
2. CSS module imports and references
3. Tailwind class validity (check against config)
4. Missing Tailwind config for custom colors/spacing
5. CSS variables are defined correctly
6. Font imports working properly
7. Animation definitions exist
8. Responsive classes are valid
9. No conflicting CSS rules
10. Dark mode setup (if used)

VALIDATE TAILWIND COLORS:
- primary (checks against tailwind.config.ts)
- secondary
- neutral
- All custom colors defined in config

VALIDATE FONTS:
- Inter font loaded
- Playfair Display font loaded
- Font variables set correctly in CSS

FIXES NEEDED:
1. Update tailwind.config.ts with missing colors
2. Add missing font imports
3. Fix CSS variable names
4. Fix invalid Tailwind classes
5. Add missing animations
6. Update global CSS

RESPONSE FORMAT:
FILE: app/globals.css
ERROR: Invalid CSS syntax at line 15
FIX: [Corrected CSS]

FILE: tailwind.config.ts
MISSING COLORS: primary, secondary (update config)
```

---

## PROMPT 9: Fix Package.json & Dependencies

```
Fix all package.json and dependency issues:

CHECK:
1. All dependencies are listed in package.json
2. Version conflicts resolved
3. All imported packages are installed
4. Dev vs production dependencies correct
5. Scripts are properly defined (dev, build, start, lint)
6. TypeScript version compatible
7. Node version compatible
8. No deprecated packages

VALIDATE DEPENDENCIES:
- react@18.x
- next@14.x
- @supabase/supabase-js@2.x
- zustand@4.x
- tailwindcss@3.x
- typescript@5.x

IF MISSING, ADD:
npm install [package-name]

SCRIPTS NEEDED:
- "dev": "next dev"
- "build": "next build"
- "start": "next start"
- "lint": "next lint"
- "type-check": "tsc --noEmit"

VERIFY INSTALLED:
Run: npm list
Report any missing or conflicting packages

THEN RUN:
npm install
npm run type-check
```

---

## PROMPT 10: Complete Project Audit & Health Check

```
Perform complete project health check and audit:

FULL AUDIT INCLUDES:

1. FILE STRUCTURE
   - Check all expected directories exist
   - Verify no unnecessary files
   - Check naming conventions

2. IMPORTS & EXPORTS
   - All imports resolve correctly
   - All exports are valid
   - No circular dependencies
   - All 'use client' directives where needed

3. TYPES & TYPESCRIPT
   - No implicit 'any'
   - All function returns typed
   - All props typed
   - Run: npx tsc --noEmit

4. COMPONENTS
   - All React components properly defined
   - All props validated
   - All hooks used correctly
   - No performance issues (React.memo, useCallback)

5. PAGES
   - All routes accessible
   - Proper layout nesting
   - Metadata exports present
   - Dynamic routes [id] working

6. API ROUTES
   - All methods exported
   - Error handling present
   - Proper response format
   - Auth checks in place

7. STYLING
   - Tailwind classes valid
   - CSS files syntax correct
   - Colors defined in config
   - Fonts loading properly

8. ENVIRONMENT
   - All .env variables defined
   - No hardcoded secrets
   - Environment validation working

9. DATABASE
   - Supabase connected
   - Schema matches code
   - RLS policies correct
   - Queries valid

10. DEPENDENCIES
    - All packages installed
    - Versions compatible
    - No conflicts
    - Scripts working

PROVIDE COMPREHENSIVE REPORT:
✅ PASSING: [List items passing]
⚠️  WARNING: [List warnings]
❌ ERRORS: [List critical errors with fixes]

GENERATE SUMMARY:
- Total Files: X
- Files with Errors: X
- Critical Issues: X
- Warnings: X
- Overall Health: X%

ACTION ITEMS (Prioritized):
1. [Critical fix 1]
2. [Critical fix 2]
...
```

---

## PROMPT 11: Generate Missing Files Batch

```
Create all missing critical files at once:

GENERATE THE FOLLOWING FILES WITH FULL CODE:

1. lib/utils/formatting.ts
   - formatCurrency()
   - formatDate()
   - slugify()

2. lib/utils/validation.ts
   - Email validation
   - Phone validation
   - Password validation

3. types/index.ts
   - Export all types from types/ directory

4. components/ui/Button.tsx
   - Button component with variants

5. components/ui/Card.tsx
   - Card component structure

6. hooks/useAuth.ts
   - Full authentication hook

7. store/authStore.ts
   - Zustand auth store

8. app/(storefront)/page.tsx
   - Home page with all sections

Each file should include:
- Full TypeScript types
- Proper imports
- Complete implementation
- Export statements
- Comments/documentation

ALSO CREATE:
- All missing type definition files
- All empty directories with .gitkeep
```

---

## PROMPT 12: Fix Runtime Errors

```
After running npm run dev, identify and fix runtime errors:

WHEN YOU SEE ERRORS IN BROWSER/CONSOLE:
1. Copy the exact error message
2. Get the full stack trace
3. Identify which file causes it
4. Find the problematic code line

COMMON RUNTIME ERRORS TO CHECK:
1. Cannot find module 'X'
   → Check import path
   → Run npm install if needed

2. 'X is not a function'
   → Check function is imported
   → Check export syntax

3. 'Cannot read property of undefined'
   → Add null checks
   → Fix optional chaining (?.)
   → Fix type guards

4. 'useAuth is not a hook'
   → Add 'use client' directive
   → Check hook is in hooks/ directory

5. Hydration mismatch
   → Check server/client code matches
   → Fix useEffect timing

6. 404 page not found
   → Verify file in correct app/ directory
   → Check route structure

7. Supabase connection error
   → Verify .env.local has keys
   → Check internet connection

FOR EACH ERROR:
1. Note the exact error message
2. Identify affected file
3. Provide fix with code
4. Explain the root cause
5. Suggest prevention

THEN:
1. Apply fixes
2. Restart dev server
3. Verify error is gone
```

---

## 🚀 How to Use These Prompts

### Step 1: Open VS Code
```bash
code jentara-apparel
```

### Step 2: Open VS Code Agent
- Press: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type: "Agent" or "GitHub Copilot Agent"
- Select the Agent option

### Step 3: Paste First Prompt
Copy PROMPT 1 (Initial Project Validation) and paste into Agent

### Step 4: Follow Recommendations
Agent will:
1. Scan all files
2. List errors in RED
3. Provide fixes

### Step 5: Apply Fixes
Either:
- Accept Agent's suggestions (click ✓)
- Copy code and apply manually
- Let Agent auto-fix

### Step 6: Repeat for Other Prompts
Go through prompts in order:
1. Initial validation
2. Import errors
3. Component issues
4. Type errors
5. Supabase errors
6. API routes
7. Missing files
8. CSS/styling
9. Dependencies
10. Full audit
11. Generate files
12. Runtime errors

---

## 📊 Expected Output

After running all prompts, you should see:

```
✅ PROJECT STATUS REPORT

Files Analyzed: 170
Files with Errors: 0
Warnings: 0
Type Errors: 0

✅ All imports working
✅ All types properly defined
✅ All components valid
✅ All pages accessible
✅ All API routes working
✅ Supabase connected
✅ Styling complete
✅ No circular dependencies

🎉 PROJECT READY FOR DEVELOPMENT!

npm run dev → http://localhost:3000
```

---

## 🔧 If Errors Persist

1. **Clear Cache**: `rm -rf .next && npm run dev`
2. **Reinstall**: `rm -rf node_modules && npm install`
3. **TypeScript Check**: `npx tsc --noEmit`
4. **Lint Check**: `npm run lint`
5. **Restart VS Code**: Close and reopen

---

## ⚡ Quick Commands to Run Manually

```bash
# Check for all TypeScript errors
npx tsc --noEmit

# Lint the project
npm run lint

# Start development server
npm run dev

# Build for production
npm run build

# Check all dependencies
npm ls

# Update dependencies
npm update
```

---

## 📝 Keep This Handy

Save this file in your project root:
```
project-root/DEBUG_PROMPTS.md
```

Then use whenever you need to debug!

