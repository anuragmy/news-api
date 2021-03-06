import * as actionTypes from "./actionTypes";

const initialState = {
  bookmarkNews: [],
  all: [],
};

export const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BOOKMARK: {
      const isPresent = state.bookmarkNews.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        bookmarkNews: !isPresent
          ? [...state.bookmarkNews, action.payload]
          : state.bookmarkNews.filter(
              (item) => item.title !== action.payload.title
            ),
        all: !isPresent
          ? state.all.filter((item) => item.title !== action.payload.title)
          : [{ ...action.payload, bookmark: false }, ...state.all],
      };
    }
    case actionTypes.ALLNEWS: {
      return {
        ...state,
        all: action.payload.news,
        type: action.payload.type,
      };
    }

    case actionTypes.CLEAR: {
      return {
        ...state,
        all: [],
        bookmarkNews: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default NewsReducer;
