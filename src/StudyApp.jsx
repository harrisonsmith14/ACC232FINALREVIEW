import React, { useState, useEffect, useMemo } from 'react';

// Ch 1-4 = Midterm 1 · Ch 5-8 = Midterm 2 · Ch 9-12 = Midterm 3 (coming next)

const QUESTIONS = [
  // ============ CHAPTER 1 ============
  { id: 'c1-1', chapter: 1, topic: 'Financial Statements', type: 'conceptual',
    q: 'Which financial statement reports profitability over an interval of time?',
    choices: ['Balance Sheet', 'Income Statement', 'Statement of Cash Flows', 'Statement of Stockholders\' Equity'],
    answer: 1,
    explain: 'The Income Statement reports Revenues − Expenses = Net Income over a period. The Balance Sheet is "as of" a specific point in time.' },
  { id: 'c1-2', chapter: 1, topic: 'Accounting Equation', type: 'computational',
    q: 'A company has Assets of $80,000 and Liabilities of $30,000. What is Stockholders\' Equity?',
    choices: ['$50,000', '$110,000', '$30,000', '$80,000'], answer: 0,
    explain: 'Assets = Liabilities + SE → $80,000 = $30,000 + SE → SE = $50,000.' },
  { id: 'c1-3', chapter: 1, topic: 'Business Activities', type: 'conceptual',
    q: 'Issuing common stock to investors is which type of business activity?',
    choices: ['Operating', 'Investing', 'Financing', 'Producing'], answer: 2,
    explain: 'Financing activities are transactions with investors and creditors to fund the company.' },
  { id: 'c1-4', chapter: 1, topic: 'Retained Earnings', type: 'computational',
    q: 'Beginning RE was $20,000. Net Income was $15,000. Dividends paid were $4,000. What is Ending RE?',
    choices: ['$31,000', '$39,000', '$11,000', '$1,000'], answer: 0,
    explain: 'Beginning RE + Net Income − Dividends = $20,000 + $15,000 − $4,000 = $31,000.' },
  { id: 'c1-5', chapter: 1, topic: 'GAAP/SEC', type: 'conceptual',
    q: 'Which body writes accounting standards (GAAP) in the United States?',
    choices: ['SEC', 'FASB', 'IRS', 'PCAOB'], answer: 1,
    explain: 'FASB (Financial Accounting Standards Board) writes GAAP. The SEC enforces it for public companies.' },
  { id: 'c1-6', chapter: 1, topic: 'Reporting', type: 'conceptual',
    q: 'A company\'s CEO unexpectedly resigns. Which form must the company file?',
    choices: ['10-K', '10-Q', '8-K', 'S-1'], answer: 2,
    explain: 'Form 8-K is filed for significant events like a CEO resignation, bankruptcy, or merger — usually within 4 days.' },

  // ============ CHAPTER 2 ============
  { id: 'c2-1', chapter: 2, topic: 'Asset Classification', type: 'conceptual',
    q: 'Which of the following is NOT a current asset?',
    choices: ['Inventory', 'Accounts Receivable', 'Prepaid Rent', 'Equipment'], answer: 3,
    explain: 'Equipment is a long-term asset (PP&E). Current assets provide benefits within one year.' },
  { id: 'c2-2', chapter: 2, topic: 'Liabilities', type: 'conceptual',
    q: 'A customer pays you $1,200 in advance for services to be performed next month. How is this recorded?',
    choices: ['Service Revenue (credit)', 'Accounts Receivable (debit)', 'Deferred Revenue (credit)', 'Prepaid Service (asset)'],
    answer: 2,
    explain: 'Deferred Revenue is a LIABILITY — it represents an obligation to perform services. Cash received before earning revenue.' },
  { id: 'c2-3', chapter: 2, topic: 'Income Statement', type: 'computational',
    q: 'Sales = $200,000, COGS = $120,000, Operating Expenses = $50,000. What is Operating Income?',
    choices: ['$80,000', '$30,000', '$200,000', '$50,000'], answer: 1,
    explain: 'Gross Profit = $200,000 − $120,000 = $80,000. Operating Income = $80,000 − $50,000 = $30,000.' },
  { id: 'c2-4', chapter: 2, topic: 'Cash Flows', type: 'conceptual',
    q: 'Under US GAAP, "Interest Paid" is classified as which type of cash flow?',
    choices: ['Operating', 'Investing', 'Financing', 'Non-cash'], answer: 0,
    explain: 'Common trap! Under US GAAP, interest paid AND interest received are OPERATING cash flows. Dividends paid is financing.' },
  { id: 'c2-5', chapter: 2, topic: 'Revenue vs Gain', type: 'conceptual',
    q: 'A company sells an old delivery truck for $5,000 above its book value. This $5,000 is reported as:',
    choices: ['Revenue', 'A Gain', 'A reduction of expense', 'Other comprehensive income'], answer: 1,
    explain: 'Revenue comes from CORE operations. Selling a delivery truck is peripheral, so the excess is a Gain (not Revenue).' },
  { id: 'c2-6', chapter: 2, topic: 'Prepaid Expenses', type: 'conceptual',
    q: 'A "Prepaid Expense" account is classified as a:',
    choices: ['Liability', 'Expense', 'Asset', 'Equity account'], answer: 2,
    explain: 'Prepaid expenses (Prepaid Rent, Prepaid Insurance) are ASSETS — they represent future benefits the company has paid for.' },

  // ============ CHAPTER 3 (HIGH PRIORITY — 8-10 questions on exam) ============
  { id: 'c3-1', chapter: 3, topic: 'DEALOR', type: 'conceptual',
    q: 'Which of the following accounts increases with a DEBIT?',
    choices: ['Common Stock', 'Service Revenue', 'Salaries Expense', 'Accounts Payable'], answer: 2,
    explain: 'DEALOR: Dividends, Expenses, Assets increase with debit. Liabilities, Owners\' equity, Revenue increase with credit.' },
  { id: 'c3-2', chapter: 3, topic: 'Journal Entry', type: 'computational',
    q: 'A company borrows $20,000 from a bank by signing a note. What is the journal entry?',
    choices: [
      'Debit Cash $20,000; Credit Common Stock $20,000',
      'Debit Cash $20,000; Credit Notes Payable $20,000',
      'Debit Notes Payable $20,000; Credit Cash $20,000',
      'Debit Notes Receivable $20,000; Credit Cash $20,000'
    ], answer: 1,
    explain: 'Cash increases (asset, debit) and Notes Payable increases (liability, credit). Both for $20,000.' },
  { id: 'c3-3', chapter: 3, topic: 'On Account', type: 'conceptual',
    q: 'A company performs $3,000 of services "on account." Which entry is correct?',
    choices: [
      'Debit Cash $3,000; Credit Service Revenue $3,000',
      'Debit Accounts Payable $3,000; Credit Service Revenue $3,000',
      'Debit Accounts Receivable $3,000; Credit Service Revenue $3,000',
      'Debit Service Revenue $3,000; Credit Accounts Receivable $3,000'
    ], answer: 2,
    explain: 'Performing services "on account" means the customer owes you → Accounts Receivable (asset, debit). Revenue is earned (credit).' },
  { id: 'c3-4', chapter: 3, topic: 'Dividends', type: 'conceptual',
    q: 'A company pays $2,000 in dividends. The journal entry is:',
    choices: [
      'Debit Dividend Expense $2,000; Credit Cash $2,000',
      'Debit Dividends $2,000; Credit Cash $2,000',
      'Debit Retained Earnings $2,000; Credit Dividends $2,000',
      'Debit Cash $2,000; Credit Dividends $2,000'
    ], answer: 1,
    explain: 'Dividends are NOT expenses — they reduce Retained Earnings directly. The Dividends account is debited, Cash is credited.' },
  { id: 'c3-5', chapter: 3, topic: 'Deferred Revenue', type: 'conceptual',
    q: 'A company receives $5,000 cash for services to be performed next month. The journal entry is:',
    choices: [
      'Debit Cash $5,000; Credit Service Revenue $5,000',
      'Debit Cash $5,000; Credit Deferred Revenue $5,000',
      'Debit Accounts Receivable $5,000; Credit Service Revenue $5,000',
      'Debit Deferred Revenue $5,000; Credit Cash $5,000'
    ], answer: 1,
    explain: 'Cash received before earning = Deferred Revenue (liability). Revenue is recognized later when work is done.' },
  { id: 'c3-6', chapter: 3, topic: 'Prepaid Rent', type: 'conceptual',
    q: 'A company pays $12,000 for one year of rent in advance. The journal entry is:',
    choices: [
      'Debit Rent Expense $12,000; Credit Cash $12,000',
      'Debit Cash $12,000; Credit Prepaid Rent $12,000',
      'Debit Prepaid Rent $12,000; Credit Cash $12,000',
      'Debit Prepaid Rent $12,000; Credit Rent Expense $12,000'
    ], answer: 2,
    explain: 'Prepaid Rent is an ASSET (future benefit). Debit the asset, credit cash. It will be expensed over time as the rent is used.' },
  { id: 'c3-7', chapter: 3, topic: 'Trial Balance', type: 'conceptual',
    q: 'A trial balance shows total debits of $45,000 and total credits of $43,000. What does this indicate?',
    choices: [
      'The accounting equation is in balance',
      'The company has $2,000 in net income',
      'There is an error in the journal entries or postings',
      'Adjusting entries are needed'
    ], answer: 2,
    explain: 'A trial balance MUST have equal debits and credits. A discrepancy indicates an error in recording or posting.' },
  { id: 'c3-8', chapter: 3, topic: 'Expense', type: 'computational',
    q: 'A company pays $800 for utilities used this month. The journal entry includes:',
    choices: [
      'Debit Utilities Payable $800',
      'Credit Utilities Expense $800',
      'Debit Utilities Expense $800',
      'Credit Cash and Debit Utilities Payable'
    ], answer: 2,
    explain: 'Utilities used = expense (debit). Cash paid = decrease in asset (credit). Debit Utilities Expense $800; Credit Cash $800.' },
  { id: 'c3-9', chapter: 3, topic: 'Buy on Account', type: 'conceptual',
    q: 'A company purchases $1,500 of supplies on account. The entry is:',
    choices: [
      'Debit Supplies $1,500; Credit Cash $1,500',
      'Debit Supplies $1,500; Credit Accounts Payable $1,500',
      'Debit Accounts Receivable $1,500; Credit Supplies $1,500',
      'Debit Supplies Expense $1,500; Credit Cash $1,500'
    ], answer: 1,
    explain: 'Buying "on account" = Accounts Payable (liability we owe). Supplies is an asset we now own.' },
  { id: 'c3-10', chapter: 3, topic: 'Accounting Equation', type: 'computational',
    q: 'A company purchases $10,000 of equipment by paying $3,000 cash and signing a note for the rest. What is the impact on total assets?',
    choices: ['+$10,000', '+$7,000', '+$3,000', 'No change'], answer: 1,
    explain: 'Equipment +$10,000, Cash −$3,000 → net assets +$7,000. The other $7,000 is a Notes Payable (liability).' },

  // ============ CHAPTER 4 (HIGH PRIORITY — 8-10 questions on exam) ============
  { id: 'c4-1', chapter: 4, topic: 'Adjusting Entries', type: 'conceptual',
    q: 'Which account is NEVER used in an adjusting entry?',
    choices: ['Salaries Expense', 'Cash', 'Accounts Receivable', 'Deferred Revenue'], answer: 1,
    explain: 'Cash is NEVER in an adjusting entry. Cash either moved earlier (prepayment) or will move later (accrual).' },
  { id: 'c4-2', chapter: 4, topic: 'Accrued Expense', type: 'computational',
    q: 'Employees worked the last 3 days of December and earned $1,500, but won\'t be paid until January. The Dec 31 adjusting entry is:',
    choices: [
      'Debit Salaries Expense $1,500; Credit Cash $1,500',
      'Debit Salaries Expense $1,500; Credit Salaries Payable $1,500',
      'Debit Salaries Payable $1,500; Credit Salaries Expense $1,500',
      'No entry until paid in January'
    ], answer: 1,
    explain: 'Accrued expense: expense incurred (debit), but cash not yet paid → record liability (Salaries Payable, credit).' },
  { id: 'c4-3', chapter: 4, topic: 'Prepaid Adjustment', type: 'computational',
    q: 'A company paid $6,000 for 6 months of insurance on Oct 1 (Prepaid Insurance). What is the Dec 31 adjusting entry?',
    choices: [
      'Debit Insurance Expense $3,000; Credit Prepaid Insurance $3,000',
      'Debit Insurance Expense $6,000; Credit Cash $6,000',
      'Debit Prepaid Insurance $3,000; Credit Insurance Expense $3,000',
      'Debit Insurance Expense $1,000; Credit Prepaid Insurance $1,000'
    ], answer: 0,
    explain: '3 of 6 months used (Oct, Nov, Dec) = $6,000 × 3/6 = $3,000 expensed. Reduce the asset, record the expense.' },
  { id: 'c4-4', chapter: 4, topic: 'Deferred Revenue', type: 'computational',
    q: 'A company received $1,200 in advance for 12 months of service on Sept 1. What is the Dec 31 adjusting entry?',
    choices: [
      'Debit Service Revenue $400; Credit Deferred Revenue $400',
      'Debit Deferred Revenue $400; Credit Service Revenue $400',
      'Debit Cash $400; Credit Service Revenue $400',
      'Debit Deferred Revenue $1,200; Credit Service Revenue $1,200'
    ], answer: 1,
    explain: '4 months earned (Sept-Dec) = $1,200 × 4/12 = $400. Reduce the liability, recognize revenue.' },
  { id: 'c4-5', chapter: 4, topic: 'Depreciation', type: 'computational',
    q: 'Equipment cost $50,000 with $5,000 residual value and 5-year life. What is the annual straight-line depreciation?',
    choices: ['$10,000', '$11,000', '$9,000', '$5,000'], answer: 2,
    explain: '(Cost − Residual) / Life = ($50,000 − $5,000) / 5 = $9,000 per year.' },
  { id: 'c4-6', chapter: 4, topic: 'Accrued Interest', type: 'computational',
    q: 'A company borrowed $24,000 at 5% annual interest on Nov 1. What is the Dec 31 accrued interest?',
    choices: ['$1,200', '$200', '$100', '$600'], answer: 1,
    explain: 'Interest = Principal × Rate × Time = $24,000 × 5% × 2/12 = $200. Always prorate annual rates!' },
  { id: 'c4-7', chapter: 4, topic: 'Closing Entries', type: 'conceptual',
    q: 'Which of the following accounts is NOT closed at year-end?',
    choices: ['Service Revenue', 'Salaries Expense', 'Dividends', 'Accounts Receivable'], answer: 3,
    explain: 'Accounts Receivable is a PERMANENT (balance sheet) account — it carries forward. Revenues, expenses, and dividends are TEMPORARY and get closed.' },
  { id: 'c4-8', chapter: 4, topic: 'Accrued Revenue', type: 'computational',
    q: 'A company performed $700 of services in December but won\'t bill the client until January. The Dec 31 entry is:',
    choices: [
      'No entry until billed',
      'Debit Cash $700; Credit Service Revenue $700',
      'Debit Accounts Receivable $700; Credit Service Revenue $700',
      'Debit Service Revenue $700; Credit Accounts Receivable $700'
    ], answer: 2,
    explain: 'Accrued revenue: revenue earned but not yet collected. Debit AR (asset increases), credit Service Revenue.' },
  { id: 'c4-9', chapter: 4, topic: 'Cash vs Accrual', type: 'conceptual',
    q: 'A company sells $5,000 of services on credit in December. Cash is collected in January. Under accrual basis, when is revenue recognized?',
    choices: ['December', 'January', 'Split between months', 'When cash is collected'], answer: 0,
    explain: 'Accrual basis: record revenue when EARNED (services provided), not when cash is received. Revenue goes on December\'s income statement.' },
  { id: 'c4-10', chapter: 4, topic: 'Book Value', type: 'computational',
    q: 'Equipment cost $40,000 with accumulated depreciation of $15,000. What is its book value?',
    choices: ['$40,000', '$15,000', '$25,000', '$55,000'], answer: 2,
    explain: 'Book Value = Cost − Accumulated Depreciation = $40,000 − $15,000 = $25,000.' },
  { id: 'c4-11', chapter: 4, topic: 'Post-Closing Trial Balance', type: 'conceptual',
    q: 'After the closing process, which account should have a ZERO balance?',
    choices: ['Cash', 'Common Stock', 'Service Revenue', 'Retained Earnings'], answer: 2,
    explain: 'Service Revenue is temporary — closed to Retained Earnings. Permanent accounts (Cash, Common Stock, RE) remain.' },
  { id: 'c4-12', chapter: 4, topic: 'Supplies Adjustment', type: 'computational',
    q: 'A company started with $500 of supplies and bought $800 more during the year. At year-end, $200 of supplies remain. What is the supplies expense?',
    choices: ['$500', '$800', '$1,100', '$1,300'], answer: 2,
    explain: 'Beginning $500 + Purchased $800 − Ending $200 = $1,100 used. Debit Supplies Expense $1,100; Credit Supplies $1,100.' },

  // ============ CHAPTER 5 — Revenue and Receivables ============
  { id: 'c5-1', chapter: 5, topic: 'Revenue Recognition', type: 'conceptual',
    q: 'When is revenue recognized under the 5-step process?',
    choices: [
      'When cash is received',
      'When the contract is signed',
      'When the performance obligation is satisfied',
      'At the end of the fiscal year'
    ], answer: 2,
    explain: 'Revenue is recognized when (or as) the performance obligation is satisfied — when control of the good/service transfers to the customer.' },
  { id: 'c5-2', chapter: 5, topic: 'Deferred Revenue', type: 'computational',
    q: 'On Oct 1, Dropbox sells a 1-year subscription for $120 cash. What is the adjusting entry on Dec 31?',
    choices: [
      'Debit Cash $30; Credit Service Revenue $30',
      'Debit Deferred Revenue $30; Credit Service Revenue $30',
      'Debit Service Revenue $30; Credit Deferred Revenue $30',
      'Debit Deferred Revenue $120; Credit Service Revenue $120'
    ], answer: 1,
    explain: '3 months earned (Oct-Dec) = $120 × 3/12 = $30. Reduce the liability (debit Deferred Rev), recognize revenue (credit).' },
  { id: 'c5-3', chapter: 5, topic: 'Multiple Performance Obligations', type: 'computational',
    q: 'Microsoft sells an Xbox bundle for $480. Standalone: console $360, 24-month subscription $240. How much is allocated to the console?',
    choices: ['$360', '$240', '$288', '$192'], answer: 2,
    explain: 'Total standalone = $600. Console allocation = $480 × ($360/$600) = $288. Recognized immediately at sale.' },
  { id: 'c5-4', chapter: 5, topic: 'Sales Discounts', type: 'computational',
    q: 'A customer purchases $1,000 of services on terms "2/10, n/30" and pays within 10 days. What is the net revenue recognized?',
    choices: ['$1,000', '$980', '$1,020', '$200'], answer: 1,
    explain: '2% discount on $1,000 = $20 reduction. Net revenue = $1,000 − $20 = $980. Sales Discounts is a contra-revenue account.' },
  { id: 'c5-5', chapter: 5, topic: 'Allowance Method', type: 'conceptual',
    q: 'The Allowance for Uncollectible Accounts is classified as:',
    choices: ['A liability', 'A contra-asset', 'An expense', 'A revenue'], answer: 1,
    explain: 'Allowance for Uncollectible Accounts is a CONTRA-ASSET — has a credit balance and reduces total Accounts Receivable.' },
  { id: 'c5-6', chapter: 5, topic: 'Write-Off', type: 'conceptual',
    q: 'A company writes off a specific customer\'s $500 receivable as uncollectible. What is the impact on Net Income?',
    choices: ['Decreases by $500', 'Increases by $500', 'No effect on Net Income', 'Decreases by amount of allowance'], answer: 2,
    explain: 'Write-offs do NOT affect Net Income. The expense was already recorded when Bad Debt Expense was estimated. Write-off just removes the specific receivable.' },
  { id: 'c5-7', chapter: 5, topic: 'Write-Off Entry', type: 'computational',
    q: 'A company writes off a $2,000 uncollectible account. What is the journal entry?',
    choices: [
      'Debit Bad Debt Expense $2,000; Credit Accounts Receivable $2,000',
      'Debit Allowance for Uncollectible Accts $2,000; Credit Accounts Receivable $2,000',
      'Debit Accounts Receivable $2,000; Credit Bad Debt Expense $2,000',
      'Debit Cash $2,000; Credit Allowance $2,000'
    ], answer: 1,
    explain: 'Write-off: Debit Allowance for Uncollectible Accts (reducing the allowance); Credit Accounts Receivable (removing the specific account). NO Bad Debt Expense.' },
  { id: 'c5-8', chapter: 5, topic: 'Aging Method', type: 'computational',
    q: 'Allowance has unadjusted credit balance of $300. Aging analysis shows required ending balance of $2,000. What is Bad Debt Expense?',
    choices: ['$300', '$2,000', '$1,700', '$2,300'], answer: 2,
    explain: 'Bad Debt Expense = Required Ending Balance − Unadjusted Balance = $2,000 − $300 = $1,700. The expense is the "plug" to get to the right ending balance.' },
  { id: 'c5-9', chapter: 5, topic: 'Receivables Turnover', type: 'computational',
    q: 'Net Credit Sales = $500,000. Average Accounts Receivable = $50,000. What is the Average Collection Period?',
    choices: ['10 days', '36.5 days', '50 days', '100 days'], answer: 1,
    explain: 'Receivables Turnover = $500,000 / $50,000 = 10. Average Collection Period = 365 / 10 = 36.5 days.' },
  { id: 'c5-10', chapter: 5, topic: 'Bad Debt Estimate', type: 'computational',
    q: 'A company estimates $4,500 of uncollectible accounts at year-end. The unadjusted Allowance has a $500 credit balance. What is the adjusting entry?',
    choices: [
      'Debit Bad Debt Expense $4,500; Credit Allowance $4,500',
      'Debit Bad Debt Expense $4,000; Credit Allowance $4,000',
      'Debit Bad Debt Expense $5,000; Credit Allowance $5,000',
      'Debit Allowance $4,000; Credit Bad Debt Expense $4,000'
    ], answer: 1,
    explain: 'Required ending balance is $4,500. Already have $500 credit. Need to add $4,000 more. Bad Debt Expense = $4,500 − $500 = $4,000.' },

  // ============ CHAPTER 6 — Inventory and COGS ============
  { id: 'c6-1', chapter: 6, topic: 'COGS Formula', type: 'computational',
    q: 'Beginning Inventory = $20,000. Purchases = $80,000. Ending Inventory = $25,000. What is COGS?',
    choices: ['$75,000', '$85,000', '$100,000', '$125,000'], answer: 0,
    explain: 'COGS = Beg Inv + Purchases − End Inv = $20,000 + $80,000 − $25,000 = $75,000.' },
  { id: 'c6-2', chapter: 6, topic: 'FIFO', type: 'computational',
    q: 'Beg Inv: 10 units @ $8. Purchase: 20 units @ $10. Sold 25 units. Using FIFO, what is COGS?',
    choices: ['$200', '$230', '$250', '$80'], answer: 1,
    explain: 'FIFO: oldest costs first. 10 × $8 = $80 + 15 × $10 = $150. Total COGS = $230.' },
  { id: 'c6-3', chapter: 6, topic: 'LIFO', type: 'computational',
    q: 'Beg Inv: 10 units @ $8. Purchase: 20 units @ $10. Sold 25 units. Using LIFO, what is COGS?',
    choices: ['$200', '$230', '$240', '$250'], answer: 2,
    explain: 'LIFO: newest costs first. 20 × $10 = $200 + 5 × $8 = $40. Total COGS = $240.' },
  { id: 'c6-4', chapter: 6, topic: 'Weighted Average', type: 'computational',
    q: 'Total Cost of Goods Available for Sale = $460. Total Units Available = 45. What is the weighted-average cost per unit?',
    choices: ['$8.00', '$10.00', '$10.22', '$12.00'], answer: 2,
    explain: 'Weighted-Avg Cost = $460 / 45 units = $10.22 per unit (rounded).' },
  { id: 'c6-5', chapter: 6, topic: 'FIFO vs LIFO', type: 'conceptual',
    q: 'During periods of RISING prices, which method results in HIGHER net income?',
    choices: ['FIFO', 'LIFO', 'Weighted Average', 'They produce equal income'], answer: 0,
    explain: 'FIFO uses oldest (lower) costs as COGS → lower COGS → higher gross profit → higher net income. LIFO is opposite (good for taxes).' },
  { id: 'c6-6', chapter: 6, topic: 'LIFO Tax Advantage', type: 'conceptual',
    q: 'Why might a company prefer LIFO during periods of rising prices?',
    choices: [
      'It results in higher reported earnings',
      'It results in lower income tax expense',
      'It is required by GAAP for all inventory',
      'It increases the value of ending inventory'
    ], answer: 1,
    explain: 'LIFO results in higher COGS → lower taxable income → lower taxes. The LIFO Conformity Rule requires the same method for tax and financial reporting.' },
  { id: 'c6-7', chapter: 6, topic: 'Inventory Turnover', type: 'computational',
    q: 'COGS = $300,000. Beginning Inventory = $40,000. Ending Inventory = $60,000. What is Inventory Turnover?',
    choices: ['5.0', '6.0', '7.5', '15.0'], answer: 1,
    explain: 'Average Inventory = ($40,000 + $60,000) / 2 = $50,000. Inventory Turnover = $300,000 / $50,000 = 6.0 times.' },
  { id: 'c6-8', chapter: 6, topic: 'LCNRV', type: 'computational',
    q: 'Inventory: 50 units. Cost = $400/unit. Net Realizable Value = $350/unit. What is the write-down amount?',
    choices: ['$0', '$2,500', '$17,500', '$20,000'], answer: 1,
    explain: 'NRV ($350) is below Cost ($400). Write-down = 50 × ($400 − $350) = $2,500. Inventory must be reported at LCNRV.' },
  { id: 'c6-9', chapter: 6, topic: 'Gross Profit', type: 'computational',
    q: 'Sales = $150,000. COGS = $90,000. Operating Expenses = $30,000. What is Gross Profit?',
    choices: ['$30,000', '$60,000', '$90,000', '$120,000'], answer: 1,
    explain: 'Gross Profit = Net Sales − COGS = $150,000 − $90,000 = $60,000. Operating expenses come AFTER gross profit.' },
  { id: 'c6-10', chapter: 6, topic: 'Inventory Sale', type: 'computational',
    q: 'A company sells inventory costing $400 for $700 cash. The journal entries include:',
    choices: [
      'Debit Cash $700; Credit Sales Revenue $700 only',
      'Debit Cash $700; Credit Inventory $700',
      'Debit Cash $700, Credit Sales Revenue $700; Debit COGS $400, Credit Inventory $400',
      'Debit Cash $300; Credit Sales Revenue $300'
    ], answer: 2,
    explain: 'Two-part entry under perpetual: (1) record revenue at sale price, (2) record COGS at cost and reduce inventory.' },

  // ============ CHAPTER 7 — Long-Term Assets ============
  { id: 'c7-1', chapter: 7, topic: 'Capitalize vs Expense', type: 'conceptual',
    q: 'Which of the following should be CAPITALIZED rather than expensed?',
    choices: [
      'Routine maintenance on a delivery truck',
      'Sales tax paid on equipment purchase',
      'Annual insurance premium on a building',
      'Repainting a warehouse'
    ], answer: 1,
    explain: 'Sales tax on equipment purchase is part of getting the asset ready for use → capitalize. Routine maintenance, recurring insurance, and repainting are expensed.' },
  { id: 'c7-2', chapter: 7, topic: 'Land Cost', type: 'computational',
    q: 'A company buys land for $200,000. They pay $5,000 in closing costs and $10,000 to clear the land. What is the recorded cost of the land?',
    choices: ['$200,000', '$205,000', '$210,000', '$215,000'], answer: 3,
    explain: 'Land cost = Purchase + Closing Costs + Preparation Costs = $200,000 + $5,000 + $10,000 = $215,000. All necessary costs to get land ready capitalize.' },
  { id: 'c7-3', chapter: 7, topic: 'Land Depreciation', type: 'conceptual',
    q: 'Which of the following statements about Land is true?',
    choices: [
      'Land is depreciated over 40 years',
      'Land is depreciated using the straight-line method',
      'Land is never depreciated',
      'Land is amortized as an intangible'
    ], answer: 2,
    explain: 'Land is NEVER depreciated. Land Improvements (fences, parking lots, lighting) ARE depreciated over their useful lives.' },
  { id: 'c7-4', chapter: 7, topic: 'Basket Purchase', type: 'computational',
    q: 'A company buys land and building together for $900,000. Appraised values: Land $200,000, Building $800,000. How much is allocated to Land?',
    choices: ['$200,000', '$180,000', '$225,000', '$720,000'], answer: 1,
    explain: 'Land allocation % = $200,000 / $1,000,000 = 20%. Allocated Cost = $900,000 × 20% = $180,000.' },
  { id: 'c7-5', chapter: 7, topic: 'Straight-Line Depreciation', type: 'computational',
    q: 'A truck costs $40,000, has a $5,000 residual value, and 5-year life. What is annual straight-line depreciation?',
    choices: ['$8,000', '$7,000', '$9,000', '$5,000'], answer: 1,
    explain: '(Cost − Residual) / Life = ($40,000 − $5,000) / 5 = $7,000 per year.' },
  { id: 'c7-6', chapter: 7, topic: 'Double-Declining Balance', type: 'computational',
    q: 'Truck costs $40,000, $5,000 residual, 5-year life. What is Year 1 depreciation under double-declining balance?',
    choices: ['$8,000', '$14,000', '$16,000', '$7,000'], answer: 2,
    explain: 'Double-declining rate = 2/5 = 40%. Year 1 = $40,000 × 40% = $16,000. (Residual is ignored in calculation but caps total depreciation.)' },
  { id: 'c7-7', chapter: 7, topic: 'Activity-Based', type: 'computational',
    q: 'Truck cost $40,000, $5,000 residual, est. life 100,000 miles. Driven 30,000 miles in Year 1. What is Year 1 depreciation?',
    choices: ['$10,500', '$12,000', '$7,000', '$15,000'], answer: 0,
    explain: 'Rate = ($40,000 − $5,000) / 100,000 = $0.35 per mile. Year 1 = $0.35 × 30,000 = $10,500.' },
  { id: 'c7-8', chapter: 7, topic: 'Intangibles', type: 'conceptual',
    q: 'Which intangible asset is NOT amortized?',
    choices: ['Patent', 'Copyright', 'Goodwill', 'Franchise (10-year)'], answer: 2,
    explain: 'Goodwill has an INDEFINITE life — never amortized. Instead, tested annually for impairment. Patents, copyrights, and finite-life franchises ARE amortized.' },
  { id: 'c7-9', chapter: 7, topic: 'Disposal', type: 'computational',
    q: 'Equipment cost $95,000 with $30,000 accumulated depreciation. Sold for $55,000 cash. What is the gain or loss?',
    choices: ['$10,000 gain', '$10,000 loss', '$25,000 loss', '$40,000 gain'], answer: 1,
    explain: 'Book Value = $95,000 − $30,000 = $65,000. Loss = $55,000 − $65,000 = ($10,000) loss. Cash less than book value → loss.' },
  { id: 'c7-10', chapter: 7, topic: 'Goodwill', type: 'conceptual',
    q: 'When is Goodwill recorded on the balance sheet?',
    choices: [
      'When a company has a strong reputation',
      'When a company internally develops valuable brands',
      'Only when one company acquires another',
      'When marketing costs exceed $1 million'
    ], answer: 2,
    explain: 'Goodwill is ONLY recorded when one company acquires another. It equals Purchase Price − Fair Value of identifiable net assets. Internally developed reputation/brands are NOT recorded.' },

  // ============ CHAPTER 8 — Cash and Investments ============
  { id: 'c8-1', chapter: 8, topic: 'Cash Equivalents', type: 'conceptual',
    q: 'To qualify as a cash equivalent, an investment must have a maturity of:',
    choices: [
      '1 year or less',
      '6 months or less',
      '3 months or less from date of purchase',
      'Any short-term Treasury security'
    ], answer: 2,
    explain: 'Cash equivalents must have a maturity of 3 MONTHS OR LESS from the date of PURCHASE. A 6-month CD purchased today is NOT a cash equivalent.' },
  { id: 'c8-2', chapter: 8, topic: 'Investment Methods', type: 'conceptual',
    q: 'A company owns 30% of another company\'s voting stock. Which accounting method is required?',
    choices: ['Fair Value Method', 'Equity Method', 'Consolidation', 'Cost Method'], answer: 1,
    explain: '20-50% ownership = Significant Influence = Equity Method. <20% is Fair Value, >50% is Consolidation.' },
  { id: 'c8-3', chapter: 8, topic: 'Fair Value Method', type: 'computational',
    q: 'A company buys 500 shares at $20 each. At year-end, the price is $23. What is the unrealized gain?',
    choices: ['$0', '$1,500', '$3,000', '$11,500'], answer: 1,
    explain: 'Unrealized Gain = (New Price − Old Price) × Shares = ($23 − $20) × 500 = $1,500. Reported on Income Statement under Fair Value Method.' },
  { id: 'c8-4', chapter: 8, topic: 'Dividend Revenue', type: 'computational',
    q: 'A company holds 500 shares with a 10% interest. They receive $2 per share in dividends. What is the journal entry?',
    choices: [
      'Debit Cash $1,000; Credit Investment $1,000',
      'Debit Cash $1,000; Credit Dividend Revenue $1,000',
      'Debit Investment $1,000; Credit Cash $1,000',
      'Debit Cash $1,000; Credit Unrealized Gain $1,000'
    ], answer: 1,
    explain: 'Under Fair Value Method (<20% ownership), dividends received = Dividend Revenue (Income Statement). 500 × $2 = $1,000.' },
  { id: 'c8-5', chapter: 8, topic: 'Held-to-Maturity', type: 'conceptual',
    q: 'For Held-to-Maturity (HTM) debt securities, how are unrealized gains/losses reported?',
    choices: [
      'On the Income Statement',
      'In Other Comprehensive Income',
      'They are NOT reported (no fair value adjustment)',
      'In Retained Earnings'
    ], answer: 2,
    explain: 'HTM securities are reported at AMORTIZED COST — no fair value adjustment is made, so no unrealized gains/losses are reported.' },
  { id: 'c8-6', chapter: 8, topic: 'Trading Securities', type: 'conceptual',
    q: 'For Trading securities, unrealized gains/losses are reported in:',
    choices: ['Net Income', 'Other Comprehensive Income (OCI)', 'Retained Earnings directly', 'Not reported'], answer: 0,
    explain: 'Trading securities → unrealized gains/losses go to NET INCOME (Income Statement). Available-for-Sale → goes to OCI (equity).' },
  { id: 'c8-7', chapter: 8, topic: 'Available-for-Sale', type: 'conceptual',
    q: 'For Available-for-Sale (AFS) debt securities, unrealized gains/losses are reported in:',
    choices: [
      'Net Income on the Income Statement',
      'Other Comprehensive Income (OCI)',
      'Cost of Goods Sold',
      'They are not adjusted to fair value'
    ], answer: 1,
    explain: 'AFS unrealized gains/losses go to OTHER COMPREHENSIVE INCOME (OCI), accumulating in AOCI within stockholders\' equity. NOT in Net Income.' },
  { id: 'c8-8', chapter: 8, topic: 'Consolidation', type: 'conceptual',
    q: 'When does a company use consolidation accounting?',
    choices: [
      'Ownership of 10% or more',
      'Ownership between 20% and 50%',
      'Ownership greater than 50% (controlling interest)',
      'Only when the subsidiary is profitable'
    ], answer: 2,
    explain: 'Consolidation is required when one company has CONTROL over another — typically >50% ownership. The subsidiary is treated as part of the parent.' },
  { id: 'c8-9', chapter: 8, topic: 'Cash Equivalent Test', type: 'conceptual',
    q: 'Which of the following IS a cash equivalent?',
    choices: [
      'A 6-month CD purchased today',
      'A 1-year Treasury bill purchased today',
      'A 1-year Treasury bill that has 2 months until maturity (purchased today)',
      'Common stock of a publicly traded company'
    ], answer: 2,
    explain: 'The "3 months or less from date of PURCHASE" rule. The 1-year T-bill with 2 months left is a cash equivalent because TODAY when you bought it, it had ≤3 months until maturity.' },
  { id: 'c8-10', chapter: 8, topic: 'Why Companies Invest', type: 'conceptual',
    q: 'Why might a retailer hold significant short-term investments during the summer?',
    choices: [
      'To avoid paying dividends',
      'To manage seasonal cash flow (use during slow periods)',
      'To prevent acquisitions',
      'Because GAAP requires it'
    ], answer: 1,
    explain: 'Companies with seasonal cycles (e.g., retailers in summer before holidays) invest excess cash to earn returns and have funds available during slower or busier periods.' },
];

