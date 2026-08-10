import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import TestimonialOneSingle from "../../components/testimonial/TestimonialOneSingle.js";
import axios from "axios";
// !DEL
const TestimonialOne = ({
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  bgColorClass,
  testimonialClass,
  backgroundImage,
  className
}) => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the reviews data when the component mounts
  useEffect(() => {
    const fetchBReviewsData = async () => {
      try {
        const response = await axios.get("https://zaien.test.do-go.net/api/reviews");
        const data = response.data.slice(0, 5);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBReviewsData();
  }, []);

  // Handle loading state
  if (isLoading) {
    return <div className="loading-spinner" />;
  }

  // swiper slider settings
  const settings = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  };

  return (
    <>
      {reviews.length > 0 ? (
        <div
          className={`testimonial-area ${spaceTopClass ? spaceTopClass : ""} ${className} ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${spaceLeftClass ? spaceLeftClass : ""}  ${
            spaceRightClass ? spaceRightClass : ""
          } ${bgColorClass ? bgColorClass : ""}`}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-10 ml-auto mr-auto">
                <div className="testimonial-active nav-style-1 nav-testi-style">
                  <Swiper {...settings}>
                    {reviews.map((single, key) => {
                      return (
                        <TestimonialOneSingle
                          data={single}
                          key={key}
                          sliderClass="swiper-slide"
                          testimonialClass={testimonialClass}
                        />
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

TestimonialOne.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  testimonialClass: PropTypes.string,
};

export default TestimonialOne;
