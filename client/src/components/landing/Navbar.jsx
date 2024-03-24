import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="w-full bg-white z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:py-[18px] sm:px-6 lg:px-8 h-[87px]">
        <div className="inline-flex items-center space-x-2 cursor-pointer">
          <span className="text-xl lg:text-2xl font-bold">Job Gateway</span>
        </div>

        <div className="hidden lg:block">
          <Link
            to="/auth/login"
            type="button"
            className="rounded-md bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </Link>
        </div>
        <div className="lg:hidden">
          <Link
            to="/auth/login"
            className="mt-8 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;