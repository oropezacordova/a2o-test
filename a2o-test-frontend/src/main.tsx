import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Problem1 from "./views/Problem1";
import Problem2 from "./views/Problem2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/problem-1",
    element: <Problem1 />,
  },
  {
    path: "/problem-2",
    element: <Problem2 />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <main className="flex-1 min-h-screen p-10 bg-stone-200 min-w-[350px]">
    <RouterProvider router={router} />
  </main>
);
