import Banner from "@/components/Banner";
import CustomeInfo from "@/components/CustomeInfo";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import NewProducts from "@/components/NewProducts";
import TopRated from "@/components/TopRated";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <>
      <Hero />
      <Info />
      <TopRated />
      <NewProducts />
      <CustomeInfo/>
      <Banner />
    </>
    </main>
  );
}
