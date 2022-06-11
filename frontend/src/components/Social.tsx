import React from "react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Social = () => {
  return (
    <>
      <div className="social-midia">
        <a href="https://github.com/rayandiniz" target="_blank"><FaGithub /></a>
        <a href="https://twitter.com/RayanCassio" target="_blank"><FaTwitter /></a>
        <a href="https://www.linkedin.com/in/rayan-cassio-vieira-diniz-16671b145/" target="_blank"><FaLinkedinIn /></a>
      </div>
    </>
  )
}
export default Social;