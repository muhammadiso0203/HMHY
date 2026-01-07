import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard";
import adminRouter from "./router/admin-router";
import MainLayout from "./layout/main-layout";
import Login from "./pages/auth/admin/login";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={} /> */}
        <Route path="/app" element={<MainLayout />}>
          <Route path="admin">
            <Route index element={<Dashboard />} />

            {adminRouter.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
