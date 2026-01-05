import Dashboard from "@/pages/admin/dashboard";
import Admins from "@/pages/admin/admins";
import Teachers from "@/pages/admin/teachers";
import Students from "@/pages/admin/students";
import Lessons from "@/pages/admin/lessons";
import Payments from "@/pages/admin/payments";
import Earnings from "@/pages/admin/earnings";
import Profile from "@/pages/admin/profile";


export default [
  {
    path: "dashboard",
    page: Dashboard,
  },
  {
    path: "admins",
    page: Admins,
  },
  {
    path: "teachers",
    page: Teachers,
  },
  {
    path: "students",
    page: Students,
  },
  {
    path: "lessons",
    page: Lessons,
  },
  {
    path: "payments",
    page: Payments,
  },
  {
    path: "earnings",
    page: Earnings,
  },
  {
    path: "profile",
    page: Profile,
  },
];
