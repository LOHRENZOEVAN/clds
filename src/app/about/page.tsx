import { redirect } from 'next/navigation';

export default function AboutPageRedirect() {
  redirect('/about/what-we-do');
}
