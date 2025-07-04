import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center w-[80vw] max-w-md mx-auto bg-gray-950 border-[1px] border-white rounded-2xl px-4 py-2 ">
      <Search className="w-8 h-8 mr-5 text-white" />
      <input
        type="text"
        placeholder="Search anime..."
        className=" outline-none w-[40vw] text-white placeholder-text-muted"
      />
    </div>
  );
}
