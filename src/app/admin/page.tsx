import { redirect } from 'next/navigation';

export default function PublicAdminRedirect() {
  // Redirect any public user attempting /admin to home page
  redirect('/');
}
