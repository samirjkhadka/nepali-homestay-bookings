// app/CurrencyProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SupportedCurrency } from '@/types/currency';
import { CURRENCY_SYMBOLS, SUPPORTED_CURRENCIES } from '@/types/currency';

type CurrencyContextType = {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  symbol: string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('NPR');

  // Load from cookie on mount
  useEffect(() => {
    const saved = document.cookie
      .split('; ')
      .find(row => row.startsWith('currency='))
      ?.split('=')[1] as SupportedCurrency;

    if (saved && SUPPORTED_CURRENCIES.includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    // Save to cookie (7 days)
    document.cookie = `currency=${c}; path=/; max-age=${7 * 24 * 60 * 60}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol: CURRENCY_SYMBOLS[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
}