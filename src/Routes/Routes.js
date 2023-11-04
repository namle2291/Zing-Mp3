import MainLayout from "../Component/Layout/MainLayout/MainLayout";
import Album from "../Pages/Album/Album";
import Artist from "../Pages/Artist/Artist";
import Info from "../Pages/Auth/Info";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import HubDetail from "../Pages/HubDetail/HubDetail";
import HubHome from "../Pages/HubHome/HubHome";
import NewMusic from "../Pages/NewMusic/NewMusic";
import NotFound from "../Pages/NotFound/NotFound";
import Radio from "../Pages/Radio/Radio";
import Search from "../Pages/Search/Search";
import Top100 from "../Pages/Top100/Top100";
import Video from "../Pages/Video/Video";
import ZingChart from "../Pages/ZingChart/ZingChart";

const routes = [
  {
    path: "/",
    element: Home,
    layout: MainLayout,
  },
  {
    path: "/info",
    element: Info,
    layout: MainLayout,
  },
  {
    path: "/login",
    element: Login,
    layout: MainLayout,
  },
  {
    path: "/register",
    element: Register,
    layout: MainLayout,
  },
  {
    path: "/zing-chart",
    element: ZingChart,
    layout: MainLayout,
  },
  {
    path: "/radio",
    element: Radio,
    layout: MainLayout,
  },
  {
    path: "/library",
    element: Radio,
    layout: MainLayout,
  },
  {
    path: "/new-music",
    element: NewMusic,
    layout: MainLayout,
  },
  {
    path: "/top-100",
    element: Top100,
    layout: MainLayout,
  },
  {
    path: "/hub",
    element: HubHome,
    layout: MainLayout,
  },
  {
    path: "/hub/detail/:id",
    element: HubDetail,
    layout: MainLayout,
  },
  {
    path: "/video/:id",
    element: Video,
    layout: null,
  },
  {
    path: "/search/:q",
    element: Search,
    layout: MainLayout,
  },
  {
    path: "/album/:id",
    element: Album,
    layout: MainLayout,
  },
  {
    path: "/artist/:name",
    element: Artist,
    layout: MainLayout,
  },
  {
    path: "*",
    element: NotFound,
    layout: MainLayout,
  },
];

export { routes };
