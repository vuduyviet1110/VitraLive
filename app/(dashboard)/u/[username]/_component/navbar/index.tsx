import ActionComponent from "./action";
import Logo from "./logo";

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full h-20 -[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <ActionComponent />
    </nav>
  );
}

export default Navbar;
