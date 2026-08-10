import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const BlogFeaturedThreeSingle = ({ singlePost, currentLanguageCode, strings }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="blog-wrap-2 mb-30">
        <div className="blog-img-2">
          <Link to={`/post/${singlePost.id}`}>
            <img
              src={singlePost.image_path}
              alt={
                currentLanguageCode === "ar"
                  ? singlePost.translations[0].title
                  : singlePost.translations[1].title
              }
            />
          </Link>
        </div>
        <div className="blog-content-2">
          <div className="blog-meta-2">
            <ul>
              <li>{singlePost.created_at}</li>
            </ul>
          </div>
          <h4>
            <Link to={`/post/${singlePost.id}`}>
              {currentLanguageCode === "ar"
                ? singlePost.translations[0].title
                : singlePost.translations[1].title}
            </Link>
          </h4>
          <p>
            {currentLanguageCode === "ar"
              ? singlePost.translations[0].content
                  .split(" ")
                  .slice(0, 10)
                  .join(" ")
              : singlePost.translations[1].content
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
          </p>
          <div className="blog-share-comment ">
            <div className="blog-btn-2">
              <Link to={`/post/${singlePost.id}`}>{strings["read_more"]}</Link>
            </div>
            <div className="blog-share">
              <span>{strings["share"]}</span>
              <div className="share-social">
                <ul>
                  <li>
                    <a className="facebook hover:text-blue-500 transition-colors duration-300" href="//facebook.com">
                      <FaFacebook size={18} />
                    </a>
                  </li>
                  <li>
                    <a className="twitter hover:text-blue-500 transition-colors duration-300" href="//twitter.com">
                      <FaTwitter size={18} />
                    </a>
                  </li>
                  <li>
                    <a className="instagram hover:text-blue-500 transition-colors duration-300" href="//instagram.com">
                      <FaInstagram size={18} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedThreeSingle.propTypes = {
  singlePost: PropTypes.object,
};

export default multilanguage(BlogFeaturedThreeSingle);
