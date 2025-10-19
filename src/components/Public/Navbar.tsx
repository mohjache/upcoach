import { TrendingUp } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="border-accent border-b px-8 py-2 pr-8">
      <div className="flex flex-row">
        <Link href="/">
          <div className="flex flex-row">
            <div className="py-2 pr-2">
              <TrendingUp className="text-primary h-6 w-6" />
            </div>
            <span className="text-primary text-2xl font-bold">UpCoach</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
