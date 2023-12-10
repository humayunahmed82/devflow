import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        LeftSidebar
        <section className="flex flex-col min-h-screen px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RightSidebar
      </div>
      Toaster
    </main>
  );
};

export default layout;
