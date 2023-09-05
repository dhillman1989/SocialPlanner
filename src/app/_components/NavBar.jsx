import Link from "next/link";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <div className="NavBar">
      <span>Logo</span>
      <nav>
        <Link
          className="nav-link text-orange-800 hover:text-orange-500"
          href="/"
        >
          Home
        </Link>
        <Link
          className="nav-link text-orange-800 hover:text-orange-500"
          href="/auth"
        >
          Login
        </Link>
        <Link
          className="nav-link text-orange-800 hover:text-orange-500"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
