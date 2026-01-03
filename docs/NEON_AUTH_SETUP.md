# Neon Auth Setup Guide

This guide explains how Neon Auth is integrated into your Next.js application.

## ✅ Installation Complete

The following packages have been added:
- `@neondatabase/neon-js` - Neon Auth SDK

## 🔧 Configuration

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Neon Auth
NEXT_PUBLIC_NEON_AUTH_URL=https://ep-steep-term-a423wf0o.neonauth.us-east-1.aws.neon.tech/neondb/auth
```

**Note:** Replace the URL above with your actual Neon Auth URL from your Neon dashboard.

### 2. Files Created

- `lib/neon-auth.ts` - Neon Auth client configuration
- `components/auth/NeonAuthProvider.tsx` - Provider component for Neon Auth context
- `app/auth/[...pathname]/page.tsx` - Auth pages (sign-in, sign-up)
- `app/account/[...pathname]/page.tsx` - Account management pages

### 3. Root Layout Updated

The `app/layout.tsx` has been updated to include the `NeonAuthProvider` wrapper.

## 🚀 Usage

### Authentication Routes

Neon Auth provides the following routes:

- `/auth/sign-in` - Sign in page
- `/auth/sign-up` - Sign up page
- `/account/profile` - User profile management
- `/account/password` - Password management
- `/account/sessions` - Active sessions management

### Integration Options

You have two options for authentication:

#### Option 1: Use Neon Auth Only (Recommended for new projects)

1. Remove or disable NextAuth.js
2. Update middleware to use Neon Auth sessions
3. Use Neon Auth's built-in user management

#### Option 2: Hybrid Approach (Current Setup)

1. Keep NextAuth.js for session management
2. Use Neon Auth for user registration and password management
3. Sync users between Neon Auth and your database

## 📝 Next Steps

### 1. Get Your Neon Auth URL

1. Go to your Neon dashboard
2. Navigate to your project settings
3. Find the "Neon Auth" section
4. Copy your Auth URL
5. Add it to `.env.local` as `NEXT_PUBLIC_NEON_AUTH_URL`

### 2. Test Authentication

1. Start your dev server: `npm run dev`
2. Navigate to `/auth/sign-up` to create an account
3. Navigate to `/auth/sign-in` to sign in
4. Navigate to `/account/profile` to manage your account

### 3. Integrate with Your Dashboard

Update your login page (`app/login/page.tsx`) to redirect to Neon Auth:

```typescript
// Option: Redirect to Neon Auth
router.push("/auth/sign-in");

// Or: Use Neon Auth components directly
import { AuthView } from "@neondatabase/neon-js/auth/react";
```

### 4. Update Middleware (If using Neon Auth only)

If you want to use Neon Auth for session management, update `middleware.ts`:

```typescript
import { authClient } from "@/lib/neon-auth";

export async function middleware(request: NextRequest) {
  const session = await authClient.getSession();
  // ... rest of your middleware logic
}
```

## 🔄 Migration from NextAuth to Neon Auth

If you want to fully migrate from NextAuth to Neon Auth:

1. **Update Session Management:**
   - Replace `auth()` calls with `authClient.getSession()`
   - Update all components using `useSession()` from NextAuth

2. **Update Login/Signup Pages:**
   - Replace custom forms with Neon Auth components
   - Or redirect to `/auth/sign-in` and `/auth/sign-up`

3. **Update Middleware:**
   - Replace NextAuth session checks with Neon Auth session checks

4. **Update Dashboard Layout:**
   - Replace NextAuth session with Neon Auth session

## 🎨 Customization

Neon Auth components can be customized with CSS. The styles are imported from `@neondatabase/neon-js/ui/css` in the provider component.

You can override styles by adding custom CSS:

```css
/* app/globals.css */
.neon-auth-container {
  /* Your custom styles */
}
```

## 📚 Documentation

- [Neon Auth Documentation](https://neon.tech/docs/auth)
- [Neon Auth React Components](https://neon.tech/docs/auth/react)

## ⚠️ Important Notes

1. **Environment Variables:** Make sure `NEXT_PUBLIC_NEON_AUTH_URL` is set correctly
2. **Client-Side Only:** Neon Auth components must be used in client components (`"use client"`)
3. **Fallback:** If Neon Auth URL is not configured, the app will fall back to NextAuth.js
4. **Database Sync:** If using both systems, ensure user data is synced between Neon Auth and your database

---

**Status:** ✅ Neon Auth integrated and ready to use!

