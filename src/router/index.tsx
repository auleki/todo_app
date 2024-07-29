import { createBrowserRouter } from "react-router-dom";
import TodoList from "../pages/TodoList";
import PlaceholderTodos from "../pages/PlaceholderTodos";
import Layout from "../components/layouts/Layout";

// ROUTER FILE
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <TodoList />
        },
        {
          path: "/use-fetch",
          element: <PlaceholderTodos />
        },
      ]
    },
    
  ])