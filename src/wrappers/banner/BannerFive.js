import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import axiosInstance from "../../api/api";

const BannerFive = ({ strings, currentLanguageCode, className }) => {
  const [bannerData, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the banners data when the component mounts
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axiosInstance.get("/offers-banner");
        setBanners(response.data || []);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  // Filter banners for main and others
  const mainBanner = bannerData?.find((banner) => banner.main === 1);
  const otherBanners = bannerData?.filter((banner) => banner.main !== 1);
  const d1 = otherBanners?.slice(0, 2);
  const d2 = otherBanners?.slice(2, 4);

  // Handle loading state
  if (isLoading) {
    return <div className="loading-spinner" />;
  }

  return (
    <div className={`banner-area hm9-section-padding ${className}`}>
      <div className="container-fluid">
        <div className="row">
          {/* First group of banners */}
          <div className="col-lg-4 col-md-6">
            <div className="row">
              {d1 &&
                d1.map((el) => (
                  <div className="col-lg-12" key={el.id}>
                    <div className="single-banner mb-20">
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        <div className="banner-image-wrapper">
                          <img src={el.image_path} alt="Banner" loading="lazy" />
                          <div className="overlay" />
                        </div>
                      </Link>
                      <div className="banner-content-3 banner-position-hm15-1">
                        <h3>
                          {currentLanguageCode === "en"
                            ? el?.translations[1].title
                            : el?.translations[0].title}
                        </h3>
                        <p>
                          {currentLanguageCode === "en"
                            ? mainBanner?.translations[1].description
                            : mainBanner?.translations[0].description}
                        </p>
                        <Link to={process.env.PUBLIC_URL + "/shop"}>
                          <i className="fa fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Main banner */}
          <div className="col-lg-4 col-md-6">
            {mainBanner && (
              <div className="single-banner mb-20">
                <Link to={process.env.PUBLIC_URL + "/shop"}>
                  <div className="banner-image-wrapper">
                    <img
                      src={mainBanner?.image_path}
                      alt="Banner"
                      loading="lazy"
                    />
                    <div className="overlay" />
                  </div>
                </Link>
                <div className="banner-content-4 banner-position-hm15-2">
                  <span>
                    {currentLanguageCode === "en"
                      ? mainBanner?.translations[1].description
                      : mainBanner?.translations[0].description}
                  </span>
                  <h2>
                    {currentLanguageCode === "en"
                      ? mainBanner?.translations[1].title
                      : mainBanner?.translations[0].title}
                  </h2>
                  <Link to={process.env.PUBLIC_URL + "/shop"} style={{ backgroundColor: 'white', color: '$theme-color' }}>
                    {strings["shop_now"]}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Second group of banners */}
          <div className="col-lg-4 col-md-12">
            <div className="row">
            {d2 &&
  d2.map((el, index) => (
    <div className="col-lg-12 col-md-6" key={el.id}>
      <div className={`single-banner mb-20 ${index === 1 ? "third-item" : ""}`}>
        <Link to={process.env.PUBLIC_URL + "/shop"}>
          <div className="banner-image-wrapper">
            <img src={el.image_path} alt="Banner" loading="lazy" />
            <div className="overlay" />
          </div>
        </Link>
        <div className="banner-content-3 banner-position-hm15-2">
          <h3>
            {currentLanguageCode === "en"
              ? el?.translations[1].title
              : el?.translations[0].title}
          </h3>
          <p>
            {currentLanguageCode === "en"
              ? mainBanner?.translations[1].description
              : mainBanner?.translations[0].description}
          </p>
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default multilanguage(BannerFive);