const MIDTERMS = {
  'midterm1': { label: 'Midterm 1', chapters: [1, 2, 3, 4] },
  'midterm2': { label: 'Midterm 2', chapters: [5, 6, 7, 8] },
};

const STORAGE_KEY = 'acc232-study-progress';

function StudyApp() {
  const [progress, setProgress] = useState({});
  const [mode, setMode] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value) setProgress(JSON.parse(value));
    } catch (e) {}
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress)); }
    catch (e) { console.error('Save failed', e); }
  };

  const getMastery = (qId) => {
    const p = progress[qId];
    if (!p || p.attempts === 0) return null;
    return Math.round((p.correct / p.attempts) * 100);
  };

  const allChapters = [...new Set(QUESTIONS.map(q => q.chapter))].sort((a, b) => a - b);

  const chapterStats = useMemo(() => {
    const stats = {};
    allChapters.forEach(ch => stats[ch] = []);
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

  const startQuiz = (mode, scope = null) => {
    let pool = [...QUESTIONS];
    if (scope) {
      if (scope.type === 'chapter') pool = pool.filter(q => q.chapter === scope.value);
      else if (scope.type === 'midterm') {
        const chs = MIDTERMS[scope.value].chapters;
        pool = pool.filter(q => chs.includes(q.chapter));
      }
    }
    if (pool.length === 0) return;

    if (mode === 'weak') {
      pool.sort((a, b) => {
        const mA = getMastery(a.id);
        const mB = getMastery(b.id);
        if (mA === null && mB === null) return 0;
        if (mA === null) return -1;
        if (mB === null) return 1;
        return mA - mB;
      });
    } else if (mode === 'smart') {
      pool.sort((a, b) => {
        const wA = (a.chapter === 3 || a.chapter === 4) ? 2 : 1;
        const wB = (b.chapter === 3 || b.chapter === 4) ? 2 : 1;
        const mA = getMastery(a.id) ?? 0;
        const mB = getMastery(b.id) ?? 0;
        return (mA / wA) - (mB / wB);
      });
    } else {
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
    if (remaining.length === 0) setMode('results');
    else {
      setCurrentQuestion(remaining[0]);
      setSelectedChoice(null);
      setShowAnswer(false);
    }
  };

  const resetProgress = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) saveProgress({});
  };

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

    .container { max-width: 760px; margin: 0 auto; }

    .header {
      border-bottom: 1px solid var(--line);
      padding-bottom: 20px;
      margin-bottom: 28px;
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
      padding: 22px;
      margin-bottom: 22px;
    }

    .label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
      display: block;
    }

    .midterm-section {
      background: var(--paper);
      border: 1px solid var(--line);
      padding: 20px;
      margin-bottom: 18px;
    }

    .midterm-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--line);
    }

    .midterm-title {
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .midterm-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: var(--muted);
      letter-spacing: 0.06em;
    }

    .chapter-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 14px;
    }

    .chapter-card {
      padding: 10px;
      border: 1px solid var(--line);
      background: var(--bg);
      text-align: left;
      transition: all 0.12s ease;
    }

    .chapter-num {
      font-size: 0.65rem;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.1em;
    }

    .priority-badge {
      display: inline-block;
      font-size: 0.55rem;
      background: var(--accent);
      color: white;
      padding: 1px 4px;
      margin-left: 4px;
      letter-spacing: 0.05em;
      vertical-align: middle;
    }

    .chapter-mastery {
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.1;
      margin: 4px 0;
    }

    .chapter-meta {
      font-size: 0.68rem;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .chapter-test-btn {
      width: 100%;
      margin-top: 6px;
      padding: 6px 8px;
      background: var(--ink);
      color: var(--bg);
      border: none;
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: all 0.12s ease;
    }
    .chapter-test-btn:hover { background: var(--accent); }

    .btn-row { display: flex; gap: 8px; flex-wrap: wrap; }

    .btn {
      padding: 12px 18px;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.15s ease;
      flex: 1;
      min-width: 100px;
    }

    .btn-primary { background: var(--accent); color: white; }
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

    .btn-sm { padding: 8px 12px; font-size: 0.8rem; }

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
    .choice.correct { border-color: var(--green); background: #dcfce7; }
    .choice.incorrect { border-color: var(--red); background: #fee2e2; }

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

    .results { text-align: center; padding: 48px 24px; }
    .results-score {
      font-size: 5rem;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.04em;
      margin: 16px 0;
    }

    @media (max-width: 600px) {
      .chapter-grid { grid-template-columns: repeat(2, 1fr); }
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
            <p className="subtitle">Active recall · Ch 1–8 · {QUESTIONS.length} questions in the bank</p>
          </header>

          {mode === 'home' && (
            <>
              <div className="stats-overview">
                <span className="label">Overall Mastery</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, color: masteryColor(overallMastery) }}>
                    {overallMastery !== null ? `${overallMastery}%` : '—'}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: 'var(--muted)' }}>
                    {Object.values(progress).filter(p => p.attempts > 0).length} / {QUESTIONS.length} attempted
                  </div>
                </div>

                <div className="btn-row" style={{ marginTop: 16 }}>
                  <button className="btn btn-primary" onClick={() => startQuiz('smart')}>Smart Drill (All)</button>
                  <button className="btn btn-secondary" onClick={() => startQuiz('weak')}>Weak Areas (All)</button>
                  <button className="btn btn-secondary" onClick={() => startQuiz('random')}>Random (All)</button>
                </div>
              </div>

              {Object.entries(MIDTERMS).map(([mtKey, mt]) => {
                const mtQuestions = QUESTIONS.filter(q => mt.chapters.includes(q.chapter));
                const mtAttempted = mtQuestions.filter(q => getMastery(q.id) !== null);
                const mtMasteryAvg = mtAttempted.length
                  ? Math.round(mtAttempted.map(q => getMastery(q.id)).reduce((a, b) => a + b, 0) / mtAttempted.length)
                  : null;

                return (
                  <div key={mtKey} className="midterm-section">
                    <div className="midterm-header">
                      <div>
                        <div className="midterm-title">{mt.label}</div>
                        <div className="midterm-meta" style={{ marginTop: 2 }}>
                          Ch {mt.chapters.join(', ')} · {mtQuestions.length} questions
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: masteryColor(mtMasteryAvg), lineHeight: 1 }}>
                          {mtMasteryAvg !== null ? `${mtMasteryAvg}%` : '—'}
                        </div>
                        <div className="midterm-meta">{mtAttempted.length}/{mtQuestions.length} done</div>
                      </div>
                    </div>

                    <div className="chapter-grid">
                      {mt.chapters.map(ch => {
                        const s = chapterStats[ch];
                        const isPriority = ch === 3 || ch === 4;
                        return (
                          <div key={ch} className="chapter-card">
                            <div className="chapter-num">
                              Ch {ch}{isPriority && <span className="priority-badge">PRI</span>}
                            </div>
                            <div className="chapter-mastery" style={{ color: masteryColor(s.avg) }}>
                              {s.avg !== null ? `${s.avg}%` : '—'}
                            </div>
                            <div className="chapter-meta">{s.attempted}/{s.total}</div>
                            <button
                              className="chapter-test-btn"
                              onClick={() => startQuiz('smart', { type: 'chapter', value: ch })}
                            >
                              Test Ch {ch}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="btn-row">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => startQuiz('smart', { type: 'midterm', value: mtKey })}
                      >
                        Smart Drill {mt.label}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => startQuiz('weak', { type: 'midterm', value: mtKey })}
                      >
                        Weak Areas {mt.label}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => startQuiz('random', { type: 'midterm', value: mtKey })}
                      >
                        Random {mt.label}
                      </button>
                    </div>
                  </div>
                );
              })}

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button className="btn btn-ghost" onClick={resetProgress} style={{ width: 'auto', flex: 'none' }}>
                  Reset Progress
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
                Click "Test Ch X" to drill a single chapter. Smart Drill prioritizes weak topics.
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
