import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard";
import adminRouter from "./router/admin-router";
import MainLayout from "./layout/main-layout";
import Login from "./pages/auth/admin/login";
import { Toaster } from "sonner";
import TeacherLogin from "./pages/auth/teacher/login";
import TeacherDashboard from "./pages/teacher/dashboard.tsx/dashboard";
import teacherRouter from "./router/teacher-router";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* STEP 1 */}
      <Route
        path="/teacher/login"
        element={<TeacherLogin />}
      />

      {/* STEP 2 */}
      <Route
        path="/teacher/register/step2/:teacherId"
        element={<TeacherLogin />}
      />

      {/* STEP 3 */}
      <Route
        path="/teacher/register/step3/:teacherId"
        element={<TeacherLogin />}
      />

        <Route path="/app" element={<MainLayout />}>
          <Route path="admin">
            <Route index element={<Dashboard />} />

            {adminRouter.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
          <Route path="teacher">
            <Route index element={<TeacherDashboard />} />

            {teacherRouter.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
