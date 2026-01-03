# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication with Neon Auth in your Next.js application.

## ✅ Implementation Complete

Google OAuth has been integrated into the authentication flow. Users can now sign in with their Google accounts.

## 🔧 Configuration Steps

### 1. Set Up Google OAuth in Google Cloud Console

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select an existing one

2. **Enable Google+ API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity Services API"

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application" as the application type
   - Add authorized redirect URIs:
     ```
     http://localhost:3000/auth/sign-in
     https://your-domain.com/auth/sign-in
     ```
   - Copy the **Client ID** and **Client Secret**

### 2. Configure Neon Auth Dashboard

1. **Access Neon Auth Dashboard**
   - Go to your Neon dashboard
   - Navigate to the "Neon Auth" section
   - Find "OAuth Providers" or "Social Login" settings

2. **Add Google Provider**
   - Click "Add Provider" or "Configure OAuth"
   - Select "Google" from the list
   - Enter your Google OAuth credentials:
     - **Client ID**: Your Google OAuth Client ID
     - **Client Secret**: Your Google OAuth Client Secret
   - Save the configuration

3. **Set Redirect URLs**
   - Ensure your Neon Auth redirect URL is set to:
     ```
     https://your-neon-auth-url.neonauth.us-east-1.aws.neon.tech/neondb/auth/callback
     ```
   - Or use the callback URL provided by Neon Auth

### 3. Environment Variables

No additional environment variables are needed for Google OAuth when using Neon Auth. The OAuth credentials are configured directly in the Neon Auth dashboard.

However, ensure you have:
```env
NEXT_PUBLIC_NEON_AUTH_URL="https://your-neon-auth-url.neonauth.us-east-1.aws.neon.tech/neondb/auth"
```

### 4. Test Google OAuth

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to sign-in page**
   - Go to: `http://localhost:3000/auth/sign-in`
   - You should see a "Continue with Google" button

3. **Test the flow**
   - Click "Continue with Google"
   - You'll be redirected to Google's consent screen
   - After granting permission, you'll be redirected back
   - You should be automatically signed in and redirected to the dashboard

## 🎨 UI Features

The Google OAuth button includes:
- ✅ Google logo and branding
- ✅ Loading states during OAuth flow
- ✅ Error handling for failed authentications
- ✅ Automatic user sync to database
- ✅ Seamless redirect to dashboard after successful auth

## 🔄 OAuth Flow

1. **User clicks "Continue with Google"**
   - Client initiates OAuth flow via `authClient.signIn.oauth()`
   - User is redirected to Google's consent screen

2. **Google Authentication**
   - User grants permissions
   - Google redirects back with authorization code

3. **Callback Processing**
   - Auth page detects OAuth callback parameters
   - Exchanges code for user information
   - Creates/updates user in database
   - Sets session cookie
   - Redirects to dashboard

## 📝 User Sync

OAuth users are automatically synced to your database:
- User ID from OAuth provider
- Email address
- Name (from Google profile)
- Default role: "patient" (can be changed later)

## 🔒 Security Notes

1. **HTTPS Required in Production**
   - OAuth requires HTTPS in production
   - Ensure your production domain uses SSL

2. **Redirect URI Validation**
   - Google validates redirect URIs
   - Ensure all redirect URIs are registered in Google Cloud Console

3. **State Parameter**
   - Neon Auth handles CSRF protection via state parameter
   - This is automatically managed by the SDK

## 🐛 Troubleshooting

### Issue: "OAuth authentication failed"
- **Check**: Google OAuth credentials in Neon Auth dashboard
- **Check**: Redirect URIs match exactly in Google Cloud Console
- **Check**: Google+ API is enabled

### Issue: Redirect loop
- **Check**: Callback URL is correctly configured
- **Check**: No conflicting middleware redirects

### Issue: User not created in database
- **Check**: `/api/auth/sync-user` endpoint is working
- **Check**: Database connection is active
- **Check**: User table schema matches expected structure

## 📚 Additional Resources

- [Neon Auth Documentation](https://neon.tech/docs/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Status:** ✅ Google OAuth fully integrated and ready to use!

