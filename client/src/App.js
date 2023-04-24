import React, { useState, useEffect } from "react";
import { getImages, searchImages } from "./api";
import "./App.css";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        handleLoadMoreButtonClick();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextCursor]);

  const handleLoadMoreButtonClick = async () => {
    setIsLoading(true);
    const responseJson = await getImages(nextCursor);
    setImageList(currentImageList => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
    setIsLoading(false);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    const responseJson = await searchImages(searchValue, nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    setIsLoading(false);
  };

  const resetForm = async () => {
    setIsLoading(true);
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    setSearchValue("");
    setIsLoading(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleImageClick = event => {
    const img = event.target;
    if (img.classList.contains("img")) {
      img.classList.toggle("zoomed");
      if (img.classList.contains("zoomed")) {
        document.addEventListener("keydown", handleEscapeKey);
      } else {
        document.removeEventListener("keydown", handleEscapeKey);
      }
    }
  };

  const handleEscapeKey = event => {
    if (event.key === "Escape") {
      const img = document.querySelector(".img.zoomed");
      img.classList.remove("zoomed");
      toggleDarkMode();
      document.removeEventListener("keydown", handleEscapeKey);
    }
  };
  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <header>
        <h1>Image Gallery</h1>
        <button type="button" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required="required"
          placeholder="Enter a search value..."
        ></input>
        <button type="submit">Search</button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="lds-ring">
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className="image-grid">
            {imageList.map((image) => (
              <div key={image.public_id} className="image-container">
                <img
  className="img"
  src={image.url}
  alt={image.public_id}
  onClick={handleImageClick}
/> 

              </div>
            ))}
          </div>
          {nextCursor && (
            <button type="button" onClick={handleLoadMoreButtonClick}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default App;

