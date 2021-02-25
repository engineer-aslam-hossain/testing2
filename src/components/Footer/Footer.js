import Link from "next/link";
import fakeSocialIcons from "../../fakeData/fakeSocialIcons";
import fakeFooterItems from "../../fakeData/fakeFooterItems";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { useEffect } from "react";
const Footer = () => {
  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      // document.querySelector(".scrolling").style.display = "block";
    } else {
      // document.querySelector(".scrolling").style.display = "none";
    }
  };

  const scrollToTopbar = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  return (
    <footer style={{ background: "#263238" }}>
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="footerItem d-flex  align-items-center justify-content-center col-md-12 flex-wrap px-0">
            <div className="col-md-6 footerLeft">
              <h1 className="footerLogo">DREAMFINDER</h1>
              <p>
                Shanta Western Tower,Level-10,Office Suite-1004, 186 Bir Uttam
                Mir Shawkat Sarak, Tejgaon ,Dhaka -1208,Bangladesh
              </p>
              <p>
                <span style={{ color: "#FFE778" }}>Hotline:</span> +88 02
                8878781-3
              </p>
              <p>
                <span style={{ color: "#FFE778" }}>Email:</span>{" "}
                info@dreamfinderltd.com
              </p>
              <div className="socialIcon mb-3">
                {fakeSocialIcons.map((item) => (
                  <Link href={item.link} key={item.id}>
                    <a target="_blank">
                      <img src={item.img} alt="me" />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-md-6 d-flex flex-wrap justify-content-end px-0">
              <div className="d-flex flex-column col-md-4 footerRightLink">
                {fakeFooterItems.map(
                  (item) =>
                    item.column === "firstColumn" && (
                      <Link href="/" key={item.id}>
                        <a>{item.title}</a>
                      </Link>
                    )
                )}
              </div>

              <div className="d-flex flex-column col-md-4 footerRightLink">
                {fakeFooterItems.map(
                  (item) =>
                    item.column === "thirdColumn" && (
                      <Link href="/" key={item.id}>
                        <a>{item.title}</a>
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
          <div>
            <a
              href="https://wa.me/+8801681845722"
              className="whatsapp_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
            </a>
          </div>
          <div className="col-md-12 d-flex justify-content-end position-relative"></div>
          {/* <div className="position-relative col-md-12 scrolling">
            <div className="scrollToTop" onClick={scrollToTopbar}>
              <ArrowUpwardIcon />
            </div>
          </div> */}
          <div className="col-md-12">
            <p className="text-center" style={{ color: "#ffd200" }}>
              {new Date().getFullYear()} &copy; DreamFinder
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
