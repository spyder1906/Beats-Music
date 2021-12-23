import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";
import youtubeSearch from "../../apis/youtubeSearch";

// make a permanent playlist object with few songs catergory
const playlistsIds = {
  EnglishSongs: "PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n",
  GujaratiSongs: "PLxDvyCZDEb1OZEchuNWH9Q4odT6ld2XzK",
  EdmSongs: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5",
  TopBolloywood: "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
  TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
  Reggaeton: "PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN",
};

let slowConnectionTimeout;
const HomePage = () => {
  // for home playlist
  const [songObj, setSongObj] = useState({});

  const fetchFromApi = () => {
    slowConnectionTimeout = setTimeout(() => {}, 5000);

    const getTrendingMusic = async () => {
      const res = await youtubeSearch.get("videos", {
        params: {
          chart: "mostPopular",
          videoCategoryId: "10",
          regionCode: localStorage.getItem("country_code"),
        },
      });

      return res.data.items;
    };

    const getPlayListItems = async (data) => {
      const res = await youtubeSearch.get("playlistItems", {
        params: {
          playlistId: data,
        },
      });
      return res.data.items;
    };

    getTrendingMusic().then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ trending: data } };
      });
    });

    getPlayListItems(playlistsIds.EnglishSongs).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ englishSongs: data } };
      });
    });

    getPlayListItems(playlistsIds.GujaratiSongs).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ gujaratiSongs: data } };
      });
    });

    getPlayListItems(playlistsIds.TopBolloywood).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ topBolloywood: data } };
      });
    });
  };

  useEffect(() => {
    const startingTime = new Date();
    const storedTime = localStorage.getItem("trackTime");
    const savedSongs = JSON.parse(localStorage.getItem("homePageSongObj"));

    if (!window.navigator.onLine) {
      alert("You don't have internet!");
    }

    const checkTimeAndFetch = () => {
      const timeElapsed = new Date() - Date.parse(storedTime); //parse the date

      const timeElapsedInHr = timeElapsed / (1000 * 60 * 60); //convert ms into hr

      // if time is more than 12 hr we will fetch from the api

      // console.log("Saved song", savedSongs);
      if (timeElapsedInHr > 12 || !savedSongs.latestSongs) {
        fetchFromApi();
        localStorage.setItem("trackTime", startingTime); //dont forgot to update the time
      } else {
        setSongObj(savedSongs);
      }
    };

    if (!storedTime) {
      // if no time stored we will store it
      localStorage.setItem("trackTime", startingTime);
      fetchFromApi();
    } else {
      checkTimeAndFetch();
    }
  }, []);

  // if song object changes we will push it to localstoarge
  useEffect(() => {
    localStorage.setItem("homePageSongObj", JSON.stringify(songObj));
  }, [songObj]);

  return (
    <>
      <br />
      <SongCard songs={songObj.trending} categotyTitle={"Trending Now"} />

      <SongCard songs={songObj.englishSongs} categotyTitle={"English Songs"} />

      <SongCard songs={songObj.topBolloywood} categotyTitle={"Top Bollywood"} />

      <SongCard songs={songObj.gujaratiSongs} categotyTitle={"Gujarati Songs"} />
    </>
  );
};

export default HomePage;
