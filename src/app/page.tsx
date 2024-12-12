import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import Spline from "@splinetool/react-spline";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const metadata = {
  title: "SurakshaSanchay",
  description: "A centralized system for asset tracking",
};

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-black-2">
      {/* Spline background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/jG0MzB7-a2XMrdeV/scene.splinecode" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start space-y-6 pt-[30px] text-center">
        <h1
          className={cn(
            "md:text-6xl text-2xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        >
          SurakshaSanchay
        </h1>
        <p className="md:text-lg text-l text-white drop-shadow-md">
          A Centrazlized Hardware Inventory Management System
        </p>
        <div className="bolder text-white">
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>

      {/* Optional script for other functionalities */}
      <script
        src="//code.tidio.co/7ghvmky1mcgimuuzffr8cktvubmxwkbp.js"
        async
      ></script>
    </main>
  );
}
