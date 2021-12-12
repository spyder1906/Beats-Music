import axios from "axios";

// put your api keys in .env file you can get those here - https://developers.google.com/youtube/v3/getting-started
export const selectRandomKey = () => {
  console.log(process.env.REACT_APP_YouTube_Keys, "abc");
  const ytApi =
    "AIzaSyA1HrjcCL-ZwOrSA76v8owYl5277QeS1dg AIzaSyB5ioCpD2eHiIlMk74LSa9Jy0ObP-V-ch8 AIzaSyC-3VwhGp4OXHkM8AFmDO0Vd8QHiKhwYRc AIzaSyA-cdyaxnFJykPEzZXZZdx-MVdnetCPeU4";
  const keys = ytApi.split(" "); //we are splitting the api keys to make an array
  const random = Math.floor(Math.random() * Math.floor(keys.length)); //this will get a random number
  return keys[random];
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    videoCategoryId: "10",
    type: "video",
    key: selectRandomKey(),
  },
});
