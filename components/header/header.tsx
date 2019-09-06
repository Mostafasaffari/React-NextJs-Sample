const Header = () => {
  return (
    <header className="container px-5 py-2 text-white" id="header">
      <h1 className="sm:text-2xl md:text-3xl uppercase font-bold">Iran trip planner</h1>
      <span className="pr-2 sm:text-1xl md:text-2xl">By</span>
      <span className="sm:text-1xl md:text-2xl uppercase font-medium">
        1st<span className="text-yellow-500 sm:text-1xl md:text-2xl">q</span>uest
      </span>
    </header>
  );
};
export default Header;
