import {
  Home,
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  Wallet,
  User,
  Calendar,
} from "lucide-react";

export const links = {
  super_admin: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: Home,
    },
    {
      label: "Admins",
      path: "/admin/admins",
      icon: Shield,
    },
    {
      label: "Teachers",
      path: "/admin/teachers",
      icon: Users,
    },
    {
      label: "Students",
      path: "/admin/students",
      icon: GraduationCap,
    },
    {
      label: "Lessons",
      path: "/admin/lessons",
      icon: BookOpen,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      label: "Earnings",
      path: "/admin/earnings",
      icon: Wallet,
    },
    {
      label: "Profile",
      path: "/admin/profile",
      icon: User,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: Home,
    },
    {
      label: "Admins",
      path: "/admin/admins",
      icon: Shield,
    },
    {
      label: "Teachers",
      path: "/admin/teachers",
      icon: Users,
    },
    {
      label: "Students",
      path: "/admin/students",
      icon: GraduationCap,
    },
    {
      label: "Lessons",
      path: "/admin/lessons",
      icon: BookOpen,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      label: "Earnings",
      path: "/admin/earnings",
      icon: Wallet,
    },
    {
      label: "Profile",
      path: "/admin/profile",
      icon: User,
    },
  ],
  teacher: [
    {
      label: "My Lessons",
      path: "/teacher/my-lessons",
      icon: BookOpen,
    },
    {
      label: "Schedule",
      path: "/teacher/schedule",
      icon: Calendar,
    },
    {
      label: "Payments",
      path: "/teacher/payments",
      icon: Wallet,
    },
    {
      label: "Profile",
      path: "/teacher/profile",
      icon: User,
    }
  ]
}

