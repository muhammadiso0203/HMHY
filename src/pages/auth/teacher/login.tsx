import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSignIn } from "./service/useSignIn";
import { useRegisterStep2, useRegisterStep3 } from "./service/useRegister";
import { toast } from "sonner";
import Cookies from "js-cookie";


const TeacherLogin = () => {
  const { teacherId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // URL mantiqini aniqlash: Agar URLda 'step2' bo'lsa va teacherId mavjud bo'lsa
  const isStep2 = location.pathname.includes("step2") && Boolean(teacherId);
  const isStep3 = location.pathname.includes("step3") && Boolean(teacherId);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const { mutate: signIn } = useSignIn();
  const { mutate: registerStep2, isPending: isRegisteringStep2 } = useRegisterStep2();
  const { mutate: registerStep3, isPending: isRegisteringStep3 } = useRegisterStep3();

  // ================= STEP 1: EMAIL LOGIN =================
  const handleSignin = () => {
    if (!email || !password) {
      toast.error("Email va parolni kiriting");
      return;
    }

    signIn(
      { email, password },
      {
        onSuccess: (res: any) => {
          // AGAR BACKENDDAN TEACHER_ID KELSA STEP 2 GA O'TAMIZ
          if (res?.data?.teacherId || res?.teacherId) {
            const id = res?.data?.teacherId || res?.teacherId;
            navigate(`/auth/teacher/register/step2/${id}`);
          } else {
            // Agar foydalanuvchi allaqachon to'liq ro'yxatdan o'tgan bo'lsa
            if (res?.data?.accessToken || res?.accessToken) {
              Cookies.set("access_token", res?.data?.accessToken || res?.accessToken, { expires: 1 });
            }
            toast.success("Xush kelibsiz!");
            navigate("/app/teacher");
          }
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Login xatosi");
        },
      }
    );
  };

  // ================= STEP 2: PHONE & PASSWORD =================
  const submitStep2 = () => {
    if (!phone || !password) {
      toast.error("Telefon va parolni kiriting");
      return;
    }

    registerStep2(
      { teacherId: teacherId!, phone, password },
      {
        onSuccess: (data: any) => {
          toast.success("OTP kod yuborildi!");

          // OTP kodni toastda ko'rsatish (ishlab chiqish jarayoni uchun)
          if (data?.otpCode || data?.data?.otpCode) {
            const code = data?.otpCode || data?.data?.otpCode;
            toast(`Sizning kodingiz: ${code}`, {
              icon: "🔑",
              duration: 10000
            });
          }

          navigate(`/teacher/register/step3/${teacherId}`);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
        },
      }
    );
  };

  // ================= STEP 3: OTP VERIFICATION =================
  const submitOtp = () => {
    // 1. Dastlabki tekshiruv
    if (!otp || otp.length < 4) {
      toast.error("6 xonali OTP kodni kiriting");
      return;
    }

    // 2. teacherId mavjudligini tekshirish (paramsdan kelgan)
    if (!teacherId) {
      console.error("URLda teacherId topilmadi!");
      toast.error("Tizim xatosi: Teacher ID topilmadi");
      return;
    }

    // 3. So'rov yuborish
    registerStep3(
      {
        teacherId: String(teacherId), // Xatolikni oldini olish uchun stringga o'giramiz
        otpCode: otp
      },
      {
        onSuccess: (res: any) => {
          if (res?.data?.accessToken || res?.accessToken) {
            Cookies.set("access_token", res?.data?.accessToken || res?.accessToken, { expires: 1 });
          }
          toast.success("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!");
          navigate("/app/teacher");
        },
        onError: (err: any) => {
          // Backenddan kelgan massiv ko'rinishidagi xatoni o'qish
          const errorMessage = err?.response?.data?.message;
          const finalMessage = Array.isArray(errorMessage)
            ? errorMessage[0]
            : errorMessage || "OTP tasdiqlashda xatolik";

          toast.error(finalMessage);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF4FF] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* STEP 1: LOGIN */}
        {!isStep2 && !isStep3 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Teacher Login</h1>
            <button
              onClick={() => (window.location.href = "http://localhost:3000/api/v1/auth/teacher/google")}
              className="w-full h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="" />
              Continue with Google
            </button>
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase"><div className="flex-1 h-px bg-gray-200"></div>yoki<div className="flex-1 h-px bg-gray-200"></div></div>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 px-4 bg-[#EEF4FF] rounded-lg outline-none" />
            <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 px-4 bg-[#EEF4FF] rounded-lg outline-none" />
            <button onClick={handleSignin} className="w-full h-11 bg-black text-white rounded-lg">Kirish</button>
          </div>
        )}

        {/* STEP 2: PHONE & PASS */}
        {isStep2 && (
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-center">2-qadam: Ma'lumotlar</h1>
            <input placeholder="+998901234567" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-11 px-4 bg-[#EEF4FF] rounded-lg outline-none" />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Parol yarating" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 px-4 bg-[#EEF4FF] rounded-lg outline-none" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <button onClick={submitStep2} disabled={isRegisteringStep2} className="w-full h-11 bg-black text-white rounded-lg">
              {isRegisteringStep2 ? "Yuborilmoqda..." : "OTP kod olish"}
            </button>
          </div>
        )}

        {/* STEP 3: OTP */}
        {isStep3 && (
          <div className="space-y-6 text-center">
            <h1 className="text-xl font-bold">OTP Tasdiqlash</h1>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full h-14 text-center text-2xl font-bold tracking-[10px] bg-[#EEF4FF] rounded-lg outline-none" placeholder="000000" />
            <button onClick={submitOtp} disabled={isRegisteringStep3} className="w-full h-11 bg-blue-600 text-white rounded-lg">
              {isRegisteringStep3 ? "Tekshirilmoqda..." : "Tasdiqlash"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherLogin;