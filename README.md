# MATATU FINDER

**Frontend Engineer Screening Task – Tunga Afrika**

> A **Next.js (React + TypeScript) app** that helps users in Nairobi find the right **matatu stage(s)** and **route(s)** to travel from a start to a destination, with a clear and friendly UX.

## 🎯 Goal
Build a user-friendly app where people can:
- Enter their **current location** (via GPS or manually).
- Select a **destination** (from input or quick-select list).
- Get **recommended matatu routes**, including:  
  - Stage to board  
  - Route number(s)  
  - Estimated fare & travel time  
  - Helpful travel tips

## 🛠 Tech Stack

| Feature | Choice |
|---------|---------|
| Framework | **Next.js** (React + TypeScript) |
| Routing | Next.js App Router |
| Styling | **Tailwind CSS** + Inter font |
| Data fetching | TanStack Query |
| Testing | React Testing Library + Jest |
| Deployment | Vercel |

<!-- ## 🎨 Styling Guide

**Font:** [Inter](https://fonts.google.com/specimen/Inter)  

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
} -->

## 🎨 Colour Palette

| Name         | Hex Code  | Preview |
|--------------|-----------|---------|
| Dark Brown   | `#59302C` | ![#59302C](https://via.placeholder.com/20/59302C/000000?text=+) |
| Orange Red   | `#BF4209` | ![#BF4209](https://via.placeholder.com/20/BF4209/000000?text=+) |
| Burnt Orange | `#CC703D` | ![#CC703D](https://via.placeholder.com/20/CC703D/000000?text=+) |
| Cream        | `#FCE8CF` | ![#FCE8CF](https://via.placeholder.com/20/FCE8CF/000000?text=+) |
| White        | `#FFFFFF` | ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/000000?text=+) |


## 📄 Pages

### 🏠 Home / Search Page  

**Features**  
- Two inputs: **Current Location** (GPS/manual) & **Destination**  
- **Use My Location** button (with fallback)  
- **Popular Destinations** quick-select list  
- **Find My Matatu** CTA


### 📍 Route Results Page  

**Features**  
- Shows **Recommended Stage** (where to board)  
- Lists **Matatu Route Number(s)**  
- Displays **Estimated Fare & Travel Time**  
- Includes **Tips** (peak hours, alternatives)  
- Alternatives in **collapssible section** 