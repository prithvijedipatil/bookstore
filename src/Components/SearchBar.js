import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Images/logo.png";
import textlogo from "../Images/KeazoNBOOKS.png";
import search from "../Images/search.png";
import image1 from "../Images/image1.png";
import image2 from "../Images/image2.png";
import image3 from "../Images/image3.png";
import image4 from "../Images/image4.png";
const SearchBar = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading , setLoading] = useState("")

  // const [data2, setData2] = useState([]);

  useEffect(() => {
    // axios
    //   .get("https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes")
    //   .then((response) => setData1([...data1 , ...response.data.items]));

    // axios
    //   .get("https://www.googleapis.com/books/v1/volumes?q=harry+potter")
    //   .then((response) => setData1([...data1 , ...response.data.items]));

    // console.log(data1);
    // console.log(data2);
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"
        );
        const response2 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
        );

        const combinedData = [...response1.data.items, ...response2.data.items];
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function displayDetails(volumeInfo) {
    setDisplay(volumeInfo);
    console.log(volumeInfo);
  }
  // previewLink  infoLink

  function nowRead(link) {
    let nowread = document.createElement("a");
    nowread.href = link;
    nowread.target = "_blank";
    nowread.click();

    // window.location.href = link
  }
  function moreInfo(link) {
    let moreinfo = document.createElement("a");
    moreinfo.href = link;
    moreinfo.target = "_blank";
    moreinfo.click();
    // window.location.href = link
  }

  //    https://www.googleapis.com/books/v1/volumes?q=harry+potter
  // https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes

  async function findBooks() {
      setLoading(true)
    console.log("first");
    //  setDisplay("")
    try {
      let response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=20`
      );

      console.log(response.data.items);

      const combinedData = [...response.data.items];
      console.log(combinedData);
      setData(combinedData);
      setLoading(false)
    } catch (error) {
      console.log("Error in findBooks:", error);
    }
  }

  return (
    <div>
      <div className="navbar">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="image1" />
          </div>
          <div className="textlogo">
            <img src={textlogo} alt="image2" />
          </div>
        </div>
        <div className="middle">
          <div className="searchImg">
            <img src={search} alt="seachImg" />
          </div>
          <input
            type="text"
            placeholder="Search for the book you want and read it now... Sherlock Holmes, Harry Pot..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="searchBtn" onClick={findBooks}>
            Search
          </button>
        </div>
        <div className="right">
          <div className="image1">
            <img src={image1} />
          </div>
          <div className="image2">
            <img src={image2} />
          </div>
          <div className="image3">
            <img src={image3} />
          </div>
          <div className="image4">
            <img src={image4} />
          </div>
        </div>
      </div>

      {display !== "" && (
        <div className="display">
          <div className="display-img">
            <img
              src={display.imageLinks ? display.imageLinks.thumbnail : "no"}
              alt="image is not sent by the api"
            />
          </div>
          <div className="restDetails">
            <h1 className="heading">{display.title}</h1>
            <div className="authorDetails">
              <h3>{display.authors}</h3>
              <p>
                <span>{display.publishedDate}</span>
              </p>
            </div>
            <p className="para">{display.description}</p>
            <div className="Extra-info">
              <p>
                Avg Rating : <span>{display.averageRating || 5}</span>
              </p>
              <p>
                Rating Count : <span>{display.ratingsCount || 8}</span>
              </p>
              <p>
                Publisher : <span>{display.publisher}</span>
              </p>
              <p>
                Language : <span>{display.language.toUpperCase()}</span>
              </p>
            </div>
            <div className="btn">
              <button onClick={(e) => nowRead(display.previewLink)}>
                Now Read
              </button>
              <button onClick={(e) => moreInfo(display.infoLink)}>
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="data">
        <div className="container">
        {
          loading ?  <div className="loader"></div> :
          
          data.map((element) => (
            <div
              className="books"
              onClick={(e) => displayDetails(element.volumeInfo)}
            >
              <img
                src={
                  element.volumeInfo.imageLinks
                    ? element.volumeInfo.imageLinks.thumbnail
                    : "no"
                }
                alt="image is not sent by the api"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
