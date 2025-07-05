// components/ui/loader.tsx
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className=" w-full flex justify-center items-center py-10">
      <Loader2 className="animate-spin h-8 w-8  text-white" />
    </div>
  );
}
