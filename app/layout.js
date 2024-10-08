'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Toaster />
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
