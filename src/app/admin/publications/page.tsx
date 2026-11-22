import { redirect } from 'next/navigation';

export default function AdminPublicationsRedirect() {
  redirect('/admin/resources');
}
