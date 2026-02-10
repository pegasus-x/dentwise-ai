import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const formatted = name.trim().split(" ").join("+");

  const bg = gender === "FEMALE" ? "F472B6" : "0D8ABC"; // pink / blue

  return `https://ui-avatars.com/api/?name=${formatted}&background=${bg}&color=fff&bold=true`;
}


// simple phone number formatter for 10-digit numbers (e.g. US, India)
export const formatPhoneNumber = (value: string) => {
  if (!value) return "";

  const digits = value.replace(/\D/g, "");

  // 🇮🇳 India: 10-digit numbers → 5 5 format
  if (digits.length <= 10) {
    return digits.replace(/^(\d{5})(\d+)/, "$1$2");
  }

  // 🌍 Global fallback: group every 3 digits
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ");
};
