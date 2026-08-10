import PropTypes from "prop-types";
import React, { Fragment } from "react";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";

const BlogStandard = ({ location }) => {
  return (
    <Fragment>
      <div className="blog-area pt-100 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              <div className="ml-20">
                <div className="row">
                  <BlogPosts />
                </div>

                <BlogPagination />
              </div>
            </div>
            <div className="col-lg-3">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

BlogStandard.propTypes = {
  location: PropTypes.object
};

export default BlogStandard;
