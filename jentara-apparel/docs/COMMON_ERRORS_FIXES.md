# 🔴 Common Errors & Quick Fixes for Jentara Apparel

## RED FILE MARKERS - What They Mean

When files appear in RED in VS Code:
- ❌ **Syntax Errors** - Invalid code structure
- ❌ **Import Errors** - Missing or broken imports
- ❌ **Type Errors** - TypeScript type mismatches
- ❌ **Reference Errors** - Undefined variables/functions
- ❌ **Module Not Found** - Missing files or packages

---

## 🔧 TOP 10 MOST COMMON ERRORS & FIXES

### ❌ ERROR 1: Module not found

```
Error: Cannot find module '@/lib/supabase/client'
```

**Cause**: File doesn't exist or path is wrong

**Fix Option 1**: Create the missing file
```bash
# Create file
touch lib/supabase/client.ts

# Add content
echo "export const supabase = null;" > lib/supabase/client.ts
```

**Fix Option 2**: Fix the import path
```typescript
// WRONG
import { supabase } from '@/lib/supabase/client'

// RIGHT (if file is in lib/supabaseClient.ts)
import { supabase } from '@/lib/supabaseClient'
```

**How to Find**: 
- Check if file exists: `ls lib/supabase/client.ts`
- If not, create it OR
- Find where file actually is and update import

---

### ❌ ERROR 2: 'use client' directive missing

```
Error: useState/useEffect/useContext can only be used in Client Components
```

**Cause**: Using client-only hooks in server components

**Fix**: Add 'use client' at top of file
```typescript
'use client'  // ← Add this line at the very top

import { useState } from 'react'

export default function MyComponent() {
  const [state, setState] = useState('')
  // ... rest of code
}
```

**Which files need 'use client'**:
- Any file using `useState`, `useEffect`, `useContext`
- Any file using custom hooks (useAuth, useCart, etc)
- Any component with event handlers (onClick, onChange)
- Any component using 'use server' functions

---

### ❌ ERROR 3: Cannot find name 'React'

```
Error: Cannot find name 'React'. Did you forget to import it from 'react'?
```

**Cause**: Missing React import

**Fix**: Add React import
```typescript
// WRONG
export default function Home() {
  return <div>Hello</div>
}

// RIGHT (Option 1: With React import)
import React from 'react'
export default function Home() {
  return <div>Hello</div>
}

// RIGHT (Option 2: Next.js 13+ doesn't require this)
// Just make sure you export a component
export default function Home() {
  return <div>Hello</div>
}
```

---

### ❌ ERROR 4: Expected object, got string (TypeScript)

```
Error: Type 'string' is not assignable to type 'Product'
```

**Cause**: Type mismatch in TypeScript

**Fix**: Check your type definitions
```typescript
// WRONG
const product: Product = 'not a product'

// RIGHT
interface Product {
  id: string
  name: string
  price: number
}

const product: Product = {
  id: '123',
  name: 'Shirt',
  price: 99
}
```

**Solution Steps**:
1. Find the variable that's RED
2. Hover over it to see expected type
3. Make sure value matches the type
4. If types are wrong, fix the interface

---

### ❌ ERROR 5: JSX element type is not valid

```
Error: Cannot use namespace as a type. Did you mean to use 'typeof Button'?
```

**Cause**: Component not properly exported

**Fix**: Check component exports
```typescript
// WRONG - No default export
export function Button() {
  return <button>Click me</button>
}

// RIGHT
export default function Button() {
  return <button>Click me</button>
}

// OR use named export
export function Button() {
  return <button>Click me</button>
}
// Then import as: import { Button } from '@/components/ui/Button'
```

---

### ❌ ERROR 6: Function overload not matching

```
Error: No overload matches this call. Overload 1 of X had the following error...
```

**Cause**: Function called with wrong argument types

**Fix**: Check function signature
```typescript
// Function definition
function fetchProduct(id: string): Promise<Product> {
  // ...
}

// WRONG - passing number
fetchProduct(123)

// RIGHT - passing string
fetchProduct('123')
```

---

### ❌ ERROR 7: Property does not exist on type

```
Error: Property 'price' does not exist on type 'Product'
```

**Cause**: Accessing undefined property

**Fix 1**: Add property to type
```typescript
// types/product.ts
interface Product {
  id: string
  name: string
  // ADD missing property:
  price: number  // ← ADD THIS
}
```

**Fix 2**: Use optional chaining
```typescript
// Instead of
const price = product.price

// Use
const price = product?.price ?? 0
```

---

### ❌ ERROR 8: Default export not found

```
Error: Module has no default export. Did you mean to use a named export?
```

**Cause**: Component has named export but imported as default

**Fix**: 
```typescript
// If file has default export
export default function Button() {}

// Import as default
import Button from '@/components/ui/Button'

// If file has named export
export function Button() {}

// Import as named
import { Button } from '@/components/ui/Button'
```

---

### ❌ ERROR 9: Path aliases not working

```
Error: Cannot find module '@/components/Button' (@ alias not working)
```

**Cause**: tsconfig.json not configured properly

**Fix**: Update tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Then restart VS Code: `Ctrl+K Ctrl+W` (close all) and reopen

---

### ❌ ERROR 10: Supabase type mismatch

```
Error: Type 'Database' is not defined
```

