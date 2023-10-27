import React, { memo, useEffect, useLayoutEffect } from "react";

import { routes } from "./Routes/Routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import "./assets/css/style.css";
import { setPlaying } from "./features/settingPlay/settingPlay";

function App() {
  const theme = useSelector((state) => state.themetoggle);

  const { playing } = useSelector((state) => state.setting);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.dataTheme);
    if (theme.bgImg) {
      document.documentElement.classList.add("theme-bg-image");
    } else {
      document.documentElement.classList.remove("theme-bg-image");
    }

    if (theme.bgPlaying) {
      document.documentElement.classList.add("zma");
    } else {
      document.documentElement.classList.remove("zma");
    }

    if (theme.dataStyle) {
      const param = theme.dataStyle.map((e) => {
        return e;
      });
      document.documentElement.setAttribute("style", param.join(" ; "));
    } else {
      document.documentElement.removeAttribute("style");
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      let input = document.querySelectorAll("input");

      let data = e.keyCode;

      let isInput = false;
      input.forEach((e) => {
        if (e === document.activeElement) {
          isInput = true;
        }
      });

      if (isInput) return;

      switch (data) {
        case 32:
          e.preventDefault();
          dispatch(setPlaying(!playing));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [playing]);

  return (
    <>
      <div
        className="main"
        style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}
      >
        <ToastContainer position="top-center" />
        <BrowserRouter>
          <Routes>
            {routes.map((item, index) => {
              let Layout = item.layout;
              let Element = item.element;
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <Layout>
                      <Element />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}

export default memo(App);
