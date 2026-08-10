import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import "./App.css";
import "./i18n";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import { QueryProvider } from "./providers/QueryProvider.jsx";
import DynamicFavicon from "./components/DynamicFavicon.jsx";
import InstallZeinApp from "./InstallZeinApp.jsx";
import Loading from "./components/Loading.jsx";

const Home = React.lazy(() => import("./pages/Home.jsx"));
const NotFound = React.lazy(() => import("./components/NotFound.jsx"));
const AllProducts = React.lazy(() => import("./pages/AllProducts.jsx"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails.jsx"));
const Layout = React.lazy(() => import("./pages/Layout.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const AboutUsPage = React.lazy(() => import("./pages/AboutUsPage.jsx"));
const BlogStandard = React.lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogDetailsStandard = React.lazy(() => import("./pages/blog/BlogDetailsStandard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "all-products", element: <AllProducts /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "blog", element: <BlogStandard /> },
      { path: "post/:id", element: <BlogDetailsStandard /> },
      { path: "contact", element: <Contact /> },
      { path: "about-us", element: <AboutUsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryProvider>
      <InstallZeinApp />
      <DynamicFavicon />
      <DataProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </DataProvider>
    </QueryProvider>
  );
}

export default App;
