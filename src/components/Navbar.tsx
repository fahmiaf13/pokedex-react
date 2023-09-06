import { Link } from "react-router-dom";
import Logo from "@/assets/img/logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-[99]">
      <div className="container mx-auto py-5 flex items-center">
        <Link to="/" className="w-4/12 font-extrabold text-2xl justify-start flex">
          <img src="/favicon.svg" className="h-14" />
        </Link>
        <Link to="/" className="w-4/12 font-extrabold text-2xl justify-center flex">
          <img src={Logo} className="h-20" />
        </Link>
        <Link to="/favorites" className="w-4/12 flex justify-end scale-100 hover:scale-105 duration-500">
          <div className="flex gap-2 bg-gray-200 p-3 rounded-full items-center">
            <div className="font-extrabold text-sm">
              <span className="font-light">My </span>Favorite
            </div>
            <Icon icon="bi:bookmark-heart-fill" width={28} />
          </div>
        </Link>
      </div>
    </nav>
  );
}
