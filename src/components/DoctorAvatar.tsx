"use client";

import { generateAvatar } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface DoctorAvatarProps {
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  imageUrl?: string | null;
  className?: string;
  size?: number;
}

export function DoctorAvatar({ name, gender, imageUrl, className, size = 48 }: DoctorAvatarProps) {
  const isInvalidImage = !imageUrl || imageUrl.includes("avatar.iran.liara.run");
  const fallbackUrl = generateAvatar(name, gender);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={className} style={{ width: size, height: size }}>
      <AvatarImage 
        src={isInvalidImage ? fallbackUrl : imageUrl} 
        alt={name} 
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary font-bold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
