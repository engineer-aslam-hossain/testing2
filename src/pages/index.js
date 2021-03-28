import HeaderMain from "../components/HeaderMain/HeaderMain";
import PopularArea from "../components/PopularArea/PopularArea";
import PremiumAgents from "../components/PremiumAgents/PremiumAgents";
import NewProperties from "../components/NewProperties/NewProperties";
import Partner from "../components/Partner/Partner";
import Blog from "../components/Blog/Blog";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <>
      <HeaderMain />
      <PremiumAgents />
      <PopularArea />
      <NewProperties />
      <Partner />
      {/* <Blog /> */}
      <SocialMedia />
    </>
  );
}
