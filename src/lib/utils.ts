import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE" | "OTHER") {
  const formatted = name.trim().split(" ").join("+");

  let bg = "0D8ABC"; // default blue (MALE)
  if (gender === "FEMALE") bg = "F472B6"; // pink
  if (gender === "OTHER") bg = "6B7280"; // gray

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


//  ai generated 🎉
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};

export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$90" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$75" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$150" },
];