**Cause**: Missing Supabase type definition

**Fix**: Create types for Supabase
```typescript
// types/database.ts
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
        }
      }
    }
  }
}

// Then use in client
import type { Database } from '@/types/database'
const supabase = createClient<Database>(url, key)
```

---

## 🔴 Files Commonly Appearing in RED

### Problem Files to Check First:

#### 1. **lib/supabase/client.ts** (CRITICAL)
```typescript
// Should look like this:
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**If RED**: Check if file exists. If not, create it.

---

#### 2. **types/index.ts** (IMPORTANT)
```typescript
// Should export all types:
export type { Product } from './product'
export type { Order } from './order'
export type { User } from './user'
// ... etc
```

**If RED**: File probably missing. Create it with exports above.

---

#### 3. **lib/constants.ts** (IMPORTANT)
```typescript
export const APP_CONFIG = {
  name: 'Jentara Apparel',
  tagline: 'Star of the new generation',
}

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const PRODUCT_COLORS = ['Black', 'White', 'Beige', 'Brown']
```

**If RED**: File missing. Create it.

---

#### 4. **components/ui/Button.tsx**
```typescript
'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded font-semibold`}
      {...props}
    >
      {children}
    </button>
  )
}
```

**If RED**: Create this file.

---

## 🔍 How to Find the Actual Error

### Step 1: Look at Problem Panel
- Open: `View → Problems` or `Ctrl+Shift+M`
- This shows ALL errors with file paths

### Step 2: Click on Error
- Clicking error takes you to exact line
- Read the error message carefully

### Step 3: Understand the Error Type

| Error Type | What to Check |
|-----------|--------------|
| `TS2552` | Missing import or property doesn't exist |
| `TS7053` | Element implicitly has type 'any' |
| `TS2307` | Cannot find module |
| `TS1192` | Module has no default export |
| `TS2349` | Cannot call function |

### Step 4: Apply the Fix

Use the error message to guide you:
- "Cannot find module" → Create the file
- "Property does not exist" → Add property to type
- "Not a function" → Check export
- "Use client" error → Add 'use client' at top

---

## ⚡ Quick Debug Checklist

When files are RED, check these in order:

- [ ] **File exists** - Does the file actually exist? (Check in file explorer)
- [ ] **Imports correct** - Are imports using right paths? (@/ alias working?)
- [ ] **Exports correct** - Is function/component exported properly?
- [ ] **Types match** - Are types properly defined and matching?
- [ ] **Dependencies installed** - Run `npm install` if packages are missing
- [ ] **Environment variables** - Is .env.local filled out?
- [ ] **Syntax correct** - No missing semicolons, brackets, etc?
- [ ] **'use client' added** - Client components have it?

---

## 🚀 Multi-Step Fix Process

### When You See RED Files:

**STEP 1: Immediate Actions**
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
npm install

# Restart VS Code
# (Close window Ctrl+K Ctrl+W, then reopen)
```

**STEP 2: Run Type Check**
```bash
npx tsc --noEmit
# This shows ALL TypeScript errors with line numbers
```

**STEP 3: Check Each Error**
```
For each error in output:
1. Open the file
2. Go to line number
3. Read the error
4. Apply the fix from this guide
5. Save file (Ctrl+S)
```

**STEP 4: Test**
```bash
npm run dev
# Check if errors are gone
# If you see errors in browser, scroll down to see full message
```

---

## 📋 File Creation Checklist

If many files are RED, CREATE these in order:

```bash
# 1. Type definitions (foundation)
touch types/index.ts types/product.ts types/order.ts types/user.ts

# 2. Constants
touch lib/constants.ts lib/config.ts

# 3. Supabase
touch lib/supabase/client.ts

# 4. Utilities
touch lib/utils/formatting.ts lib/utils/validation.ts

# 5. Basic UI components
touch components/ui/Button.tsx components/ui/Card.tsx components/ui/Input.tsx

# 6. Layout
touch components/layout/Navbar.tsx components/layout/Footer.tsx

# 7. Hooks
touch hooks/useAuth.ts hooks/useCart.ts

# 8. Stores
touch store/authStore.ts store/cartStore.ts

# 9. Pages
touch app/page.tsx
```

---

## 🆘 If Nothing Works

### Nuclear Option (Reset Everything)
```bash
# 1. Delete node_modules and lock file
rm -rf node_modules package-lock.json

# 2. Delete cache
rm -rf .next

# 3. Reinstall
npm install

# 4. Restart VS Code
# Close and reopen VS Code

# 5. Try dev again
npm run dev
```

### Check System Issues
```bash
# Check Node version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version

# Check Git (optional but recommended)
git --version
```

---

## 📞 Getting More Help

### Inside VS Code Agent:
```
"I'm getting these errors in red:
[Copy error messages from Problems panel]

Can you fix them one by one?"
```

### Try These Commands
```bash
# See all errors
npm run lint

# Check TypeScript
npx tsc --noEmit

# Check for missing dependencies
npm list

# Update all packages
npm update
```

---

## ✅ Success Indicators

Your project is working when:
- [ ] No RED files in file explorer
- [ ] Problems panel is empty
- [ ] `npm run dev` works
- [ ] Browser shows: http://localhost:3000
- [ ] No errors in browser console
- [ ] All pages load without 404

