import {
  UserX,
  EyeOff,
  Grid3x3,
  PhoneOff,
  BarChart,
  LayoutGrid,
  Users,
  TrendingUp,
  DollarSign,
  BarChart2,
  type LucideIcon,
} from "lucide-react";

/**
 * i18n lug'atlaridagi ikon nomlarini (string) haqiqiy lucide-react
 * komponentlariga bog'lab beradi. Shu tarzda tarjima fayllari faqat
 * ma'lumot (data) bo'lib qoladi, komponent import qilmaydi.
 */
export const iconMap: Record<string, LucideIcon> = {
  userX: UserX,
  eyeOff: EyeOff,
  grid: Grid3x3,
  phoneOff: PhoneOff,
  barChart: BarChart,
  layoutGrid: LayoutGrid,
  users: Users,
  trendingUp: TrendingUp,
  dollar: DollarSign,
  barChart2: BarChart2,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Grid3x3;
}
