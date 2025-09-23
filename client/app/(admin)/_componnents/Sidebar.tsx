import { cn } from "@/lib/utils"; // Utility for merging classNames
import {
  ArrowLeftRight,
  Boxes,
  House,
  PackagePlus,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: <House /> },
  { href: "/admin/products", label: "Products", icon: <Boxes /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingBag /> },
  { href: "/admin/add-product", label: "Add Product", icon: <PackagePlus /> },
  {
    href: "/admin/transactions",
    label: "Transactions",
    icon: <ArrowLeftRight />,
  },
  { href: "/admin/customers", label: "Customers", icon: <Users /> },
  { href: "/admin/admin-settings", label: "Settings", icon: <Settings /> },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:static lg:translate-x-0"
      )}
    >
      <div className="p-4">
        <h2 className="text-xl ">Admin Dashboard</h2>
      </div>
      <nav className="mt-4 space-y-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <span className="mr-3">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
