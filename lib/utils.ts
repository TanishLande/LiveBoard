import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS= [
  "#FF5733", // Red-Orange
  "#33FF57", // Lime Green
  "#3357FF", // Blue
  "#F5F5F5", // Light Gray
  "#FFC300", // Gold
  "#FF33A1", // Pink
  "#33FFF3", // Turquoise
  "#E8E8E8", // Light Gray
  "#7D3F00", // Brown
  "#FF6347"  // Tomato
];


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdtoColors(connectionId: number): string{
  return COLORS[connectionId % COLORS.length]
}
