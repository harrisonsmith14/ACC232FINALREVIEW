import React, { useState, useEffect, useMemo } from 'react';

// ============ QUESTION BANK ============
// Weighted toward Ch 3 & 4 per professor's email (8-10 questions each)
// Mix of computational and conceptual to match 60/40 exam split

const QUESTIONS = [
  // ============ CHAPTER 1 ============
  {
    id: 'c1-1', chapter: 1, topic: 'Financial Statements', type: 'conceptual',
    q: 'Which financial statement reports profitability over an interval of time?',
    choices: ['Balance Sheet', 'Income Statement', 'Statement of Cash Flows', 'Statement of Stockholders\' Equity'],
    answer: 1,
    explain: 'The Income Statement reports Revenues − Expenses = Net Income over a period. The Balance Sheet is "as of" a specific point in time.'
  },
  {
    id: 'c1-2', chapter: 1, topic: 'Accounting Equation', type: 'computational',
    q: 'A company has Assets of $80,000 and Liabilities of $30,000. What is Stockholders\' Equity?',
    choices: ['$50,000', '$110,000', '$30,000', '$80,000'],
    answer: 0,
    explain: 'Assets = Liabilities + SE → $80,000 = $30,000 + SE → SE = $50,000.'
  },
  {
    id: 'c1-3', chapter: 1, topic: 'Business Activities', type: 'conceptual',
    q: 'Issuing common stock to investors is which type of business activity?',
    choices: ['Operating', 'Investing', 'Financing', 'Producing'],
    answer: 2,
    explain: 'Financing activities are transactions with investors and creditors to fund the company.'
  },
  {
    id: 'c1-4', chapter: 1, topic: 'Retained Earnings', type: 'computational',
    q: 'Beginning RE was $20,000. Net Income was $15,000. Dividends paid were $4,000. What is Ending RE?',
    choices: ['$31,000', '$39,000', '$11,000', '$1,000'],
    answer: 0,
    explain: 'Beginning RE + Net Income − Dividends = $20,000 + $15,000 − $4,000 = $31,000.'
  },
  {
    id: 'c1-5', chapter: 1, topic: 'GAAP/SEC', type: 'conceptual',
    q: 'Which body writes accounting standards (GAAP) in the United States?',
    choices: ['SEC', 'FASB', 'IRS', 'PCAOB'],
    answer: 1,
    explain: 'FASB (Financial Accounting Standards Board) writes GAAP. The SEC enforces it for public companies.'
  },
  {
    id: 'c1-6', chapter: 1, topic: 'Reporting', type: 'conceptual',
    q: 'A company\'s CEO unexpectedly resigns. Which form must the company file?',
    choices: ['10-K', '10-Q', '8-K', 'S-1'],
    answer: 2,
    explain: 'Form 8-K is filed for significant events like a CEO resignation, bankruptcy, or merger — usually within 4 days.'
  },

  // ============ CHAPTER 2 ============
  {
    id: 'c2-1', chapter: 2, topic: 'Asset Classification', type: 'conceptual',
    q: 'Which of the following is NOT a current asset?',
    choices: ['Inventory', 'Accounts Receivable', 'Prepaid Rent', 'Equipment'],
    answer: 3,
    explain: 'Equipment is a long-term asset (PP&E). Current assets provide benefits within one year.'
  },
  {
    id: 'c2-2', chapter: 2, topic: 'Liabilities', type: 'conceptual',
    q: 'A customer pays you $1,200 in advance for services to be performed next month. How is this recorded?',
    choices: ['Service Revenue (credit)', 'Accounts Receivable (debit)', 'Deferred Revenue (credit)', 'Prepaid Service (asset)'],
    answer: 2,
    explain: 'Deferred Revenue is a LIABILITY — it represents an obligation to perform services. Cash received before earning revenue.'
  },
  {
    id: 'c2-3', chapter: 2, topic: 'Income Statement', type: 'computational',
    q: 'Sales = $200,000, COGS = $120,000, Operating Expenses = $50,000. What is Operating Income?',
    choices: ['$80,000', '$30,000', '$200,000', '$50,000'],
    answer: 1,
    explain: 'Gross Profit = $200,000 − $120,000 = $80,000. Operating Income = $80,000 − $50,000 = $30,000.'
  },
  {
    id: 'c2-4', chapter: 2, topic: 'Cash Flows', type: 'conceptual',
    q: 'Under US GAAP, "Interest Paid" is classified as which type of cash flow?',
    choices: ['Operating', 'Investing', 'Financing', 'Non-cash'],
    answer: 0,
    explain: 'Common trap! Under US GAAP, interest paid AND interest received are OPERATING cash flows. Dividends paid is financing.'
  },
  {
    id: 'c2-5', chapter: 2, topic: 'Revenue vs Gain', type: 'conceptual',
    q: 'A company sells an old delivery truck for $5,000 above its book value. This $5,000 is reported as:',
    choices: ['Revenue', 'A Gain', 'A reduction of expense', 'Other comprehensive income'],
    answer: 1,
    explain: 'Revenue comes from CORE operations. Selling a delivery truck is peripheral, so the excess is a Gain (not Revenue).'
  },
  {
    id: 'c2-6', chapter: 2, topic: 'Prepaid Expenses', type: 'conceptual',
    q: 'A "Prepaid Expense" account is classified as a:',
    choices: ['Liability', 'Expense', 'Asset', 'Equity account'],
    answer: 2,
    explain: 'Prepaid expenses (Prepaid Rent, Prepaid Insurance) are ASSETS — they represent future benefits the company has paid for.'
  },

  // ============ CHAPTER 3 (HIGH PRIORITY — 8-10 questions on exam) ============
  {
    id: 'c3-1', chapter: 3, topic: 'DEALOR', type: 'conceptual',
    q: 'Which of the following accounts increases with a DEBIT?',
    choices: ['Common Stock', 'Service Revenue', 'Salaries Expense', 'Accounts Payable'],
    answer: 2,
    explain: 'DEALOR: Dividends, Expenses, Assets increase with debit. Liabilities, Owners\' equity, Revenue increase with credit.'
  },
  {
    id: 'c3-2', chapter: 3, topic: 'Journal Entry', type: 'computational',
    q: 'A company borrows $20,000 from a bank by signing a note. What is the journal entry?',
    choices: [
      'Debit Cash $20,000; Credit Common Stock $20,000',
      'Debit Cash $20,000; Credit Notes Payable $20,000',
      'Debit Notes Payable $20,000; Credit Cash $20,000',
      'Debit Notes Receivable $20,000; Credit Cash $20,000'
    ],
    answer: 1,
    explain: 'Cash increases (asset, debit) and Notes Payable increases (liability, credit). Both for $20,000.'
  },
  {
    id: 'c3-3', chapter: 3, topic: 'On Account', type: 'conceptual',
    q: 'A company performs $3,000 of services "on account." Which entry is correct?',
    choices: [
      'Debit Cash $3,000; Credit Service Revenue $3,000',
      'Debit Accounts Payable $3,000; Credit Service Revenue $3,000',
      'Debit Accounts Receivable $3,000; Credit Service Revenue $3,000',
      'Debit Service Revenue $3,000; Credit Accounts Receivable $3,000'
    ],
    answer: 2,
    explain: 'Performing services "on account" means the customer owes you → Accounts Receivable (asset, debit). Revenue is earned (credit).'
  },
  {
    id: 'c3-4', chapter: 3, topic: 'Dividends', type: 'conceptual',
    q: 'A company pays $2,000 in dividends. The journal entry is:',
    choices: [
      'Debit Dividend Expense $2,000; Credit Cash $2,000',
      'Debit Dividends $2,000; Credit Cash $2,000',
      'Debit Retained Earnings $2,000; Credit Dividends $2,000',
      'Debit Cash $2,000; Credit Dividends $2,000'
    ],
    answer: 1,
    explain: 'Dividends are NOT expenses — they reduce Retained Earnings directly. The Dividends account is debited, Cash is credited.'
  },
  {
    id: 'c3-5', chapter: 3, topic: 'Deferred Revenue', type: 'conceptual',
    q: 'A company receives $5,000 cash for services to be performed next month. The journal entry is:',
    choices: [
      'Debit Cash $5,000; Credit Service Revenue $5,000',
      'Debit Cash $5,000; Credit Deferred Revenue $5,000',
      'Debit Accounts Receivable $5,000; Credit Service Revenue $5,000',
      'Debit Deferred Revenue $5,000; Credit Cash $5,000'
    ],
    answer: 1,
    explain: 'Cash received before earning = Deferred Revenue (liability). Revenue is recognized later when work is done.'
  },
  {
    id: 'c3-6', chapter: 3, topic: 'Prepaid Rent', type: 'conceptual',
    q: 'A company pays $12,000 for one year of rent in advance. The journal entry is:',
    choices: [
      'Debit Rent Expense $12,000; Credit Cash $12,000',
      'Debit Cash $12,000; Credit Prepaid Rent $12,000',
      'Debit Prepaid Rent $12,000; Credit Cash $12,000',
      'Debit Prepaid Rent $12,000; Credit Rent Expense $12,000'
    ],
    answer: 2,
    explain: 'Prepaid Rent is an ASSET (future benefit). Debit the asset, credit cash. It will be expensed over time as the rent is used.'
  },
  {
    id: 'c3-7', chapter: 3, topic: 'Trial Balance', type: 'conceptual',
    q: 'A trial balance shows total debits of $45,000 and total credits of $43,000. What does this indicate?',
    choices: [
      'The accounting equation is in balance',
      'The company has $2,000 in net income',
      'There is an error in the journal entries or postings',
      'Adjusting entries are needed'
    ],
    answer: 2,
    explain: 'A trial balance MUST have equal debits and credits. A discrepancy indicates an error in recording or posting.'
  },
  {
    id: 'c3-8', chapter: 3, topic: 'Expense', type: 'computational',
    q: 'A company pays $800 for utilities used this month. The journal entry includes:',
    choices: [
      'Debit Utilities Payable $800',
      'Credit Utilities Expense $800',
      'Debit Utilities Expense $800',
      'Credit Cash and Debit Utilities Payable'
    ],
    answer: 2,
    explain: 'Utilities used = expense (debit). Cash paid = decrease in asset (credit). Debit Utilities Expense $800; Credit Cash $800.'
  },
  {
    id: 'c3-9', chapter: 3, topic: 'Buy on Account', type: 'conceptual',
    q: 'A company purchases $1,500 of supplies on account. The entry is:',
    choices: [
      'Debit Supplies $1,500; Credit Cash $1,500',
      'Debit Supplies $1,500; Credit Accounts Payable $1,500',
      'Debit Accounts Receivable $1,500; Credit Supplies $1,500',
      'Debit Supplies Expense $1,500; Credit Cash $1,500'
    ],
    answer: 1,
    explain: 'Buying "on account" = Accounts Payable (liability we owe). Supplies is an asset we now own.'
  },
  {
    id: 'c3-10', chapter: 3, topic: 'Accounting Equation', type: 'computational',
    q: 'A company purchases $10,000 of equipment by paying $3,000 cash and signing a note for the rest. What is the impact on total assets?',
    choices: ['+$10,000', '+$7,000', '+$3,000', 'No change'],
    answer: 1,
    explain: 'Equipment +$10,000, Cash −$3,000 → net assets +$7,000. The other $7,000 is a Notes Payable (liability).'
  },

  // ============ CHAPTER 4 (HIGH PRIORITY — 8-10 questions on exam) ============
  {
    id: 'c4-1', chapter: 4, topic: 'Adjusting Entries', type: 'conceptual',
    q: 'Which account is NEVER used in an adjusting entry?',
    choices: ['Salaries Expense', 'Cash', 'Accounts Receivable', 'Deferred Revenue'],
    answer: 1,
    explain: 'Cash is NEVER in an adjusting entry. Cash either moved earlier (prepayment) or will move later (accrual).'
  },
  {
    id: 'c4-2', chapter: 4, topic: 'Accrued Expense', type: 'computational',
    q: 'Employees worked the last 3 days of December and earned $1,500, but won\'t be paid until January. The Dec 31 adjusting entry is:',
    choices: [
      'Debit Salaries Expense $1,500; Credit Cash $1,500',
      'Debit Salaries Expense $1,500; Credit Salaries Payable $1,500',
      'Debit Salaries Payable $1,500; Credit Salaries Expense $1,500',
      'No entry until paid in January'
    ],
    answer: 1,
    explain: 'Accrued expense: expense incurred (debit), but cash not yet paid → record liability (Salaries Payable, credit).'
  },
  {
    id: 'c4-3', chapter: 4, topic: 'Prepaid Adjustment', type: 'computational',
    q: 'A company paid $6,000 for 6 months of insurance on Oct 1 (Prepaid Insurance). What is the Dec 31 adjusting entry?',
    choices: [
      'Debit Insurance Expense $3,000; Credit Prepaid Insurance $3,000',
      'Debit Insurance Expense $6,000; Credit Cash $6,000',
      'Debit Prepaid Insurance $3,000; Credit Insurance Expense $3,000',
      'Debit Insurance Expense $1,000; Credit Prepaid Insurance $1,000'
    ],
    answer: 0,
    explain: '3 of 6 months used (Oct, Nov, Dec) = $6,000 × 3/6 = $3,000 expensed. Reduce the asset, record the expense.'
  },
  {
    id: 'c4-4', chapter: 4, topic: 'Deferred Revenue', type: 'computational',
    q: 'A company received $1,200 in advance for 12 months of service on Sept 1. What is the Dec 31 adjusting entry?',
    choices: [
      'Debit Service Revenue $400; Credit Deferred Revenue $400',
      'Debit Deferred Revenue $400; Credit Service Revenue $400',
      'Debit Cash $400; Credit Service Revenue $400',
      'Debit Deferred Revenue $1,200; Credit Service Revenue $1,200'
    ],
    answer: 1,
    explain: '4 months earned (Sept-Dec) = $1,200 × 4/12 = $400. Reduce the liability, recognize revenue.'
  },
  {
    id: 'c4-5', chapter: 4, topic: 'Depreciation', type: 'computational',
    q: 'Equipment cost $50,000 with $5,000 residual value and 5-year life. What is the annual straight-line depreciation?',
    choices: ['$10,000', '$11,000', '$9,000', '$5,000'],
    answer: 2,
    explain: '(Cost − Residual) / Life = ($50,000 − $5,000) / 5 = $9,000 per year.'
  },
  {
    id: 'c4-6', chapter: 4, topic: 'Accrued Interest', type: 'computational',
    q: 'A company borrowed $24,000 at 5% annual interest on Nov 1. What is the Dec 31 accrued interest?',
    choices: ['$1,200', '$200', '$100', '$600'],
    answer: 1,
    explain: 'Interest = Principal × Rate × Time = $24,000 × 5% × 2/12 = $200. Always prorate annual rates!'
  },
  {
    id: 'c4-7', chapter: 4, topic: 'Closing Entries', type: 'conceptual',
    q: 'Which of the following accounts is NOT closed at year-end?',
    choices: ['Service Revenue', 'Salaries Expense', 'Dividends', 'Accounts Receivable'],
    answer: 3,
    explain: 'Accounts Receivable is a PERMANENT (balance sheet) account — it carries forward. Revenues, expenses, and dividends are TEMPORARY and get closed.'
  },
  {
    id: 'c4-8', chapter: 4, topic: 'Accrued Revenue', type: 'computational',
    q: 'A company performed $700 of services in December but won\'t bill the client until January. The Dec 31 entry is:',
    choices: [
      'No entry until billed',
      'Debit Cash $700; Credit Service Revenue $700',
      'Debit Accounts Receivable $700; Credit Service Revenue $700',
      'Debit Service Revenue $700; Credit Accounts Receivable $700'
    ],
    answer: 2,
    explain: 'Accrued revenue: revenue earned but not yet collected. Debit AR (asset increases), credit Service Revenue.'
  },
  {
    id: 'c4-9', chapter: 4, topic: 'Cash vs Accrual', type: 'conceptual',
    q: 'A company sells $5,000 of services on credit in December. Cash is collected in January. Under accrual basis, when is revenue recognized?',
    choices: ['December', 'January', 'Split between months', 'When cash is collected'],
    answer: 0,
    explain: 'Accrual basis: record revenue when EARNED (services provided), not when cash is received. Revenue goes on December\'s income statement.'
  },
  {
    id: 'c4-10', chapter: 4, topic: 'Book Value', type: 'computational',
    q: 'Equipment cost $40,000 with accumulated depreciation of $15,000. What is its book value?',
    choices: ['$40,000', '$15,000', '$25,000', '$55,000'],
    answer: 2,
    explain: 'Book Value = Cost − Accumulated Depreciation = $40,000 − $15,000 = $25,000.'
  },
  {
    id: 'c4-11', chapter: 4, topic: 'Post-Closing Trial Balance', type: 'conceptual',
    q: 'After the closing process, which account should have a ZERO balance?',
    choices: ['Cash', 'Common Stock', 'Service Revenue', 'Retained Earnings'],
    answer: 2,
    explain: 'Service Revenue is temporary — closed to Retained Earnings. Permanent accounts (Cash, Common Stock, RE) remain.'
  },
  {
    id: 'c4-12', chapter: 4, topic: 'Supplies Adjustment', type: 'computational',
    q: 'A company started with $500 of supplies and bought $800 more during the year. At year-end, $200 of supplies remain. What is the supplies expense?',
    choices: ['$500', '$800', '$1,100', '$1,300'],
    answer: 2,
    explain: 'Beginning $500 + Purchased $800 − Ending $200 = $1,100 used. Debit Supplies Expense $1,100; Credit Supplies $1,100.'
  },
];

