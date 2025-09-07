'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return (
        <button className="p-2 rounded-full shadow-md bg-gray-100 dark:bg-gray-900">
            <div className='h-5 w-5'/>
        </button>
    )
  }

  return (
    <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className='p-2 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors'
        aria-label='Toggle theme'
    >
        {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-500"/>
        ) : ( 
            <Moon className="h-5 w-5 text-gray-600"/>
        )}
    </button>
  );
}
