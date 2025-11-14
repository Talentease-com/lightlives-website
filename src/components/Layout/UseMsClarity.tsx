"use client";
import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function UseMsClarity() {
    useEffect(() => {
        console.log("Initializing Microsoft Clarity...");
        try {
            if (typeof window !== "undefined") {
                Clarity.init(process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID || "");
            }
            console.log("Microsoft Clarity initialized");
        } catch (error) {
        console.error("Error initializing Microsoft Clarity:", error);
        }
      }, []);

    return null;
}