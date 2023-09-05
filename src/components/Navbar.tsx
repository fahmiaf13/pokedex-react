import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-[99]">
      <div className="container mx-auto py-5">
        <Link to="/" className="font-extrabold text-2xl">
          Pokedex
        </Link>
      </div>
    </nav>
  );
}
