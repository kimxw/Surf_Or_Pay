"use client";

import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "Surfer Mode",
      value: "surfer_mode",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl p-8 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1f2537] to-[#293c67] opacity-97">
          <p>Surfer Mode</p>
          <Image
            src="/surferMode.png"
            alt="surfer mode"
            width="1000"
            height="1000"
            className="object-cover object-left-top absolute w-[90%] rounded-xl mx-auto mt-8" />
        </div>
      ),
    },
    {
      title: "Shark Mode",
      value: "shark_mode",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1f2537] to-[#293c67] opacity-97">
          <p>Shark Mode</p>
          <Image
            src="/sharkMode.png"
            alt="shark mode"
            width="1000"
            height="1000"
            className="object-cover object-left-top absolute w-[90%] rounded-xl mx-auto mt-8" />
        </div>
      ),
    },
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1f2537] to-[#293c67] opacity-97">
          <p>Dashboard</p>
          <Image
            src="/dashboard.png"
            alt="shark mode"
            width="1000"
            height="1000"
            className="object-cover object-left-top absolute w-[90%] rounded-xl mx-auto mt-8" />
        </div>
      ),
    },
    // {
    //   title: "Content",
    //   value: "content",
    //   content: (
    //     <div
    //       className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
    //       <p>Content tab</p>
    //       <DummyContent />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Random",
    //   value: "random",
    //   content: (
    //     <div
    //       className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
    //       <p>Random tab</p>
    //       <DummyContent />
    //     </div>
    //   ),
    // },
  ];

  return (
    (<div
        className="h-[35rem] md:h-[55rem] relative flex flex-col max-w-7xl mx-auto w-full items-start justify-center">      
      <Tabs tabs={tabs} />
    </div>)
  );
}
