import { configureStore } from "@reduxjs/toolkit";

import themeToggle from "../features/setTheme/themeSetFeatures";
import setting from "../features/settingPlay/settingPlay";
import playNow from "../features/setPlayNow/playNow";
import auth from "../features/setAuth/setAuth";

export const store = configureStore({
  reducer: {
    themetoggle: themeToggle,
    setting: setting,
    playNow: playNow,
    auth: auth
  },
});
