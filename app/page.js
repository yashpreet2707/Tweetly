import Feed from "@/components/feed";
import Input from "@/components/Input";
import ThemeToggler from "@/components/ThemeToggler";

export default function Home() {
  return (
    <div className="mx-auto max-w-xl border-r border-l min-h-screen lg:border-none bg-white text-black dark:bg-black dark:text-white">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <ThemeToggler />
      </div>
      <Input />
      <Feed />
    </div>
  );
}
