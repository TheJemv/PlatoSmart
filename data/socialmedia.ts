import { Instagram, Facebook, Twitter, Youtube, type LucideIcon } from "lucide-react";

export interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

// Set to empty array to hide social links, or populate with your social media accounts
export const socialLinks: SocialLink[] = [
  // Uncomment and update the links below to show social media icons
  // { href: "https://instagram.com/platosmart", icon: Instagram, label: "Instagram" },
  // { href: "https://twitter.com/platosmart", icon: Twitter, label: "Twitter" },
  // { href: "https://facebook.com/platosmart", icon: Facebook, label: "Facebook" },
  // { href: "https://youtube.com/platosmart", icon: Youtube, label: "YouTube" },
];

export const hasSocialLinks = socialLinks.length > 0;
