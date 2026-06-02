# 🤖 Complete VS Code Agent Guide - Step by Step

## 📖 How to Access VS Code Agent

### Method 1: Using GitHub Copilot (Recommended)
```
1. Install GitHub Copilot extension (if not installed)
   - Go to Extensions (Ctrl+Shift+X)
   - Search "GitHub Copilot"
   - Click Install

2. Sign in with GitHub account
   - Click Copilot icon
   - Follow authentication

3. Open Agent
   - Press: Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)
   - Type: "Copilot: Open Agent" or "Agent"
   - Select "Copilot: Open Agent in New Chat"
```

### Method 2: Using Built-in Chat (VS Code 1.90+)
```
1. Press: Ctrl+Shift+I (Windows/Linux) or Cmd+Shift+I (Mac)
   OR
   Click Chat icon in sidebar

2. Type your prompt

3. Click @ symbol to select Agent
```

---

## 🎯 MAIN PROMPT - Copy & Paste This

```
@workspace

I have a Next.js e-commerce project (Jentara Apparel) with many TypeScript and React files showing errors in red in VS Code. 

Please help me:

1. IDENTIFY ALL ERRORS
   - Scan all .ts, .tsx, .js, .css files
   - List every error with: FILE PATH | ERROR TYPE | LINE NUMBER | ERROR MESSAGE | SEVERITY
   - Mark errors as CRITICAL (RED) or WARNING (YELLOW)

2. PRIORITIZE CRITICAL ERRORS
   - Show CRITICAL errors first
   - These must be fixed before app runs:
     * Missing 'use client' directives
     * Import/module errors
     * Type definition errors
     * Missing required files
     * Broken component exports

3. PROVIDE SPECIFIC FIXES
   For each file with errors:
   - Show the problematic code (WRONG)
   - Show the corrected code (RIGHT)
   - Explain the root cause
   - Provide line number where to apply fix

4. CREATE MISSING FILES
   - If files don't exist, create them with full content
   - Include proper imports and exports
   - Add TypeScript types
   - Add comments explaining the code

5. FIX IMPORTS IN THIS ORDER
   1. lib/supabase/client.ts (foundation)
   2. lib/constants.ts 
   3. types/*.ts (all type files)
   4. hooks/use*.ts (all hooks)
   5. store/*.ts (all stores)
   6. components/**/*.tsx (all components)
   7. app/**/*.tsx (all pages)

6. VALIDATE CONFIGURATION
   - Check tsconfig.json paths are correct (@/ alias)
   - Verify package.json has all dependencies
   - Ensure .env.local has required variables
   - Check tailwind.config.ts is properly set up

7. GENERATE SUMMARY
   - Total files analyzed
   - Files with errors
   - Critical issues count
   - Warnings count
   - Overall status

Start now and provide all errors in a clear table format with fixes.
```

---

## 📋 FOLLOW-UP PROMPTS

### If Agent Finds Many Errors:

#### Prompt 2: Fix Import Issues
```
@workspace

I see import errors in my Next.js project. Please:

1. Find all "Cannot find module" errors
2. Check if files exist
3. Fix import paths (especially @/ aliases)
4. Add 'use client' directives where needed
5. Fix relative imports like ../ and ./

Format response as:
FILE: path/to/file.tsx
ERROR: [Import error message]
CURRENT: [Wrong import]
FIXED: [Correct import]
ACTION: [What to do]

Start with lib/ and types/ directories first.
```

#### Prompt 3: Fix Type Errors
```
@workspace

Fix all TypeScript type errors:

1. Find implicit 'any' types
2. Fix type mismatches
3. Add proper interface definitions
4. Fix React.FC and component prop types
5. Fix promise and async return types

Format as:
FILE: path/to/file.ts
ERROR: [Type error]
LINE: XX
PROBLEM: [Why it's wrong]
SOLUTION: [Corrected code]

Run: npx tsc --noEmit
Show all errors from that command.
```

#### Prompt 4: Create Missing Files
```
@workspace

Create all missing files with full implementations:

Files to create:
1. lib/supabase/client.ts
2. lib/constants.ts
3. lib/utils/formatting.ts
4. types/index.ts
5. types/product.ts
6. hooks/useAuth.ts
7. store/authStore.ts
8. components/ui/Button.tsx
9. components/layout/Navbar.tsx
10. app/page.tsx (home page)

For each file:
- Provide complete, working code
- Include all necessary imports
- Add TypeScript types
- Add comments
- Make sure it exports properly

Start with tier 1 files (lib/ and types/)
```

#### Prompt 5: Fix Component Issues
```
@workspace

Fix all React component errors:

Check each .tsx file for:
1. Missing 'use client' directive (client components)
2. Proper React imports
3. Correct component export (default or named)
4. All props have interfaces
5. Proper hook usage
6. Missing child component imports
7. Event handlers properly typed
8. No undefined variables

Format:
FILE: components/path/Component.tsx
ISSUES: [List issues found]
1. [Issue 1]
2. [Issue 2]
...
FIXED CODE: [Provide corrected component]
```

#### Prompt 6: Full Workspace Audit
```
@workspace

Perform complete project audit. Check:

1. Structure - All required directories exist
2. Files - All expected files are present
3. Imports - All imports resolve correctly
4. Types - No implicit 'any', all typed
5. Exports - All exports valid
6. Dependencies - All packages installed
7. Config - tsconfig, tailwind, next.config OK
8. Environment - .env.local properly set up
9. Database - Supabase schema matches code
10. Styles - Tailwind classes valid

Provide report:
✅ PASSING: [List items OK]
⚠️  WARNING: [List warnings]  
❌ ERRORS: [List critical errors with fixes]

SUMMARY:
- Total files: X
- Files with errors: X
- Critical issues: X
- Status: READY / NOT READY
```

