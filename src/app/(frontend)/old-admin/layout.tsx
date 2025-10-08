import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  if (!Array.isArray(user.user_metadata?.roles) || !user.user_metadata.roles.includes("website_admin")) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
