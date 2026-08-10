import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css"; // Import Swiper styles
import axiosInstance from "../../api/api.js";
import video from "../../assets/videos/home_video.mp4"
const HeroSliderFive = ({ spaceLeftClass, spaceRightClass , className }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(null); // Start with null to avoid premature API calls

    useEffect(() => {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  };

  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobileOrTablet === null) {
      // Don't fetch data until the media query is evaluated
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          isMobileOrTablet ? "/sliders-phone" : "/sliders-web"
        );
        setData(response.data || []); // Ensure response structure is correct
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    console.log(data)
    fetchData();
  }, [isMobileOrTablet]);

  const params = {
    effect: "fade",
    loop: true, // Enable looping
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <div
      className={`slider-area ${spaceLeftClass || ""} ${spaceRightClass || ""}  ${className}`}
    >
      <div className="slider-active nav-style-1">
        {loading || data.length === 0 ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            {/* {data.map((single, key) => (
              <div
                key={key}
                className=" d-flex align-items-center  bg-img"
                style={{
                  backgroundImage: `url(https://zaien.test.do-go.net/images/${single.image})`,
                  minHeight: "calc(85vh)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))} */}
            <div style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}>
               {/* {data.map((single, key) => (
              <div
                key={key}
                className=" d-flex align-items-center  bg-img"
                style={{
                  backgroundImage: `url(https://zaien.test.do-go.net/images/${single.image})`,
                  minHeight: "calc(85vh)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
             */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                // backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust opacity as needed
                zIndex: 1,
              }}></div>

              <video autoPlay loop muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                }}>
                <source src={video} type="video/mp4" />
              </video>
            </div>

          </>

        )}
      </div>
    </div>
  );
};

HeroSliderFive.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderFive;
