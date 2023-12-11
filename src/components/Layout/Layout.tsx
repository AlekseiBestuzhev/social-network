import { FC, PropsWithChildren } from 'react';

import { Header } from '@/components/Layout/Header/Header';
import { Sidebar } from '@/components/Layout/Sidebar/Sidebar';
import { Toast } from '@/components/Toast/Toast.tsx';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Sidebar />
      <main className="content">{children}</main>
      <Toast />
    </div>
  );
};
