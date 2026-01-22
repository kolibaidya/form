# Koli's Tasks

## Task 1: Fix the Sidebar (Priority!)

The sidebar is not displaying.

**Hint:** The shadcn sidebar documentation shows the structure. Compare your `DashboardLayout` with the example. What's missing around the main content area?

---

## Task 2: Rename Sidebar

Rename `src/components/app-Sidebar.tsx` to `src/components/sidebar.tsx`

**Think about:** What else needs to change when you rename a file?

---

## Task 3: Implement Login with Zustand

Keep using React Hook Form and TanStack Query. Just add Zustand for auth state.

### Step 3a: Install Zustand

```bash
bun add zustand
```

### Step 3b: Create Auth Store

Create `src/stores/authStore.ts`

**Think about:**

- What user info do you want to store?
- What actions does the store need?

**Question:** Do you need a Provider for Zustand like you do for React Query?

### Step 3c: Update useLogin Hook

Modify `src/hooks/userHooks.tsx`:

1. Import the auth store
2. On successful login, update the Zustand store with user data
3. Keep using TanStack Query for the API call
4. Keep using React Hook Form's setError for validation

### Step 3d: Add Login Endpoint to Backend

Add `POST /api/auth/login` to `backend/index.ts`

**Hint:** Export `getUserByUsername` and `verifyPassword` from `backend/db.ts` first.

### Step 3e: Use Backend URL

Update `useLogin` to call your Bun backend at `http://localhost:3000` instead of `fakestoreapi.com`

---

## Task 4: Protect Dashboard Routes

Users should only access `/dashboard/*` if logged in.

**Think about:** Where should the auth check happen?

**Options to consider:**

1. Check Zustand store in each page component?
2. Create a wrapper component?
3. Check in React Router's routing?

**Hint:** How does the current login page redirect to products on success? Can you do the reverse check?

---

## Task Summary

1. [x] Fix sidebar not displaying
2. [x] Rename sidebar file to sidebar.tsx
3. [x] Install Zustand
4. [x] Create authStore.ts
5. [x] Export auth helpers from backend/db.ts
6. [x] Add login endpoint to backend/index.ts
7. [x] Update useLogin to use Zustand + your backend
8. [x] Protect dashboard routes

## Post Tasks

1. [] Fix Login Bug
2. [] Allow the Sidebar to be available on all pages so users can navigate

---

## Resources

- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query Mutations](https://tanstack.com/query/latest/docs/guides/mutations)
