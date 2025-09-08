import { Menu, X } from 'lucide-react'; // Icons
import { Button } from '@/app/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';

export default function Navbar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <button className="lg:hidden" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="hidden  md:flex text-lg font-semibold">
        Welcome Back, Admin
      </h1>
      <div className="flex items-center  space-x-4">
        <input
          type="search"
          value=""
          placeholder="Search"
          className="w-60 h-4 bg-gray-200 p-4 rounded-full"
        />

        <Button variant="outline">Logout</Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
