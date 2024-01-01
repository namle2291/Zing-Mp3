import axios from "axios";

const apiEndpoint = "https://api-zingmp3.vercel.app/api";

// "https://api-zingmp3-public.vercel.app/api"

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const lsnAPI = {
  //  getMovieDetails: (movieId) => `${apiEndpoint}/${movieId}?api_ey=${apiKey}`,
  getHomePage: () => `${apiEndpoint}/home`,

  // get Zing Chart :
  getTopChart: () => `${apiEndpoint}/homechart`,

  // get RadioPage :
  getRadioPage: () => `${apiEndpoint}/radio`,

  // get New Feed :
  getNewFeed: (id, page) => `${apiEndpoint}/newfeeds?id=${id}&page=${page}`,

  // get Mới Phát Hành :
  getNewSong: () => `${apiEndpoint}/newreleasechart`,

  // get Thể Loại :
  getHubHome: () => `${apiEndpoint}/hubhome`,
  // get Hub Detail:
  getHubDetail: (id) => `${apiEndpoint}/hubdetails/${id}`,

  // get Top100Page :
  getTop100Page: () => `${apiEndpoint}/top100`,

  // get List Mv :
  getListMv: (id, page) =>
    `${apiEndpoint}/listmv?id=${id}&page=${page}&count=19`,

  // get Category Mv :
  getCategoryMv: (id) => `${apiEndpoint}/categorymv/${id}`,

  // get Mv:
  getVideoMv: (id) => `${apiEndpoint}/mv/${id}`,

  // get getArtistPage:
  getArtistPage: (id) => `${apiEndpoint}/artist/${id}`,

  // get getAlbumPage :
  getAlbumPage: (id) => `${apiEndpoint}/playlist/${id}`,

  getSong: (id) => `${process.env.REACT_APP_API_URL}/song?id=${id}`,

  getSuggestedAlbum: (id) => `${apiEndpoint}/suggestedplaylists/${id}`,

  //  get từ khóa hot  :
  getHotKeyApi: () => `${apiEndpoint}/recommendkeyword`,

  // lấy key gợi ý :
  getHotSuggestionApi: (keyword) =>
    `${apiEndpoint}/suggestionkeyword?keyword=${keyword}`,

  getSearchByType: (keyword, type) =>
    `${apiEndpoint}/searchtype?keyword=${keyword}&type=${type}`,

  //  bắt đầu search :
  getSearchAllKeyApi: (keyword) => {
    return `${apiEndpoint}/searchall?keyword=${keyword}`;
  },
  // Lyrics :
  getLyrics: (id) => `${apiEndpoint}/songlyrics/${id}`,
};

export { httpRequest };
