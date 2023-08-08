import React from "react";

import axios from "axios";
import { Jumbotron } from "./migration";

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = React.useState("");
  const [showPic, setShowPic] = React.useState(Boolean(link));
  // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  React.useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  return (
    <Jumbotron id="aboutme" className="m-0">
      <div className="container row">
        <div
          className="col-5 d-none d-lg-block align-self-center"
          style={{ paddingLeft: "3rem" }}
        >
          {showPic && (
            <img
              className="border border-secondary h-auto p-3 "
              src={profilePicUrl}
              alt="profilepicture"
              width={imgSize}
              height={imgSize}
            />
          )}
        </div>
        <div className={`col-lg-${showPic ? "7" : "12"}`}>
          <h2 className="display-4 mb-5 text-center">{heading}</h2>
          <p className="lead text-body ">
            Hello! My name is Antonio and I enjoy creating solutions using
            technology. For a few years after high school, I worked at an Amazon
            Warehouse where I became a manager. While I was there I realized
            that I really enjoyed problem solving and wanted to make a career
            switch that involved tackling complex challenges head-on. <br></br>
            <br></br>
            Fast Forward a few years and I've had the pleasure of working for
            Johnson & Johnson. I had a chance to work implementing a knowledge
            graph for a Large Language Model. <br></br>
            <br></br>A recent project that I worked on was hassle-free personal
            streaming experience and I learned how to use Linux and Docker.
            Eventually, I automated show and movie downloads on a personal NAS,
            later adding a Discord chatbot for friends to request and enjoy
            media. <br></br>
            <br></br>
            My path is driven by a commitment to using technology to simplify
            lives, whether it's unraveling complex systems or enhancing digital
            experiences.
          </p>
          {resume && (
            <p className="lead text-center">
              <a
                className="btn btn-outline-dark btn-lg "
                href={resume}
                target="_blank"
                rel="noreferrer noopener"
                role="button"
                aria-label="Resume/CV"
              >
                Resume
              </a>
            </p>
          )}
        </div>
      </div>
    </Jumbotron>
  );
};

export default AboutMe;
