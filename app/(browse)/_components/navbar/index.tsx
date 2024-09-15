import ActionComponent from "./action";
import Logo from "./logo";
import SearchComponent from "./search";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 -[49] bg-[#252731] px-2 lg:px-4 z-[99999] flex justify-between items-center shadow-sm">
      <Logo />
      <SearchComponent />
      <ActionComponent />
    </nav>
  );
}

export default Navbar;
