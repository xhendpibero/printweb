# Authentication System - How to Use

## 🚀 **How to Access the Dashboard**

### **Method 1: Direct URL Access**
1. Go to `http://localhost:3000/en/dashboard`
2. If not authenticated, you'll be redirected to the home page
3. Click the "Sign In" button in the main header
4. You'll be automatically signed in and can access the dashboard

### **Method 2: Sign In from Main Site**
1. Visit the main site: `http://localhost:3000/en`
2. Look for the "Sign In" button in the top-right corner
3. Click "Sign In" - this will automatically authenticate you
4. Navigate to dashboard via the user avatar dropdown or direct URL

## 🔧 **Technical Details**

### **Mock Authentication System:**
- **No real login required** - clicking "Sign In" automatically authenticates you
- **Persistent sessions** - uses localStorage to maintain login across page reloads
- **24-hour expiration** - sessions automatically expire after 24 hours
- **Mock user data** - uses predefined user "John Doe" with avatar

### **Authentication Flow:**
```
Guest User → Click "Sign In" → Authenticated → Access Dashboard
     ↓                           ↓
[Sign In Button]            [User Avatar]
                                 ↓
                         [Dashboard, Settings, Sign Out]
```

### **Key Features:**
✅ **Automatic sign-in** - No credentials needed for development
✅ **Session persistence** - Stays logged in across browser sessions
✅ **User avatar** - Auto-generated avatar with user initials
✅ **Dropdown menu** - Quick access to Dashboard and Settings
✅ **Sign out** - Clears session and returns to guest state

## 🎯 **Testing the System**

### **Test Authentication:**
1. Start fresh (clear localStorage if needed)
2. Visit home page - should see "Sign In" button
3. Click "Sign In" - should immediately show user avatar
4. Click avatar - should see dropdown with "Dashboard" option
5. Click "Dashboard" - should access the panel successfully
6. Click "Sign out" - should return to guest state

### **Test Dashboard Access:**
1. While authenticated, visit: `http://localhost:3000/en/dashboard`
2. Should load the dashboard immediately
3. Try other panel pages: `/orders`, `/invoices`, `/settings`, etc.
4. All should work seamlessly

### **Test Session Persistence:**
1. Sign in and access dashboard
2. Refresh the page - should stay authenticated
3. Open new tab with dashboard URL - should work
4. Close browser and reopen - should still be authenticated (until 24h expires)

## 🔧 **For Development**

### **Reset Authentication:**
```javascript
// In browser console:
localStorage.removeItem('auth-session')
// Then refresh page
```

### **Check Authentication Status:**
```javascript
// In browser console:
localStorage.getItem('auth-session')
```

### **Mock User Data:**
- **Name:** John Doe
- **Email:** john.doe@example.com
- **Avatar:** Auto-generated with initials "JD"
- **Role:** customer

## 🚀 **Ready to Use!**

The authentication system is now fully functional for development. Users can:
- ✅ Access the dashboard at `http://localhost:3000/en/dashboard`
- ✅ Sign in from the main site header
- ✅ Navigate between public site and private panel seamlessly
- ✅ Maintain authentication across sessions
- ✅ Access all panel features (orders, invoices, settings, etc.)

**Happy testing! 🎉**
