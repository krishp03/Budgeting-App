# Budgeting App

A privacy-first, offline-first budgeting app built with React Native and TypeScript, designed for iOS. Includes modular architecture, local storage, rule-based AI insights, and clean analytics.

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)  
2. [Technology & Tooling](#technology--tooling)  
3. [Expense & Budget Data Models](#expense--budget-data-models)  
4. [Expense Input Strategy](#expense-input-strategy)  
5. [Budget Logic & Rules Engine](#budget-logic--rules-engine)  
6. [AI Insights](#ai-insights)  
7. [Alerting System](#alerting-system)  
8. [Visualizations & Analytics](#visualizations--analytics)  
9. [App Screens](#app-screens)  
10. [Step-by-Step Build Order](#step-by-step-build-order)  
11. [Making It Shareable](#making-it-shareable)  
12. [Portfolio Positioning](#portfolio-positioning)

---

## High-Level Architecture

**App Type:** React Native iOS app (iOS-first)  

| Layer | Technology |
|-------|-----------|
| Frontend | React Native + TypeScript |
| State Management | Redux Toolkit / Recoil |
| Local Data | Realm / WatermelonDB / SQLite |
| Optional Cloud Sync | CloudKit via `react-native-cloudkit` |
| Charts / Visualization | `react-native-chart-kit` / `victory-native` |
| Notifications | `react-native-push-notification` |
| AI Engine | Rule-based insights / optional local LLM |

**Design Philosophy:**  
- Offline-first & privacy-preserving  
- Modular, clean architecture (MVVM-like using Redux + hooks)  
- Easily cloneable and open-source friendly  

---

## Technology & Tooling

- **Language:** TypeScript  
- **UI:** React Native + Tailwind / Styled Components  
- **State Management:** Redux Toolkit or Recoil  
- **Dependency Management:** Yarn / npm  
- **Local Storage:** Realm or WatermelonDB (fast, offline-first)  

---

## Expense & Budget Data Models

| Entity | Key Fields |
|--------|------------|
| **UserProfile** | `monthlyIncome`, `savingsTarget`, `alertPreferences`, `AIverbosity` |
| **Category** | `name`, `budgetLimit`, `isDefault`, `color/icon` |
| **Expense** | `title`, `amount`, `date`, `category`, `activityTag`, `location?`, `notes`, `isRecurring`, `source` |
| **RecurringExpense** | `linkedExpenseTemplate`, `frequency`, `nextOccurrence` |

- Supports offline manual entry  
- Can extend later for imported expenses  

---

## Expense Input Strategy

**Phase 1 — Manual Entry (Recommended)**  
- Quick-add modal  
- Assign category + activity tag  
- Edit/delete anytime  
- ✅ Fully offline, fast, privacy-safe  

**Phase 2 — Optional Bank/Credit Import**  
- Requires Plaid / Salt Edge & backend  
- Adds cost & privacy complexity  
- Plan for future support; not in initial scope  

---

## Budget Logic & Rules Engine

- Allocate income to savings, fixed, and variable expenses  
- Track category-level & activity-level spend  
- Calculate remaining budget, burn rate, and risk level  
- Hard savings rule with manual override  
- Optional AI highlights overspending patterns  

---

## AI Insights

**Phase 1 — Rule-Based:**  
- Over 80% category usage → warn  
- Spending pace exceeds month → warn  
- Fast, free, offline  

**Phase 2 — Optional Local LLM:**  
- Llama.cpp / Mistral  
- Analyze local expense data  
- Provide insights: overspending, category spikes, weekend spending  

**Optional Paid Boost:**  
- OpenAI API for deep summaries / insights  
- Toggleable feature  

---

## Alerting System

- Triggered by overspending, high burn rate, activity spikes, or savings risk  
- Max 1–2 notifications per week  
- Configurable sensitivity  
- Silent summaries + critical alerts  

---

## Visualizations & Analytics

**Charts:**  
- Pie chart: category distribution  
- Bar chart: category comparison  
- Line chart: spending over time  
- Month-to-month trend comparison  

**Analytics Views:**  
- Monthly overview  
- Category deep dive  
- Activity-based analysis  
- Weekend vs weekday trends  

---

## App Screens

| Screen | Key Features |
|--------|--------------|
| **Home Dashboard** | Monthly summary, remaining budget, AI insights preview |
| **Expenses** | List view, filters, edit/delete |
| **Analytics** | Charts, trends, comparisons |
| **AI Chatbot / Insights** | Rule-based or local LLM |
| **Profile & Settings** | Income & budget setup, alert prefs, AI verbosity, data export |

---

## Step-by-Step Build Order

1. **Foundation:**  
   - React Native navigation & layout  
   - Local DB schema (Realm / WatermelonDB)  
   - Manual expense entry, category budgets  

2. **Budget Intelligence:**  
   - Rule-based warnings  
   - Burn-rate & savings logic  

3. **Visualizations:**  
   - Charts + filters  
   - Monthly / historical comparisons  

4. **AI Integration:**  
   - Rule-based insights / optional local LLM  

5. **Polish & Expansion:**  
   - Recurring expenses  
   - Notifications  
   - Optional iCloud sync & bank import  

---

## Making It Shareable

- Open-source repo  
- Local-only storage (no backend)  
- Optional local AI models  
- Clear README for setup  
- Anyone can clone & run locally  

---

## Portfolio Positioning

- Highlight privacy-first, offline-first design  
- Emphasize on-device AI & analytics  
- Clean TypeScript + modular architecture  
- Thoughtful tradeoffs & real-world product thinking  
- Cross-platform React Native potential  

---

**License:** MIT  

