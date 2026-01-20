import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard";
import adminRouter from "./router/admin-router";
import MainLayout from "./layout/main-layout";
import Login from "./pages/auth/admin/login";
import TeacherLogin from "./pages/auth/teacher/login";
import TeacherDashboard from "./pages/teacher/lessons/lessons";
import teacherRouter from "./router/teacher-router";
import TeacherGoogleCallback from "./pages/auth/teacher/googleCallback";
import First from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/admin/login" element={<Login />} />
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

        <Route
          path="/teacher/google/callback"
          element={<TeacherGoogleCallback />}
        />

        <Route path="admin">
          <Route element={<MainLayout role="admin" />}>
            <Route index element={<Dashboard />} />

            {adminRouter.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
        </Route>


        <Route path="teacher">
          <Route element={<MainLayout role="teacher" />}>
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
