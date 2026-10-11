# StockCourt AI ⚖️
> **Your AI-powered stock research courtroom.**
> *"Don't just ask whether a stock is good. Put the investment case on trial."*

---

## 🏛️ Executive Summary

**StockCourt AI** transforms traditional equity research by structuring investment analysis as an adversarial courtroom proceeding. Instead of asking a generic chatbot whether to buy a stock, users initiate an evidence-backed trial where two opposing AI specialists cross-examine the company and an independent fact-checking Evidence Judge delivers an evidence-based verdict.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**:
  - `Cinzel` (Courtroom serif typography)
  - `JetBrains Mono` (Financial terminal data and metrics)
  - `Plus Jakarta Sans` (Body and interface typography)

### Backend & AI
- **Server Runtime**: [Express](https://expressjs.com/) on Node.js / [tsx](https://github.com/privatenumber/tsx)
- **Real-Time Market Feeds**: `/api/market/quote` endpoint fetching live prices, daily changes, day high/low, and 52-week ranges directly from the National Stock Exchange of India (NSE) and global exchanges.
- **AI Engine**: `@google/genai` TypeScript SDK
  - Model: `gemini-3.8-flash`
  - Server-Side Proxy Pattern (`/api/debate-round`, `/api/challenge-claim`)
  - Grounded evidentiary fallback engine ensuring 100% offline & demo reliability
- **Audio Engine**: Synthesized courtroom wooden gavel strike via native Web Audio API (zero audio file downloads required).

### Data & State
- **Storage**: Client-side reactive persistence (`localStorage` for Watchlist, Trial History, and Profile preferences)
- **Indian & Global Financial Baseline**: Audited NSE / SEBI filings, SEC Form 10-K / 10-Q disclosures, FactSet historical valuation multiples, and IDC/Canalys industry reports.

---

## ⚖️ The Courtroom Agent Architecture

StockCourt AI operates around three distinct roles:

```
          ┌────────────────────────────────────────┐
          │         THE DEFENDANT (e.g. AAPL)       │
          └──────────────────┬─────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   🟢 BULL ANALYST                   🔴 BEAR ANALYST
   • Growth opportunities            • Valuation multiple risks
   • Recurring software margins      • Heavy debt & leverage
   • Competitive moats               • Customer concentration
   • Capital return power            • Regulatory antitrust scrutiny
            │                                 │
            └────────────────┬────────────────┘
                             │
                             ▼
                    ⚖️ EVIDENCE JUDGE
                    • Audits claims against SEC Form 10-K
                    • Categorizes: SUPPORTED / PARTIALLY SUPPORTED / CONTRADICTED
                    • Computes Evidence Strength %
                    • Does NOT simply average Bull & Bear scores
                             │
                             ▼
                     FINAL VERDICT
                     • Verdict Confidence Score
                     • What Supports the Verdict
                     • What Could Change the Verdict
                     • What The Judge Is Watching (Measurable Watchlist)
```

---

## 🌟 Key Application Features

### 1. Stock Search & Case Docket
- Search any company name or ticker (e.g., Apple, NVIDIA, Tesla, Microsoft, Amazon, Reliance, TCS, Infosys).
- Formats standard legal case IDs: e.g. `CASE #AAPL-2026`.
- Live market data indicators and financial disclosures.

### 2. Case Dashboard & Live Market Charts
- **Header**: "THE PEOPLE vs. [TICKER]" with live price, currency (`₹` for Indian stocks, `$` for US stocks), and verified exchange badge with redirect icon (`ExternalLink`) to the official exchange portal (NSE India or NASDAQ).
- **Interactive Stock Market Chart**: Responsive area chart with timeframe filters (`1D`, `1W`, `1M`, `1Y`, `5Y`, `ALL`), interactive hover crosshair, volume bars, and 52-week high/low reference levels.
- **Key Fundamental Metrics**: Revenue, Operating Margin, EPS, P/E Ratio, Free Cash Flow, Debt.
  - In `🌱 Beginner Mode`: plain-English analogy labels are shown on each card.
  - In `📊 Advanced Mode`: dense institutional multiples (EV/EBITDA, ROIC, PEG, Beta) are displayed.
- **Two Adversarial Panels**:
  - **🟢 Bull Analyst**: Core investment thesis, categorized positive arguments with confidence scores and source citations.
  - **🔴 Bear Analyst**: Skeptical thesis, risk arguments with severity badges (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
- **🏛️ Courtroom Cross-Examination**:
  - Direct cross-examination between Bull and Bear counsel.
  - Interactive **User Interrogation Stand**: cross-examine any analyst on debt, margins, or moats with immediate judicial rulings (`SUSTAINED` vs `OVERRULED`).
- **⚖️ Evidence Judge**: Independent evaluation ratings, evidence strength percentage bars, source quality, and judge notes.
- **The Verdict**: Standardized ratings with confidence score and an interactive **[👶 Simplified Understanding (Plain English)]** toggle translating the verdict into the 10-second bottom line for everyday investors.
- **Free Learning Sources**: Quick access to free verified portals (Zerodha Varsity, SEBI Saa₹thi, NSE India Knowledge Hub, SEC Investor.gov).

### 3. Courtroom Debate Chamber
- Bull and Bear agents respond directly to each other across rounds (Default: 3 rounds).
- Evidence Judge interjects after each exchange to separate audited facts from speculation.
- **Judicial Debate Synthesis**:
  - Strongest Bull argument
  - Strongest Bear argument
  - Weakest argument
  - Missing evidence
  - Conflicting evidence
- Real-time generation of additional debate rounds via Gemini API.

### 4. Evidentiary Vault (Evidence Room)
- Trace every single claim to documented exhibits.
- Categorized into:
  - **Company Sources** (SEC 10-K, 10-Q, Shareholder letters)
  - **Market Data** (FactSet, Bloomberg historical multiples)
  - **External Sources** (DOJ court transcripts, IDC supply chain trackers)
- Reliability Badges: `OFFICIAL`, `VERIFIED`, `THIRD_PARTY`, `UNVERIFIED`.

### 5. "What If?" Sensitivity Scenarios
- **Bull Case**: Accelerated adoption and margin expansion.
- **Base Case**: Steady execution along historical trends.
- **Bear Case**: Valuation multiple compression and downside risks.
- **Interactive Sandbox**: Real-time sliders for Revenue Growth, Operating Margin, and Terminal P/E multiples with implied share value calculation.

### 6. Cross-Stock Comparative Trial
- Put multiple defendants on trial simultaneously (e.g. `AAPL vs NVDA vs TSLA`).
- Side-by-side audited matrix comparing Revenue Growth, P/E, ROE, ROIC, Debt, FCF, Bull Score, Bear Risk, and Judge Verdicts.
- **"Put These Stocks On Trial"**: Issues an aggregated bench ruling identifying comparative risk/reward trade-offs.

### 7. My Watchlist & Previous Cases
- Persistent tracking of active defendants with price changes, Bull scores, Bear risks, and Judge verdicts.
- Reopen historical trial dockets with one click.

---

## 🌱 Beginner-Friendly Experience & Educational Philosophy

StockCourt AI is built on the core principle: **Do not assume the user knows finance.**

1. **Experience Level Toggle**:
   - `🌱 Beginner` (Default): Plain-English explanations, friendly analogies, and contextual guides.
   - `📊 Advanced`: High-density terminal tables and raw financial ratios.
2. **"ⓘ What does this mean?" Popover System**:
   - Available on all complex financial metrics (P/E, EPS, ROE, ROIC, Free Cash Flow, Margins, Debt, Moat, Volatility, Beta).
   - Answers three fundamental questions:
     - *What is it in simple words?*
     - *Practical real-world example*
     - *Why does it matter & what should I look for?*
3. **Financial Dictionary & Legal Glossary**:
   - Searchable glossary with category filters and courtroom translations.
4. **6-Level Stock Research Learning Path**:
   - Level 1: Stock Market Basics
   - Level 2: Understanding Companies (Revenue, Profit, Cash, Debt)
   - Level 3: Understanding Stocks & Valuation (P/E, EPS, Market Cap)
   - Level 4: Understanding Business Quality (Economic Moats, ROIC)
   - Level 5: Understanding Risk (Spotting Pitfalls, Downside)
   - Level 6: Putting It Together (The Courtroom Method)
   - Includes interactive knowledge check quizzes and practical exercises.
5. **Interactive Courtroom Watchthrough Theater**:
   - 7-Act animated theatrical presentation walking through the entire lifecycle:
     - *Act I: The Accusation & Live Indian Stock Data (NSE)*
     - *Act II: Convening the Tribunal*
     - *Act III: Prosecution — Bull Analyst's Argument*
     - *Act IV: Cross-Examination — Bear Analyst's Objection*
     - *Act V: Judicial Fact-Check & Evidence Strength*
     - *Act VI: Adversarial Courtroom Debate*
     - *Act VII: The Gavel Drops — Final Research Verdict & Watchlist*
   - Includes auto-play progress scrubber, manual step controls, and synthesized courtroom gavel sound effects.
6. **Onboarding Tour**:
   - 6-step animated walkthrough explaining the courtroom metaphor.

---

## 🔒 Safety, Compliance & Educational Disclaimers

- StockCourt AI is strictly an informational and educational research platform.
- It does **NOT** provide personalized financial advice or direct buy/sell recommendations.
- Claims are categorized clearly into **FACT**, **ANALYSIS**, **ASSUMPTION**, and **SPECULATION**.
- Never fabricates financial data, citations, or URLs.
- Standard legal notice: *"Past performance does not guarantee future results. Research first. Decide for yourself."*

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run fullstack development server (Node.js Express + Vite)
npm run dev

# 3. Open your browser
http://localhost:3000
```

### Environment Variables (.env)
```env
# Optional Gemini API Key for dynamic debate rounds and custom AI cross-examinations
GEMINI_API_KEY="your-gemini-api-key"
```
*(If no API key is provided, the application runs with high-fidelity pre-computed dockets and fallback intelligence).*