// ============ COMPONENT ============

const STORAGE_KEY = 'acc232-study-progress';

function StudyApp() {
  const [progress, setProgress] = useState({}); // { questionId: { correct: n, attempts: n } }
  const [mode, setMode] = useState('home'); // home, quiz, results
  const [filter, setFilter] = useState({ chapter: 'all', priority: 'smart' });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const value = localStorage.getItem(STORAGE_KEY);
        if (value) {
          setProgress(JSON.parse(value));
        }
      } catch (e) {
        // Key doesn't exist yet, that's fine
      }
    };
    loadProgress();
  }, []);

  // Save progress whenever it changes
  const saveProgress = async (newProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Save failed', e);
    }
  };

  // Calculate mastery per question (0-100)
  const getMastery = (qId) => {
    const p = progress[qId];
    if (!p || p.attempts === 0) return null;
    return Math.round((p.correct / p.attempts) * 100);
  };

  // Calculate chapter mastery
  const chapterStats = useMemo(() => {
    const stats = { 1: [], 2: [], 3: [], 4: [] };
    QUESTIONS.forEach(q => {
      const m = getMastery(q.id);
      if (m !== null) stats[q.chapter].push(m);
    });
    return Object.fromEntries(
      Object.entries(stats).map(([ch, arr]) => [
        ch,
        {
          attempted: arr.length,
          total: QUESTIONS.filter(q => q.chapter === parseInt(ch)).length,
          avg: arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null
        }
      ])
    );
  }, [progress]);

  const overallMastery = useMemo(() => {
    const all = QUESTIONS.map(q => getMastery(q.id)).filter(m => m !== null);
    if (!all.length) return null;
    return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
  }, [progress]);

  // Build question queue based on filter
  const startQuiz = (mode) => {
    let pool = [...QUESTIONS];

    if (filter.chapter !== 'all') {
      pool = pool.filter(q => q.chapter === parseInt(filter.chapter));
    }

    if (mode === 'weak') {
      // Surface low-mastery and unattempted questions first
      pool.sort((a, b) => {
        const mA = getMastery(a.id);
        const mB = getMastery(b.id);
        if (mA === null && mB === null) return 0;
        if (mA === null) return -1;
        if (mB === null) return 1;
        return mA - mB;
      });
    } else if (mode === 'smart') {
      // Weight by exam priority: ch3 & ch4 heaviest, then mix in weakest
      pool.sort((a, b) => {
        const wA = (a.chapter === 3 || a.chapter === 4) ? 2 : 1;
        const wB = (b.chapter === 3 || b.chapter === 4) ? 2 : 1;
        const mA = getMastery(a.id) ?? 0;
        const mB = getMastery(b.id) ?? 0;
        // Lower mastery × higher weight = higher priority (sort ascending)
        return (mA / wA) - (mB / wB);
      });
    } else {
      // Random shuffle
      pool.sort(() => Math.random() - 0.5);
    }

    setQuestionQueue(pool);
    setCurrentQuestion(pool[0]);
    setSelectedChoice(null);
    setShowAnswer(false);
    setSessionStats({ correct: 0, total: 0 });
    setMode('quiz');
  };

  const submitAnswer = () => {
    if (selectedChoice === null) return;
    const isCorrect = selectedChoice === currentQuestion.answer;
    const newProgress = {
      ...progress,
      [currentQuestion.id]: {
        correct: (progress[currentQuestion.id]?.correct || 0) + (isCorrect ? 1 : 0),
        attempts: (progress[currentQuestion.id]?.attempts || 0) + 1,
      }
    };
    saveProgress(newProgress);
    setSessionStats(s => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1
    }));
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    const remaining = questionQueue.slice(1);
    setQuestionQueue(remaining);
    if (remaining.length === 0) {
      setMode('results');
    } else {
      setCurrentQuestion(remaining[0]);
      setSelectedChoice(null);
      setShowAnswer(false);
    }
  };

  const resetProgress = async () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      await saveProgress({});
    }
  };

  // ============ RENDER ============

  const masteryColor = (m) => {
    if (m === null) return 'var(--muted)';
    if (m >= 80) return 'var(--green)';
    if (m >= 50) return 'var(--amber)';
    return 'var(--red)';
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700;9..144,900&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --bg: #f4f1ea;
      --paper: #fafaf6;
      --ink: #1a1a1a;
      --muted: #8b8478;
      --line: #d8d3c5;
      --accent: #c2410c;
      --green: #15803d;
      --amber: #b45309;
      --red: #b91c1c;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .app {
      min-height: 100vh;
      background: var(--bg);
      color: var(--ink);
      font-family: 'Fraunces', Georgia, serif;
      padding: 32px 20px;
      font-feature-settings: "ss01", "ss02";
    }

    .container {
      max-width: 720px;
      margin: 0 auto;
    }

    .mono { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; }

    .header {
      border-bottom: 1px solid var(--line);
      padding-bottom: 20px;
      margin-bottom: 32px;
    }

    .title {
      font-size: 2.6rem;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }

    .subtitle {
      color: var(--muted);
      font-size: 0.95rem;
      font-style: italic;
    }

    .stats-overview {
      background: var(--paper);
      border: 1px solid var(--line);
      padding: 24px;
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 16px;
    }

    .chapter-card {
      padding: 14px 12px;
      border: 1px solid var(--line);
      background: var(--bg);
      text-align: left;
    }

    .chapter-num {
      font-size: 0.7rem;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.1em;
    }

    .chapter-mastery {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.1;
      margin: 4px 0;
    }

    .chapter-meta {
      font-size: 0.72rem;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .priority-badge {
      display: inline-block;
      font-size: 0.6rem;
      background: var(--accent);
      color: white;
      padding: 1px 5px;
      margin-left: 4px;
      letter-spacing: 0.05em;
      vertical-align: middle;
    }

    .controls {
      background: var(--paper);
      border: 1px solid var(--line);
      padding: 24px;
      margin-bottom: 24px;
    }

    .control-row {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .chip {
      padding: 8px 14px;
      border: 1px solid var(--line);
      background: var(--bg);
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: all 0.15s ease;
      color: var(--ink);
    }

    .chip:hover { border-color: var(--ink); }
    .chip.active { background: var(--ink); color: var(--bg); border-color: var(--ink); }

    .label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
      display: block;
    }

    .btn-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }

    .btn {
      padding: 14px 24px;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.15s ease;
      flex: 1;
      min-width: 120px;
    }

    .btn-primary {
      background: var(--accent);
      color: white;
    }
    .btn-primary:hover { background: #9a3412; }

    .btn-secondary {
      background: transparent;
      border: 1px solid var(--ink);
      color: var(--ink);
    }
    .btn-secondary:hover { background: var(--ink); color: var(--bg); }

    .btn-ghost {
      background: transparent;
      border: 1px solid var(--line);
      color: var(--muted);
      font-size: 0.85rem;
    }
    .btn-ghost:hover { color: var(--red); border-color: var(--red); }

    /* QUIZ MODE */
    .quiz-card {
      background: var(--paper);
      border: 1px solid var(--line);
      padding: 32px;
    }

    .quiz-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--line);
    }

    .question-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      color: var(--muted);
      text-transform: uppercase;
    }

    .question-text {
      font-size: 1.25rem;
      line-height: 1.5;
      margin-bottom: 24px;
      font-weight: 500;
    }

    .choices { display: flex; flex-direction: column; gap: 8px; }

    .choice {
      padding: 14px 18px;
      border: 1px solid var(--line);
      background: var(--bg);
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.12s ease;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .choice:hover:not(:disabled) { border-color: var(--ink); }
    .choice.selected { border-color: var(--ink); background: #ebe6d8; }
    .choice.correct {
      border-color: var(--green);
      background: #dcfce7;
    }
    .choice.incorrect {
      border-color: var(--red);
      background: #fee2e2;
    }

    .choice-letter {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--muted);
      font-weight: 600;
    }

    .choice.correct .choice-letter { color: var(--green); }
    .choice.incorrect .choice-letter { color: var(--red); }

    .explain {
      margin-top: 20px;
      padding: 18px;
      background: var(--bg);
      border-left: 3px solid var(--accent);
      font-size: 0.95rem;
      line-height: 1.55;
      font-style: italic;
    }

    .explain-label {
      font-family: 'JetBrains Mono', monospace;
      font-style: normal;
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
      display: block;
      margin-bottom: 6px;
    }

    .quiz-footer {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .session-stat {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: var(--muted);
    }

    /* RESULTS */
    .results {
      text-align: center;
      padding: 48px 24px;
    }
    .results-score {
      font-size: 5rem;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.04em;
      margin: 16px 0;
    }

    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .title { font-size: 2rem; }
      .quiz-card { padding: 20px; }
      .question-text { font-size: 1.1rem; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="container">
          <header className="header">
            <h1 className="title">Acc 232 — Final.</h1>
            <p className="subtitle">Active recall · Ch 1–4 · {QUESTIONS.length} questions in the bank</p>
          </header>

          {mode === 'home' && (
            <>
              <div className="stats-overview">
                <span className="label">Overall Mastery</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, color: masteryColor(overallMastery) }}>
                    {overallMastery !== null ? `${overallMastery}%` : '—'}
                  </div>
                  <div className="mono" style={{ color: 'var(--muted)' }}>
                    {Object.values(progress).filter(p => p.attempts > 0).length} / {QUESTIONS.length} attempted
                  </div>
                </div>

                <div className="stats-grid">
                  {[1, 2, 3, 4].map(ch => {
                    const s = chapterStats[ch];
                    const isPriority = ch === 3 || ch === 4;
                    return (
                      <div key={ch} className="chapter-card">
                        <div className="chapter-num">
                          Ch {ch}{isPriority && <span className="priority-badge">PRIORITY</span>}
                        </div>
                        <div className="chapter-mastery" style={{ color: masteryColor(s.avg) }}>
                          {s.avg !== null ? `${s.avg}%` : '—'}
                        </div>
                        <div className="chapter-meta">
                          {s.attempted}/{s.total}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="controls">
                <span className="label">Filter Chapter</span>
                <div className="control-row">
                  {['all', '1', '2', '3', '4'].map(c => (
                    <button
                      key={c}
                      className={`chip ${filter.chapter === c ? 'active' : ''}`}
                      onClick={() => setFilter(f => ({ ...f, chapter: c }))}
                    >
                      {c === 'all' ? 'All' : `Ch ${c}`}
                    </button>
                  ))}
                </div>

                <div className="btn-row">
                  <button className="btn btn-primary" onClick={() => startQuiz('smart')}>
                    Smart Drill
                  </button>
                  <button className="btn btn-secondary" onClick={() => startQuiz('weak')}>
                    Weak Areas
                  </button>
                  <button className="btn btn-secondary" onClick={() => startQuiz('random')}>
                    Random
                  </button>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn btn-ghost" onClick={resetProgress} style={{ width: 'auto' }}>
                    Reset Progress
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center', marginTop: 24, fontStyle: 'italic' }}>
                Smart Drill prioritizes Ch 3 & 4 (heaviest exam weight) and your weakest topics.
              </div>
            </>
          )}

          {mode === 'quiz' && currentQuestion && (
            <div className="quiz-card">
              <div className="quiz-header">
                <span className="question-meta">
                  Ch {currentQuestion.chapter} · {currentQuestion.topic} · {currentQuestion.type}
                </span>
                <span className="question-meta">
                  {sessionStats.total + 1} / {sessionStats.total + questionQueue.length}
                </span>
              </div>

              <p className="question-text">{currentQuestion.q}</p>

              <div className="choices">
                {currentQuestion.choices.map((choice, i) => {
                  const letter = String.fromCharCode(65 + i);
                  let cls = 'choice';
                  if (selectedChoice === i && !showAnswer) cls += ' selected';
                  if (showAnswer) {
                    if (i === currentQuestion.answer) cls += ' correct';
                    else if (i === selectedChoice) cls += ' incorrect';
                  }
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => !showAnswer && setSelectedChoice(i)}
                      disabled={showAnswer}
                    >
                      <span className="choice-letter">{letter}</span>
                      <span>{choice}</span>
                    </button>
                  );
                })}
              </div>

              {showAnswer && (
                <div className="explain">
                  <span className="explain-label">Explanation</span>
                  {currentQuestion.explain}
                </div>
              )}

              <div className="quiz-footer">
                <span className="session-stat">
                  {sessionStats.correct} / {sessionStats.total} correct
                </span>
                {!showAnswer ? (
                  <button
                    className="btn btn-primary"
                    onClick={submitAnswer}
                    disabled={selectedChoice === null}
                    style={{ flex: 'none', minWidth: 140, opacity: selectedChoice === null ? 0.4 : 1 }}
                  >
                    Submit
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={nextQuestion} style={{ flex: 'none', minWidth: 140 }}>
                    {questionQueue.length > 1 ? 'Next →' : 'Finish'}
                  </button>
                )}
              </div>

              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <button className="btn btn-ghost" onClick={() => setMode('home')} style={{ width: 'auto', flex: 'none' }}>
                  Exit Session
                </button>
              </div>
            </div>
          )}

          {mode === 'results' && (
            <div className="quiz-card results">
              <span className="label">Session Complete</span>
              <div className="results-score" style={{ color: masteryColor(Math.round((sessionStats.correct / sessionStats.total) * 100)) }}>
                {sessionStats.correct}/{sessionStats.total}
              </div>
              <p style={{ color: 'var(--muted)', fontStyle: 'italic', marginBottom: 24 }}>
                {sessionStats.correct === sessionStats.total
                  ? 'Perfect run.'
                  : sessionStats.correct / sessionStats.total >= 0.8
                  ? 'Strong work.'
                  : sessionStats.correct / sessionStats.total >= 0.6
                  ? 'Solid foundation. Drill the misses.'
                  : 'Keep going. Mastery is built one rep at a time.'}
              </p>
              <button className="btn btn-primary" onClick={() => setMode('home')} style={{ flex: 'none', minWidth: 200 }}>
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudyApp;
