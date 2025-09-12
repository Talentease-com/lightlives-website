"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import SwooshButton from "@/components/ui/swoosh-button";

export default function SponsorModal() {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      if (!hasShown) {
        setOpen(true);
        setHasShown(true);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [hasShown]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-[#162b48] rounded-none p-0 overflow-hidden" showCloseButton>
        <div className="flex flex-col items-center">
          <div className="relative w-full h-64">
            <Image
              src="https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg"
              alt="Students learning"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col z-10 text-white items-center p-6">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-2xl font-bold text-center">
                Invest in India’s true strength – Our Children <span role="img" aria-label="India">🇮🇳</span>
              </DialogTitle>
              <DialogDescription className="text-lg text-white text-center mt-2">
                Let’s empower the future of India! Support their education.
              </DialogDescription>
            </DialogHeader>
            <SwooshButton
              href="/donate"
              text="Sponsor And Save Tax"
              className="bg-primary text-white font-bold py-4 px-8 text-lg shadow-xl mt-4"
            />
          </div>
          <svg
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
            width="640"
            height="500"
            viewBox="0 0 640 500"
          // style={{ transform: 'rotate(45deg)' }}
          >
            <polygon
              points="500,90 640,190 6400,500 0,600 0,220 130,40"
              fill="#1c365d"
              strokeWidth="10"
            />
          </svg>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
