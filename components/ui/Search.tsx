import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center w-1/2 max-w-md mx-auto bg-card border-[1px] border-white rounded-2xl px-4 py-2 ">
      <Search className="w-5 h-5 mr-2 text-white" />
      <input
        type="text"
        placeholder="Search anime..."
        className=" outline-none w-1/2 text-white placeholder-text-muted"
      />
    </div>
  );
}