---

## 🔥 URGENT FIX - If App Won't Start

Use this prompt if you get errors when running `npm run dev`:

```
@workspace

My Next.js app won't start. When I run "npm run dev" I get these errors:

[PASTE THE ERROR MESSAGES HERE]

Please:

1. Identify the root cause
2. Find which file is causing the error
3. Show me the problematic code
4. Provide the exact fix
5. Tell me what command to run next

Prioritize making the app at least start (even with warnings).
```

---

## 📊 ORGANIZED RESPONSE FORMAT

Ask the agent to format responses like this:

```
@workspace

Please organize your response in this exact format:

## 📊 SUMMARY
- Total Files: X
- Total Errors: X  
- Critical: X
- Warnings: X

## 🔴 CRITICAL ERRORS (Must Fix First)
### Error 1: [Error Type] - [File]
- Line: XX
- Current Code: [code block]
- Issue: [explanation]
- Fix: [corrected code]
- Severity: CRITICAL

[Repeat for all critical errors]

## 🟡 WARNINGS (Should Fix)
[Same format as critical]

## ✅ PASSING VALIDATION
- Import structure: ✓
- Type definitions: ✓
- Component exports: ✓
[etc]

## 📝 ACTION ITEMS
1. [Fix 1] - Priority: CRITICAL
2. [Fix 2] - Priority: HIGH
[Prioritized list]

## 🚀 NEXT STEPS
1. Apply these fixes in order
2. Run: [command]
3. Check for errors
4. If errors remain, run: [command]
```

---

## 🎮 Real-Time Workflow

### When Using Agent in VS Code:

**1. Start Analysis**
```
Open Agent (Ctrl+Shift+P → Copilot: Open Agent)
Paste: MAIN PROMPT (above)
Wait for Agent to analyze
```

**2. Review Findings**
```
Read the error list
Note which files have RED errors (critical)
Check file paths are correct
```

**3. Apply Fixes**
```
For each error:
- Click "Accept" to let Agent create file
- OR copy the corrected code
- Apply to your file
- Save (Ctrl+S)
```

**4. Clear Cache & Restart**
```bash
# In terminal:
rm -rf .next
npm install
npm run dev
```

**5. Check Results**
```
- Go to http://localhost:3000
- Check Problems panel (Ctrl+Shift+M)
- Should show: 0 errors
```

---

## 💡 AGENT TIPS & TRICKS

### Tip 1: Ask for Specific File Help
```
@workspace /file:app/page.tsx

This file is showing errors. Fix all errors in this single file.
Show me the complete corrected file.
```

### Tip 2: Ask for Batch Creation
```
@workspace

Create these 5 files at once with all necessary code:
1. lib/utils/formatting.ts
2. lib/utils/validation.ts  
3. types/index.ts
4. hooks/useAuth.ts
5. components/ui/Button.tsx

Each file should be production-ready and fully typed.
```

### Tip 3: Ask for Explanation
```
@workspace

I don't understand this error: "[error message]"

Explain in simple terms:
1. What does it mean?
2. Why is it happening?
3. How do I fix it?
4. How do I prevent it in future?
```

### Tip 4: Ask for Code Review
```
@workspace /file:components/products/ProductCard.tsx

Review this component for:
1. React best practices
2. TypeScript type safety
3. Performance issues
4. Accessibility
5. Any potential bugs

Suggest improvements with corrected code.
```

---

## 🔗 RELATED COMMANDS

Inside Agent, you can also use:

```
@workspace - Access entire project context
/file:path/to/file.tsx - Focus on specific file
/folder:components - Focus on entire folder

Examples:
@workspace /file:app/layout.tsx
@workspace /folder:lib
@workspace Check types/ directory
```

---

## 📞 If Agent Gets Stuck

### Restart Agent:
```
1. Close chat (X button)
2. Press Ctrl+Shift+P
3. Type: "Clear Copilot Cache" (if available)
4. Open Agent again
5. Try simplified prompt
```

### Try Simpler Prompt:
```
Instead of long prompt, try:

@workspace

What files have TypeScript errors? 
List them with line numbers.
```

### Check Agent Limitations:
- Agent might not see hidden files
- Agent might timeout on very large projects
- Agent might need you to save files first

---

## ✅ VERIFICATION CHECKLIST

After Agent fixes everything, verify:

```bash
# 1. No type errors
npx tsc --noEmit
# Should show: 0 errors

# 2. Lint check
npm run lint
# Should show: 0 errors

# 3. Dependencies OK
npm ls
# Should show: no problems

# 4. Dev server starts
npm run dev
# Should show: ✓ Ready in XXXms

# 5. Browser loads
# Visit http://localhost:3000
# Should show home page without errors
```

---

## 🎯 SUCCESS CRITERIA

Your project is ready when:

✅ No RED files in file explorer  
✅ Problems panel is empty (Ctrl+Shift+M)  
✅ `npm run dev` runs without errors  
✅ Browser loads http://localhost:3000  
✅ No errors in browser console  
✅ `npx tsc --noEmit` shows 0 errors  

---

## 🚀 AFTER ERRORS ARE FIXED

Once everything is working:

```bash
# 1. Build for production
npm run build

# 2. Start production server
npm run start

# 3. Deploy to Vercel
npm i -g vercel
vercel

# 4. Your site is live!
```

---

## 📝 SAVE THIS WORKFLOW

Create a file: `VS_CODE_AGENT_GUIDE.md`  
Copy this entire document into it  
Reference it whenever you need Agent help

