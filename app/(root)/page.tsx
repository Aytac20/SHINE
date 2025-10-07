export const dynamic = "force-dynamic";
import Banner from "@/components/Home/Banner";
import Collections from "@/components/Home/Collections";
import CollectionShow from "@/components/Home/CollectionShow";
import React from "react";

const Home = () => {
  return (
    <div className='flex min-h-[100vh] flex-col'>
      <Banner />
      <CollectionShow />
      <Collections />
    </div>
  );
};

export default Home;
