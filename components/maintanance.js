import Image from "next/image";
import Maintain from "@/public/2.png";

export default function Maintanance() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-semibold text-center sm:text-left">
          🚧 Website Under Maintenance 🚧
        </h1>
        <p className="text-center sm:text-left text-lg mb-4">
          We are currently working on some improvements. Please check back
          later!
        </p>

        <div className="flex justify-center w-full mb-8">
          <div className="w-72 h-72 bg-transparent flex items-center justify-center">
            <Image className="text-gray-600" src={Maintain} alt="maintain"></Image>
          </div>
        </div>

        <div className="flex justify-center w-full mb-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="mailto:naveenrajanm9@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Contact Support</span>
          </a>
        </div>
      </main>
    </div>
  );
}
