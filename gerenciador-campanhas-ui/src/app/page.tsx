import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoptions';

export default async function App() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/sign-in');
  } else {
    redirect('/admin/campanhas');
  }
}