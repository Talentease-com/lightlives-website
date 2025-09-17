import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createStaticClient } from "@/utils/supabase/static";
import { Users, School, Award } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface ImpactStat {
  value: number;
  format: string;
  label: string;
  description: string;
  decimals?: number;
  usePointer?: boolean;
  icon: keyof typeof impactIconMap;
}

export const impactIconMap = { Users, School, Award };


// Fetch impact data directly from Supabase
export async function getImpactData() {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("impact")
      .select("value, format, label, description, decimals, usePointer, icon");

    if (error) {
      console.error('Error fetching impact data:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return [];
  }
}