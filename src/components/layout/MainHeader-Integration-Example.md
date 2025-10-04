/* 
MainHeader with User Avatar Integration - Visual Example

BEFORE (Guest User):
┌─────────────────────────────────────────────────────────────────────────────┐
│ Drukarnia Graften    Home  Products  About  Contact    [Cart (2)]  [Sign In] │
└─────────────────────────────────────────────────────────────────────────────┘

AFTER (Authenticated User):
┌─────────────────────────────────────────────────────────────────────────────┐
│ Drukarnia Graften    Home  Products  About  Contact    [Cart (2)]  [👤 John] │
└─────────────────────────────────────────────────────────────────────────────┘
                                                                         │
                                                                         ▼
                                                        ┌─────────────────────┐
                                                        │ 👤 John Doe         │
                                                        │ john.doe@email.com  │
                                                        ├─────────────────────┤
                                                        │ 📊 Dashboard        │
                                                        │ ⚙️  Account Settings │
                                                        ├─────────────────────┤
                                                        │ 🚪 Sign out         │
                                                        └─────────────────────┘

KEY FEATURES ADDED:
✅ Automatic user detection (shows Sign In button for guests, avatar for authenticated users)
✅ Compact avatar dropdown (size="sm", showName=false for space efficiency)
✅ Quick access to Dashboard from main site
✅ Consistent user experience across main site and panel
✅ Seamless integration with existing cart and navigation

TECHNICAL IMPLEMENTATION:
- Uses the same UserAvatarDropdown component as the panel
- Integrates with existing auth system (useAuth hook)
- Responsive design maintains mobile menu functionality
- Auto-generated avatars with fallback to user icon
- Professional dropdown with user info and navigation links

USAGE FLOW:
1. Guest visits site → sees "Sign In" button
2. User clicks "Sign In" → goes to /dashboard (panel)
3. User authenticates → returns to main site with avatar visible
4. User can access panel anytime via avatar dropdown → "Dashboard"
5. User can sign out from main site or panel

This creates a unified experience where users can seamlessly move between
the public website and their private panel! 🎯
*/
