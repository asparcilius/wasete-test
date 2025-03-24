# RemWaste - Skip Hire Made Simple

A modern, user-friendly application for hiring skips online. Built with the latest web technologies and designed with user experience in mind.

## Why This Design Works 🎨

### Modern Glass Design
I chose a glassmorphism design approach because:
- Creates a premium, modern feel that stands out
- Improves readability with subtle transparency
- Adds depth and dimension to the interface
- Makes waste management feel clean and professional

### User-Friendly Flow
The booking process is broken into three easy steps:
1. **Find Your Location** (30 seconds)
   - Quick postcode lookup
   - Instant address validation
   - Smart address suggestions

2. **Tell Us About Your Waste** (1 minute)
   - Simple waste type selection
   - Clear guidelines for each type
   - Special handling warnings when needed

3. **Choose Your Skip** (1 minute)
   - Visual size comparison
   - Clear pricing
   - Availability checking in real-time

### Smart Features
- **Intelligent Search**: Postcode validation with debouncing to prevent unnecessary API calls
- **Real-Time Updates**: Live availability and pricing updates
- **Smart Validation**: Prevents errors before they happen
- **Smooth Animations**: Provides visual feedback for actions

### Mobile-First Design
- Fully responsive on all devices
- Touch-optimized interface
- Easy-to-tap buttons and inputs
- Sticky navigation for better mobile UX

## Technical Decisions 🛠️

### Framework Choice
- **Next.js 15**: Chosen for its:
  - Server-side rendering capabilities
  - Optimized performance
  - Built-in TypeScript support
  - Easy deployment options



### Styling Solution
- **Tailwind CSS**: Selected because:
  - Faster development cycles
  - Consistent design system
  - Better performance (smaller CSS bundle)
  - Easy responsive design

### Component Architecture
```
src/
├── app/
│   ├── components/
│   │   ├── common/     # Reusable UI components
│   │   ├── forms/      # Form-specific components
│   │   ├── layout/     # Layout components
│   │   └── steps/      # Step-specific components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API integration
│   ├── styles/         # Global styles
│   └── types/          # TypeScript definitions
```

### Key Components
1. **Form Components**
   - `PostcodeInput`: Smart postcode lookup with debouncing
   - `WasteTypeSelector`: Interactive waste type selection
   - `SkipSelector`: Visual skip size comparison

2. **UI Components**
   - `Card`: Glassmorphic container component
   - `GradientButton`: Animated action buttons
   - `Badge`: Status indicators
   - `GradientHeading`: Styled headings

3. **Hooks & Services**
   - `useDebounce`: Prevents excessive API calls
   - `addressService`: Handles address lookups
   - `skipService`: Manages skip availability

## Getting Started 🚀

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

View the live demo at: https://wasete-test.vercel.app/

