# PocketPro - Styling System

## Design Philosophy

PocketPro features a **golf-themed, mobile-first design** with:
- Nature-inspired color palette (greens, earth tones)
- Clean, minimalist UI
- Bold typography
- Smooth animations
- On-course usability focus

---

## Color Palette

### Primary Colors

```css
#314035  /* Dark Green - Headers, navigation, dark elements */
#698C75  /* Light Green - Secondary buttons, accents */
#46594B  /* Mid Green - Backgrounds, cards */
#F2EFDF  /* Off White - Text, light elements */
#F2A74B  /* Orange - Primary actions, highlights, CTA */
```

### Color Usage

| Color | Usage | Examples |
|-------|-------|----------|
| Dark Green (#314035) | Navigation bar, dark backgrounds | NavBar background |
| Light Green (#698C75) | Secondary buttons, increment/decrement | Round Setup buttons |
| Mid Green (#46594B) | Card backgrounds, boxes | Score cards, stat boxes |
| Off White (#F2EFDF) | Primary text color | All text elements |
| Orange (#F2A74B) | Primary actions, emphasis | Sign In button, active scores |

---

## Typography

### Font Families

**Primary Font: Montserrat**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
font-family: 'Montserrat', sans-serif;
```

**Usage**: 
- Headings
- Buttons
- Bold text
- Numbers
- Logo text

**Secondary Font: Hind**
```css
@import url('https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap');
font-family: 'Hind', sans-serif;
```

**Usage**:
- Body text
- UI labels
- General content
- Statistics labels

---

## Text Size Scale

### Round Components (Round.css)

```css
.xs-text {
  font-size: 9px;
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
}

.s-text {
  font-size: 15px;
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
}

.sm-text {
  font-size: 20px;
  color: #F2A74B;
  font-family: 'Hind', sans-serif;
}

.m-text {
  font-size: 30px;
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
}

.l-text {
  font-size: 50px;
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
}

.xl-text {
  font-size: 60px;
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
}
```

### Montserrat Variants (Round.css)

```css
.xs-text-mont {
  font-size: 9px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}

.s-text-mont {
  font-size: 12px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}

.sm-text-mont {
  font-size: 20px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}

.sm-text-score {
  font-size: 20px;
  color: #F2A74B;
  font-family: 'Montserrat', sans-serif;
}

.m-text-mont {
  font-size: 30px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}

.l-text-mont {
  font-size: 50px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}

.xl-text-mont {
  font-size: 60px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}
```

### Profile Specific (User.css)

```css
.xxl-text {
  font-size: 80px;
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
}
```

---

## Background System

### Radial Gradient Background

**Used across all pages**:

```css
.background {
  background: rgb(105,140,117);
  background: radial-gradient(
    circle, 
    rgba(105,140,117,1) 0%,    /* Light green center */
    rgba(70,89,75,1) 53%,       /* Mid green */
    rgba(49,64,53,1) 94%        /* Dark green edges */
  );
  min-height: 100vh;
}
```

**Effect**: Golf course-inspired gradient from light to dark green

**Files**: App.css, Main.css, User.css, Round.css

---

## Button Styles

### Primary Button (Orange)

```css
.sqr-btn1 {
  border: none;
  background: rgb(242,167,75);
  background: radial-gradient(
    circle, 
    rgba(242,167,75,1) 20%,    /* Light orange center */
    rgba(171,115,47,1) 100%    /* Dark orange edges */
  );
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, 
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, 
              rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  color: white;
  font-family: 'Montserrat', sans-serif;
  padding: 3px 0px 3px 0px;
  font-weight: bold;
}
```

**Usage**: 
- Sign In button
- Register button
- Begin Round
- Complete Hole
- Complete Round

---

### Secondary Button (Green)

```css
.sqr-btn2 {
  border: none;
  background-color: #698C75;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, 
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, 
              rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  color: white;
  font-family: 'Montserrat', sans-serif;
  padding: 3px 0px 3px 0px;
  font-size: 15px;
  font-weight: 400;
}

.sqr-btn2:hover {
  background-color: #54725e;
}

.sqr-btn2:active,
.sqr-btn2:focus {
  background: rgb(242,167,75);
  background: radial-gradient(
    circle, 
    rgba(242,167,75,1) 20%, 
    rgba(171,115,47,1) 100%
  );
  color: #F2EFDF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.45) inset;
}
```

**Usage**:
- Create Account button
- Course selection buttons
- Round Setup
- Round History

**Interaction**:
- Hover: Darker green
- Active/Focus: Changes to orange gradient

---

### Circle Buttons (Increment/Decrement)

```css
.circle-btn {
  height: 50px !important;
  width: 50px !important;
  border: none;
  background-color: #698C75;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, 
              rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, 
              rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, 
              rgba(0, 0, 0, 0.06) 0px 2px 1px, 
              rgba(0, 0, 0, 0.09) 0px 4px 2px, 
              rgba(0, 0, 0, 0.09) 0px 5px 5px, 
              rgba(0, 0, 0, 0.09) 0px 5px 5px, 
              rgba(0, 0, 0, 0.09) 0px 5px 5px;
  font-family: 'Montserrat', sans-serif;
}

.dec {
  width: 90%;
  display: flex;
  justify-content: center;
}
```

**Usage**:
- Swing counter +/-
- Putt counter +/-
- Stroke adjustments

**Visual**: Circular buttons with deep inset shadows for "button" effect

---

## Card/Box Styles

### Score Card Boxes

```css
.box {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, 
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, 
              rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background: rgb(70,89,75);
  background: radial-gradient(
    circle, 
    rgba(70,89,75,1) 5%,        /* Light mid-green center */
    rgba(49,64,53,1) 100%       /* Dark green edges */
  );
}
```

**Usage**:
- Hole information display
- Score tracking boxes
- Statistics containers
- Round cards

**Visual**: Dark green gradient with pronounced shadow depth

---

### Profile Box

```css
.profile {
  max-width: 400px;
  margin: auto;
}
```

---

### Round History Cards

```css
.card {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, 
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, 
              rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background: rgb(70,89,75);
  background: radial-gradient(
    circle, 
    rgba(70,89,75,1) 5%, 
    rgba(49,64,53,1) 100%
  );
  max-width: 400px;
}
```

---

## Navigation Bar

### NavBar Styling (NavBar.css)

```css
.nav-bar {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  color: #F2EFDF;
  background-color: #314035;
  padding: 10px 0px 10px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, 
              rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.nav-text {
  color: #F2EFDF;
  font-family: 'Hind', sans-serif;
  font-size: 15px;
}

.nav-text:link { 
  text-decoration: none;
}

.nav-text:visited { 
  text-decoration: none; 
}

.nav-text:hover { 
  text-decoration: none;
  color: #698C75;
}

.nav-text:active { 
  text-decoration: none;
}
```

**Features**:
- Dark green background
- Light text
- No underlines
- Green hover color
- Subtle shadow

---

## Form Styling

### Input Fields

```css
/* From forms in Login/Register */
input[type="text"],
input[type="password"],
input[type="email"] {
  border: 0;
  border-radius: 5px;
  /* Styled via Bootstrap classes */
}
```

### Custom Checkboxes

```css
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 3px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #fff;
}

input[type="checkbox"]:checked {
  background-color: #F2A74B;
  border-color: #F2A74B;
}

input[type="checkbox"]:hover {
  cursor: pointer;
}
```

**Usage**: Sort and filter controls in Round History

---

## Logo Styling

### Main Logo (Large)

```css
.logo {
  width: 250px;
  margin-bottom: 70px;
  -webkit-filter: drop-shadow(5px 5px 5px #314035);
  filter: drop-shadow(5px 5px 5px #314035);
}
```

**Usage**: Login screen, Main dashboard

---

### Logo Type (Small)

```css
.logo-type {
  width: 110px;
}
```

**Usage**: Navigation bar

---

## Animations

### Fade Transitions

```css
.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

.fade-in {
  opacity: 1;
  transition: opacity 0.5s ease-in;
}
```

**Usage**: Score updates in Round component
- Scores fade out
- Wait 150ms
- Update value
- Fade in with new value

**JavaScript Integration**:
```javascript
setSwingFadeClass("fade-out");
setTimeout(() => {
  setSwingCount(swingCount + 1);
  setSwingFadeClass("fade-in");
}, 150);
```

---

### Loading Spinner

```css
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 1s linear infinite;
  margin-right: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

**Usage**: While fetching course/hole data

---

## Tables

### Scorecard Tables

```css
.table {
  color: #F2EFDF;
  font-size: 10px;
}
```

**Usage**: 
- Front 9 scorecard
- Back 9 scorecard
- Hole-by-hole display

**Styling**: Bootstrap tables with custom text color and size

---

## Special Text Colors

### Orange Highlight

```css
.orange-text {
  color: #F2A74B;
}
```

**Usage**: Current distance, active scores, emphasis

---

### Score Display

```css
.score-total {
  font-size: 80px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  text-align: end;
  margin-top: -22px;
}

.course-name {
  font-size: 15px;
  color: #F2EFDF;
  font-family: 'Montserrat', sans-serif;
}
```

---

## Shadow System

### Drop Shadows

**Elements (Buttons, Logo)**:
```css
-webkit-filter: drop-shadow(5px 5px 5px #314035);
filter: drop-shadow(5px 5px 5px #314035);
```

**Effect**: Dark green shadow for depth

---

### Box Shadows

**Cards and Containers**:
```css
box-shadow: 
  rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,    /* Large soft shadow */
  rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,          /* Medium shadow */
  rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;   /* Inner shadow */
```

**Effect**: Multi-layered depth with inset for recessed appearance

---

### Circle Button Shadows

```css
box-shadow: 
  rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
  rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
  rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
  rgba(0, 0, 0, 0.06) 0px 2px 1px,
  rgba(0, 0, 0, 0.09) 0px 4px 2px,
  rgba(0, 0, 0, 0.09) 0px 5px 5px,
  rgba(0, 0, 0, 0.09) 0px 5px 5px,
  rgba(0, 0, 0, 0.09) 0px 5px 5px;
```

**Effect**: Deep inset for "pressable button" look

---

## Responsive Design

### Bootstrap Integration

PocketPro uses **Bootstrap 5.2.3** for responsive grid:

```html
<div className="container">
  <div className="row">
    <div className="col-4">...</div>
    <div className="col-8">...</div>
  </div>
</div>
```

### Mobile-First Approach

- Layouts stack on mobile
- Touch-friendly button sizes (50px circles)
- Readable text sizes (minimum 9px)
- Vertical scrolling
- Flexbox for centering

### Container Width

```css
.card {
  max-width: 400px;
}

.profile {
  max-width: 400px;
}

.ui {
  max-width: 400px;
}
```

**Strategy**: Constrain width for mobile optimization

---

## Utility Classes

### Flexbox Utilities

```html
<div className="d-flex justify-content-center align-items-center">
<div className="d-flex flex-column">
<div className="vstack gap-1">
```

**Source**: Bootstrap 5 utility classes

---

### Spacing

```html
<div className="mt-5">  <!-- margin-top: 5 -->
<div className="mb-3">  <!-- margin-bottom: 3 -->
<div className="p-4">   <!-- padding: 4 -->
<div className="px-3">  <!-- padding-left/right: 3 -->
```

---

## CSS File Organization

### Structure

```
frontend/src/
├── App.css               (Root app styling)
├── index.css             (Global resets)
├── components/
│   ├── Main.css          (Dashboard styling)
│   ├── NavBar.css        (Navigation styling)
│   ├── round/
│   │   └── Round.css     (All round-related styling)
│   └── user/
│       └── User.css      (Auth pages styling)
```

### Import Pattern

```javascript
// In component files
import "bootstrap/dist/css/bootstrap.css";
import "./ComponentName.css";
```

**Order**: Bootstrap first, then custom CSS to override

---

## Design Patterns

### 1. Radial Gradients

**Pattern**: Light center → dark edges
**Purpose**: Depth and dimension
**Used in**: Backgrounds, buttons, cards

### 2. Inset Shadows

**Pattern**: Multiple layered inset shadows
**Purpose**: Recessed, tactile appearance
**Used in**: Boxes, buttons, cards

### 3. Drop Shadows

**Pattern**: Consistent dark green shadow
**Purpose**: Elevation and separation
**Used in**: Logos, buttons

### 4. Color Consistency

**Pattern**: Green palette with orange accents
**Purpose**: Brand identity and visual hierarchy
**Primary actions**: Orange
**Secondary actions**: Green

### 5. Typography Hierarchy

**Pattern**: Multiple size scales with consistent families
**Purpose**: Clear information hierarchy
**Headings**: Montserrat
**Body**: Hind

---

## Browser Compatibility

### Vendor Prefixes

```css
-webkit-filter: drop-shadow(...);
filter: drop-shadow(...);

-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
```

**Support**: WebKit (Safari, Chrome), Mozilla (Firefox), Standard

---

## Accessibility Considerations

### Current Implementation

- ✅ Sufficient color contrast (light text on dark backgrounds)
- ✅ Readable font sizes (minimum 9px)
- ✅ Touch targets (50px buttons)
- ✅ Hover states on interactive elements

### Potential Improvements

- ⚠️ Focus indicators on inputs
- ⚠️ ARIA labels
- ⚠️ Screen reader support
- ⚠️ Keyboard navigation styles

---

## Performance

### Optimization Techniques

1. **Google Fonts**: Preconnect for faster loading
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```

2. **CSS Reuse**: Shared class names across components

3. **Bootstrap CDN**: Leverages browser caching

---

## Style Guide Summary

| Element | Style | Usage |
|---------|-------|-------|
| **Primary Button** | Orange gradient, bold | Main actions |
| **Secondary Button** | Green, hover effects | Navigation, selection |
| **Background** | Green radial gradient | All pages |
| **Cards** | Dark green gradient, deep shadows | Information containers |
| **Text** | Off-white on dark green | Maximum readability |
| **Accent** | Orange | Highlights, active states |
| **Headings** | Montserrat, bold | Important information |
| **Body** | Hind, regular | General content |
| **Animations** | Fade transitions | Score updates |

---

## CSS Best Practices Implemented

1. ✅ **Consistent Naming**: Class names describe purpose
2. ✅ **Reusable Classes**: Text sizes, buttons
3. ✅ **Component-Scoped**: Styles organized by feature
4. ✅ **Mobile-First**: Responsive design approach
5. ✅ **Performance**: Minimal custom CSS, leverage Bootstrap
6. ✅ **Brand Consistency**: Color palette used throughout
7. ✅ **Visual Hierarchy**: Clear size and weight scales
8. ✅ **User Feedback**: Hover, active, focus states
