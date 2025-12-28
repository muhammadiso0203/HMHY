import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard";
import adminRouter from "./router/admin-router";
import MainLayout from "./layout/main-layout";

const App = () => {
  return (
    <Routes>
      {/* { <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      <Route path="/app" element={<MainLayout />}>
        <Route path="admin">
          <Route index element={<Dashboard />} />

          {adminRouter.map(({ page: Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
