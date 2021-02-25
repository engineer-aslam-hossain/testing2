import { useContext } from "react";
import Buyer from "../components/RealEstateSolutions/Buyer";
import BuyerProperty from "../components/RealEstateSolutions/BuyerProperty";
import RealEstateSolutions from "../components/RealEstateSolutions/RealEstateSolutions";
import SellerProperty from "../components/RealEstateSolutions/SellerProperty";
import UserProfile from "../components/UserProfile/UserProfile";
import Custom404 from "../pages/404";
const profile = () => {
  return (
    <section className="profile">
      <UserProfile />
      {/* <RealEstateSolutions /> */}
      {/* <BuyerProperty /> */}
      {/* <SellerProperty /> */}
    </section>
  );
};

export default profile;
