import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Users, School, Award } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const impactIconMap = { Users, School, Award };

