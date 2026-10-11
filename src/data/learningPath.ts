import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    level: 1,
    title: 'Stock Market Basics',
    description: "Start here if you have never invested. Understand what a stock actually represents in real life.",
    badge: 'Level 1: The Citizen',
    lessons: [
      {
        id: 'l1-1',
        title: 'What is a Company and What is a Stock?',
        duration: '3 min read',
        content: [
          "Imagine three friends open a pizza shop. They spend $30,000 to buy an oven and ingredients. To keep track of ownership, they divide the pizza shop into 300 equal paper certificates called 'shares'.",
          "If you buy 100 shares, you literally own one-third of the pizza shop. You are entitled to one-third of its future profits, and you bear one-third of the risk.",
          "A public stock on exchanges like NASDAQ, NYSE, or NSE is simply this exact same idea, scaled up to millions or billions of shares traded between people every single second."
        ],
        keyTakeaway: "A stock is not a lottery ticket; it is a fractional legal certificate of ownership in a living, breathing business.",
        practicalExercise: "Next time you buy a coffee or iPhone, remember: you are not just a customer, you can actually be an owner of that enterprise.",
        quizQuestion: {
          question: "What does buying one share of Apple (AAPL) mean?",
          options: [
            "You are loaning Apple money that they must pay back with interest",
            "You own a tiny fraction of Apple's entire business, profits, and assets",
            "You get free products from Apple whenever you visit their store",
            "You are betting against the US economy"
          ],
          correctIndex: 1,
          explanation: "Buying a share makes you an equity owner. You own a fractional piece of everything the company earns and creates."
        }
      },
      {
        id: 'l1-2',
        title: 'Why Do Stock Prices Go Up and Down?',
        duration: '4 min read',
        content: [
          "In the short term (days or weeks), stock prices move based on human emotions: fear, greed, news headlines, and popularity.",
          "Legendary investor Benjamin Graham famously said: 'In the short run, the market is a voting machine, but in the long run, it is a weighing machine.'",
          "Over months and years, the stock price almost always follows the actual weight of the business — specifically, whether its cash profits are growing or shrinking."
        ],
        keyTakeaway: "Short-term swings are noise. Long-term stock performance follows business profitability and cash generation.",
        practicalExercise: "When a stock falls 3% on no news, don't panic. Check if anything actually changed in the company's ability to make money.",
        quizQuestion: {
          question: "What primarily drives a stock's price over a 5 to 10 year period?",
          options: [
            "Celebrity tweets and viral social media trends",
            "The company's underlying earnings, cash flow, and economic growth",
            "Which day of the week the market opened",
            "Random computer algorithms with no connection to the company"
          ],
          correctIndex: 1,
          explanation: "In the long run, a company's stock follows its ability to generate sustainable cash profits."
        }
      }
    ]
  },
  {
    level: 2,
    title: 'Understanding Companies',
    description: "Learn how money flows through a business: Revenue, Expenses, Profit, Debt, and Cash.",
    badge: 'Level 2: The Auditor',
    lessons: [
      {
        id: 'l2-1',
        title: 'Revenue vs. Profit: The Critical Difference',
        duration: '4 min read',
        content: [
          "Revenue (also called the 'Top Line') is all the money coming in through the front door from selling goods or services.",
          "Net Profit (also called 'Net Income' or the 'Bottom Line') is what is left inside the bank account after paying suppliers, staff, rent, interest, and government taxes.",
          "A company can have $100 Billion in revenue and still go bankrupt if its expenses are $105 Billion! Always check both the top line and bottom line."
        ],
        keyTakeaway: "Revenue is vanity, profit is sanity, but cash is reality.",
        practicalExercise: "Look at the defendant's 'Gross Margin' and 'Operating Margin' in StockCourt. Are they keeping at least $15-$25 out of every $100 in revenue?",
        quizQuestion: {
          question: "If a company reports $50B in Revenue and $52B in Total Expenses, what is its Net Profit?",
          options: [
            "Positive $2B profit",
            "A Net Loss of -$2B",
            "Zero, because revenue covers all expenses",
            "It cannot be determined"
          ],
          correctIndex: 1,
          explanation: "When expenses exceed revenue, the company operates at a net loss of -$2B."
        }
      },
      {
        id: 'l2-2',
        title: 'Debt vs. Cash: The Fortress Balance Sheet',
        duration: '3 min read',
        content: [
          "Debt is borrowed money. While moderate debt can accelerate growth, heavy debt is dangerous when economic storms arrive.",
          "Cash and cash equivalents are the company's emergency reserves. A company with high cash and zero debt can never go bankrupt.",
          "In StockCourt, the Bear Analyst aggressively inspects whether debt is growing faster than Free Cash Flow."
        ],
        keyTakeaway: "A strong balance sheet gives a company resilience during recessions and allows it to acquire weaker rivals at a discount.",
        practicalExercise: "Check if cash reserves exceed total debt (Net Cash position) or if debt is more than 3x annual profits.",
        quizQuestion: {
          question: "Why does the Bear Analyst closely inspect a company's debt levels?",
          options: [
            "Because debt has no effect on business operations",
            "High debt requires fixed interest payments that can crush profits if business slows down",
            "Companies with debt are automatically illegal",
            "Banks prefer companies with no earnings"
          ],
          correctIndex: 1,
          explanation: "Fixed debt obligations cannot be delayed even if revenue drops, making heavily indebted companies high-risk."
        }
      }
    ]
  },
  {
    level: 3,
    title: 'Understanding Stocks & Valuation',
    description: "Decode Market Cap, EPS, P/E, and how to tell if a stock is overvalued or reasonably priced.",
    badge: 'Level 3: The Evaluator',
    lessons: [
      {
        id: 'l3-1',
        title: 'P/E Ratio Explained Without Jargon',
        duration: '4 min read',
        content: [
          "The P/E Ratio (Price-to-Earnings) compares what the stock costs with what the company earns per share.",
          "If Stock A trades at $30 and earns $1 per share, P/E is 30. If Stock B trades at $100 and earns $10 per share, P/E is 10.",
          "Notice that Stock B has a higher share price ($100 vs $30), but it is actually THREE TIMES CHEAPER relative to its profits (P/E of 10 vs 30)!",
          "Never assume a $10 stock is cheaper than a $200 stock. Always look at the valuation multiple."
        ],
        keyTakeaway: "Share price alone tells you nothing about value. The P/E ratio puts price into context against actual profit.",
        practicalExercise: "In StockCourt, compare the defendant's P/E with its sector average and historical 5-year average.",
        quizQuestion: {
          question: "Company X costs $20/share with EPS of $0.50 (P/E = 40). Company Y costs $200/share with EPS of $20 (P/E = 10). Which is cheaper based on earnings?",
          options: [
            "Company X, because $20 is a smaller number than $200",
            "Company Y, because you pay only $10 per dollar of earnings compared to $40 for Company X",
            "Both are identical",
            "P/E cannot measure price against earnings"
          ],
          correctIndex: 1,
          explanation: "Company Y has a lower P/E (10 vs 40), meaning investors pay significantly less for each unit of earnings."
        }
      }
    ]
  },
  {
    level: 4,
    title: 'Understanding Business Quality',
    description: "What makes a business exceptional? Economic moats, high ROIC, and Free Cash Flow.",
    badge: 'Level 4: The Detective',
    lessons: [
      {
        id: 'l4-1',
        title: 'What is an Economic Moat (Competitive Advantage)?',
        duration: '4 min read',
        content: [
          "In medieval times, castles were surrounded by deep moats filled with water to stop invaders.",
          "In business, an 'economic moat' protects a company's profits from competitors trying to steal its customers.",
          "Types of moats: 1) Brand Loyalty (Apple, Coca-Cola), 2) High Switching Costs (Microsoft Enterprise, Oracle), 3) Network Effects (Visa, YouTube), 4) Cost Advantage (Costco, TSMC).",
          "Without a moat, high profits inevitably attract competitors who lower prices until profits disappear."
        ],
        keyTakeaway: "The Bull Analyst looks for wide economic moats that ensure the company can defend its high profit margins for decades.",
        practicalExercise: "Ask yourself: If someone gave you $10 Billion, could you build a competitor that defeats this company? If no, it has a moat.",
        quizQuestion: {
          question: "What is an example of a 'Network Effect' moat?",
          options: [
            "A company with lower shipping costs because it owns cargo ships",
            "A platform that becomes more valuable to every user as more people join it",
            "A store with colorful signboards",
            "A company with high debt"
          ],
          correctIndex: 1,
          explanation: "A network effect occurs when each new user adds value to all existing users (e.g. Visa, social platforms, marketplaces)."
        }
      }
    ]
  },
  {
    level: 5,
    title: 'Understanding Risk',
    description: "Learn to spot hidden pitfalls before they damage your portfolio: Regulation, Concentration, and Hype.",
    badge: 'Level 5: The Skeptic',
    lessons: [
      {
        id: 'l5-1',
        title: 'The Bear Analyst Playbook: Spotting Hidden Risks',
        duration: '4 min read',
        content: [
          "Most beginners only read about what could go right (the Bull case). Professional analysts spend most of their time studying what could go wrong.",
          "Key risks to evaluate: Customer concentration (does one customer generate 30% of sales?), Geographic risk (are factories located in politically unstable zones?), and Valuation risk (is perfection already priced in?).",
          "When expectations are set at 100%, even a 95% performance causes the stock to crash. That is why the Bear Analyst tests downside scenarios."
        ],
        keyTakeaway: "Risk is not just the stock price moving; risk is the permanent impairment of capital due to unforeseen business breakdown.",
        practicalExercise: "Review the 'Bear Analyst' panel in StockCourt. Pay special attention to arguments labeled 'CRITICAL' or 'HIGH' severity.",
        quizQuestion: {
          question: "What happens when a stock is priced for perfection (very high P/E) and it misses earnings expectations slightly?",
          options: [
            "The stock automatically rises because investors feel generous",
            "The stock can experience sharp selloffs as the market lowers future expectations",
            "Nothing happens",
            "The company is forced to shut down immediately"
          ],
          correctIndex: 1,
          explanation: "High multiples leave zero margin for error. Any minor slowdown leads to multiple contraction and stock drops."
        }
      }
    ]
  },
  {
    level: 6,
    title: 'Putting It Together: The Courtroom Method',
    description: "Synthesize Bull, Bear, and Judge perspectives into disciplined, objective research.",
    badge: 'Level 6: Chief Justice',
    lessons: [
      {
        id: 'l6-1',
        title: 'How to Think Like the Evidence Judge',
        duration: '5 min read',
        content: [
          "In StockCourt, the Bull Analyst will always tell you why you should love the stock. The Bear Analyst will always tell you why you should fear it.",
          "The Evidence Judge is the heart of StockCourt: it doesn't pick sides. It demands verifiable proof: 'Show me the 10-K filing. Show me the cash flow statement. Show me the audited numbers.'",
          "By putting the investment case on trial, you eliminate emotional bias and FOMO (Fear Of Missing Out). You learn to research first, weigh the trade-offs, and decide for yourself."
        ],
        keyTakeaway: "Never invest on a single voice. Always hear the prosecution, hear the defense, fact-check with evidence, and maintain humility.",
        practicalExercise: "Run a case in StockCourt AI. Read both Bull and Bear claims, inspect the Judge's audit, and check the 'What could change the verdict' list.",
        quizQuestion: {
          question: "What is the primary role of the Evidence Judge in StockCourt AI?",
          options: [
            "To tell users with 100% guarantee whether a stock will go up tomorrow",
            "To independently fact-check claims against reliable filings and deliver an evidence-based research assessment",
            "To always agree with the Bull Analyst",
            "To flip a coin and pick a random stock"
          ],
          correctIndex: 1,
          explanation: "The Evidence Judge independently audits facts, rates evidentiary strength, and explains the balance of risks."
        }
      }
    ]
  }
];
