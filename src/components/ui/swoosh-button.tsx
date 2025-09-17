'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SwooshButton({ href, text = "Get Started", className, type = "button" }: { href: string; text?: string; className?: string; type?: "button" | "submit" }) {
  return (
    <Button type={type} asChild className={cn("group relative overflow-hidden hover:text-tertiary", className)} size="xl" >
      <Link href={href}>
        <i className="absolute left-0 top-0 bottom-0  grid w-0 place-items-center transition-all duration-700 ease-in-out bg-secondary group-hover:w-full group-active:scale-95 text-black-500">
          {/* <ChevronRight size={16} strokeWidth={2} aria-hidden="true" /> */}
        </i>
        <span className="transition-opacity duration-500 z-10">
          {text}
        </span>
      </Link>
    </Button>
  );
}