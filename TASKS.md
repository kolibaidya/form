# Frontend Tasks

## Goal
Connect the Phones feature to the local backend API instead of CRUDCRUD.

## Prerequisites
- Backend server must be running on port 3000
- Backend routes are already implemented (do not modify backend code)

## Tasks

### 1. Update API Base URL
**File**: `src/hooks/phoneHooks.tsx`

Change the phone API calls from CRUDCRUD to the local backend.

Current URL:
- `https://crudcrud.com/api/9a04c33a8e434334856644cbd1dd4710`

Target URL:
- `http://localhost:3000/api/phones`

Update all fetch calls:
- `useFetchPhones`
- `useCreatePhones`
- `useEditPhone`
- `useDeletePhone`

### 2. Fix API Endpoints
**File**: `src/hooks/phoneHooks.tsx`

The backend uses `/api/phones` as the base path, but CRUDCRUD used `/phone`.

Update the endpoint paths:
- GET: `/api/phones`
- POST: `/api/phones`
- PUT: `/api/phones/:id`
- DELETE: `/api/phones/:id`

### 3. Test Phone CRUD Operations

After making changes, test all operations on the Phones page:

1. **Create Phone**: Click "Create Phone" button, fill form, submit
2. **View Phones**: Phones should display in the table after refresh
3. **Edit Phone**: Click "Edit" on any phone, modify fields, save
4. **Delete Phone**: Click "Delete", confirm deletion

### 4. Verify Response Data Format

The backend returns phones with this structure:
```typescript
{
  _id: string,           // String ID, not number
  Brand: string,         // PascalCase, matching CRUDCRUD format
  Name: string,
  ReleaseDate: string
}
```

Ensure the frontend Phone interface in `src/models/phone.tsx` matches this format.

### 5. Fix Login Persistence Bug
**Bug**: When logged in successfully, if you refresh the page (by hitting F5), the user logs out.

**Expected behavior**: User should stay logged in after page refresh.

**Hint**: The authentication state is stored in memory. Consider where user data could be persisted so it survives page reloads.

### 6. Fix Layout Width Issue
**Bug**: Dashboard content appears squashed to the left side of the screen and doesn't use the full available width.

**Expected behavior**: Content should expand to fill the entire content area between the sidebar and the right edge of the screen.

**Files to check**:
- `src/layouts/dashboardLayout.tsx`
- `src/layouts/mainLayout.tsx`
- `src/pages/productPage.tsx`
- `src/pages/phonePage.tsx`
- `src/components/table/productTable.tsx`

**Acceptance criteria**:
- Content fills the full width of the content area
- No unnecessary margins or max-width constraints
- Responsive design still works on mobile devices
- Table columns use available space appropriately

### 7. Add Page Loading Animation
**Task**: Create a nice loading animation that displays when navigating to the dashboard after login.

**Current behavior**: The page content appears instantly without any loading indicator.

**Expected behavior**: Show an elegant loading animation/transition while the dashboard data is being fetched.

**Requirements**:
- Create a visually appealing loading animation (spinner, skeleton, or creative alternative)
- Display during the transition from login page to dashboard
- Should be smooth and not jarring
- Must respect `prefers-reduced-motion` for accessibility

**Testing tip**: Chrome loads very quickly in development mode. To properly test your animation:
1. Open Chrome DevTools (F12)
2. Go to the "Network" tab
3. Click the throttling dropdown (usually shows "No throttling")
4. Select "Slow 3G" or "Fast 3G"
5. Now test the login flow and observe your loading animation

**Files to modify**:
- Create or modify loading components
- Update login flow to show loading state
- May need to modify route transitions

## Acceptance Criteria

- [ ] Phones page loads without errors
- [ ] Create Phone form creates a new phone successfully
- [ ] Phone appears in the table after creation
- [ ] Edit Phone modifies existing phone correctly
- [ ] Delete Phone removes phone from the table
- [ ] All changes persist after page refresh
- [ ] Error messages display correctly if backend is unavailable
- [ ] User stays logged in after refreshing the page (F5)
- [ ] User is redirected to login if accessing dashboard while logged out

## Notes

- Backend already supports the Phone interface format (Brand, Name, ReleaseDate with PascalCase)
- Backend generates unique string IDs matching CRUDCRUD format
- Do not modify backend code - only frontend hooks
- Backend runs on `http://localhost:3000`
