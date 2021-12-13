import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import Logger from "redux-logger";
import AuthReducer from "./auth/reducer";
import NewsReducer from "./news/reducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: AuthReducer,
  news: NewsReducer,
});

const middlewares = [Logger];

export const store = createStore(
  persistReducer(persistConfig, reducers),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
