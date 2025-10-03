# 📋 **Page Refactoring Checklist**

This checklist ensures consistent application of our code separation rules across all pages.

## 🎯 **Pre-Refactoring Analysis**

### **Before Starting Each Page:**
- [ ] **Read the current page** - Understand existing structure and logic
- [ ] **Identify shared resources** - What types, utils, constants are needed?
- [ ] **Check existing shared resources** - What can we reuse vs create?
- [ ] **Plan feature structure** - What components, hooks, utils belong to this feature?
- [ ] **Identify page-specific logic** - What's unique to this page vs reusable?

---

## 🔧 **Refactoring Process (Per Page)**

### **Step 1: Create Feature Structure**
- [ ] Create `src/features/{feature}/components/` directory
- [ ] Create `src/features/{feature}/hooks/` directory  
- [ ] Create `src/features/{feature}/utils/` directory
- [ ] Create `src/features/{feature}/types/` directory (if needed)
- [ ] Create index files for each directory

### **Step 2: Extract Types**
- [ ] **Check shared types first** - Can we use existing types?
- [ ] **Create feature-specific types** - Only if not available in shared
- [ ] **Update imports** - Use shared types wherever possible
- [ ] **Remove duplicate types** - Delete any duplicated type definitions

### **Step 3: Extract Utilities**
- [ ] **Check shared utils first** - Can we use existing utilities?
- [ ] **Create feature-specific utils** - Only for domain-specific logic
- [ ] **Replace inline functions** - Move utility functions to appropriate files
- [ ] **Update imports** - Use shared utils wherever possible

### **Step 4: Extract Constants**
- [ ] **Check shared constants first** - Can we use existing constants?
- [ ] **Replace hardcoded values** - Use constants from shared or create feature-specific
- [ ] **Update imports** - Import constants instead of hardcoding

### **Step 5: Create Feature Components**
- [ ] **Create PageContainer component** - Main page logic and layout
- [ ] **Extract feature-specific components** - Break down complex components
- [ ] **Create feature hooks** - Extract custom logic into hooks
- [ ] **Update component imports** - Use shared components where appropriate

### **Step 6: Update Page Component**
- [ ] **Simplify page component** - Should only import layout and container
- [ ] **Remove business logic** - Move all logic to feature components
- [ ] **Update imports** - Use feature components and shared resources
- [ ] **Ensure proper typing** - All props and state should be typed

### **Step 7: Test & Validate**
- [ ] **Run build** - Ensure no TypeScript errors
- [ ] **Run lint** - Fix any linting issues
- [ ] **Test functionality** - Ensure page works as expected
- [ ] **Check mobile responsiveness** - Verify UI adapts properly
- [ ] **Verify accessibility** - Check ARIA labels and keyboard navigation

---

## ✅ **Quality Checklist (Per Page)**

### **Code Organization**
- [ ] **Page component < 20 lines** - Should only handle layout
- [ ] **Feature components focused** - Single responsibility principle
- [ ] **No duplicate code** - Reusing shared resources
- [ ] **Consistent naming** - Following established conventions
- [ ] **Proper file structure** - Files in correct directories

### **Import Organization**
- [ ] **Imports properly ordered** - React → External → Shared → Feature → Local
- [ ] **Using shared types** - Importing from `@/shared/types`
- [ ] **Using shared utils** - Importing from `@/shared/utils`
- [ ] **Using shared constants** - Importing from `@/shared/constants`
- [ ] **No unused imports** - Clean import statements

### **Type Safety**
- [ ] **No `any` types** - Everything properly typed
- [ ] **Props interfaces defined** - All component props typed
- [ ] **State properly typed** - useState with proper types
- [ ] **Event handlers typed** - Proper event type annotations
- [ ] **API responses typed** - Using shared API types

### **Performance & UX**
- [ ] **Loading states handled** - Proper loading indicators
- [ ] **Error states handled** - User-friendly error messages
- [ ] **Mobile responsive** - Works on all screen sizes
- [ ] **Accessible** - Proper ARIA labels and keyboard support
- [ ] **Toast notifications** - User feedback for actions

---

## 📊 **Success Metrics**

### **Before vs After Comparison**
| Metric | Before | Target After |
|--------|--------|--------------|
| Page component lines | 100-300+ | < 20 |
| Duplicate utilities | Multiple | 0 |
| Hardcoded constants | Many | 0 |
| TypeScript errors | Some | 0 |
| Linting warnings | Some | 0 |
| Code reusability | Low | High |

---

## 🚨 **Common Issues to Watch For**

### **Anti-Patterns to Avoid**
- [ ] **Avoid hardcoded values** - Use constants instead
- [ ] **Avoid duplicate utilities** - Check shared utils first
- [ ] **Avoid monolithic components** - Break into smaller pieces
- [ ] **Avoid `any` types** - Use proper TypeScript types
- [ ] **Avoid inline styles** - Use Tailwind classes
- [ ] **Avoid direct DOM manipulation** - Use React patterns

### **Quality Issues to Fix**
- [ ] **Inconsistent naming** - Follow established conventions
- [ ] **Missing error handling** - Add proper error boundaries
- [ ] **Missing loading states** - Add loading indicators
- [ ] **Accessibility issues** - Add ARIA labels and keyboard support
- [ ] **Mobile issues** - Ensure responsive design
- [ ] **Performance issues** - Optimize re-renders and data fetching

---

## 📝 **Documentation Updates**

### **After Each Page Refactoring**
- [ ] **Update feature documentation** - Document new components and hooks
- [ ] **Update shared resources** - Document any new shared utilities
- [ ] **Update examples** - Add examples of new patterns
- [ ] **Update AI guidance** - Add any new patterns to AI docs

---

## 🎯 **Page-Specific Considerations**

### **Upload Page**
- [ ] File upload validation using shared utils
- [ ] File type checking with shared constants
- [ ] Progress tracking with proper state management
- [ ] Error handling for upload failures

### **Shipment Page**
- [ ] Address validation using shared utils
- [ ] Shipping calculation with shared utilities
- [ ] Form validation with shared patterns
- [ ] Address selection with proper state management

### **Payment Page**
- [ ] Payment method validation
- [ ] Invoice form with shared validation utils
- [ ] Payment processing with proper error handling
- [ ] Form state management with proper typing

### **Summary Page**
- [ ] Order calculation using shared utils
- [ ] Order confirmation with proper state management
- [ ] Final validation before submission
- [ ] Success/error state handling

---

## 🚀 **Final Validation**

### **Before Marking Page Complete**
- [ ] **Build passes** - No TypeScript or build errors
- [ ] **Lint passes** - No linting warnings or errors
- [ ] **Functionality works** - All features work as expected
- [ ] **Mobile responsive** - Tested on different screen sizes
- [ ] **Accessible** - Tested with keyboard navigation
- [ ] **Performance good** - No unnecessary re-renders
- [ ] **Code clean** - Following all established patterns

---

This checklist ensures every page refactoring maintains our quality standards and follows our established patterns! 🎯
