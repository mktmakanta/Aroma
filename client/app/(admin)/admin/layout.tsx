import AdminNavLayout from '../_components/AdminNavLayout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminNavLayout>{children}</AdminNavLayout>;
}
