import Body from "../../components/common/Body";
import Navbar from "../../components/Home/Navbar";
import Carousel1 from "../../components/Home/Carousel1";
import house_top_cut from "../../../public/images/house_top_cut-removebg-preview.png";

const Home = () => {
    return (
        <>
            <Body />
            <div className="absolute inset-0 flex justify-center">
                <Navbar />
                <div className="md:mx-28 mt-20">
                    {/* <Carousel
            slides={[
              'https://i.pinimg.com/736x/ec/a6/9b/eca69bd2d24dd4c1d9d296b365c14de2.jpg',
              'https://i.pinimg.com/736x/bf/2a/e9/bf2ae9181bc7a073b11d15da607208c8.jpg',
              'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg',
              'https://i.pinimg.com/736x/08/21/1e/08211ec43a3988ff31f704a872d60447.jpg'
            ]}
          /> */}
                    <Carousel1
                        images={[
                            "https://i.pinimg.com/736x/ec/a6/9b/eca69bd2d24dd4c1d9d296b365c14de2.jpg",
                            "https://i.pinimg.com/736x/bf/2a/e9/bf2ae9181bc7a073b11d15da607208c8.jpg",
                            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
                            "https://i.pinimg.com/736x/08/21/1e/08211ec43a3988ff31f704a872d60447.jpg",
                            "https://i.pinimg.com/736x/55/f8/f4/55f8f41f8e8161e7384372f14ca2f906.jpg",
                        ]}
                    />

                    <div className="flex flex-col md:flex-row">
                        <div className="col-span-12 md:col-span-6 w-full">
                            <img
                                className="z-10"
                                src={house_top_cut}
                                alt="Example"
                            />
                        </div>
                        <div className="flex w-full text-white text-center items-center col-span-12 md:col-span-6">
                            <div>
                                <p className="align-middle font-bold text-4xl">
                                    The Home That Your Heart Chooses
                                </p>
                                <p className="mt-3">
                                    Schedule Your{" "}
                                    <span className="text-yellow-700">
                                        Free
                                    </span>{" "}
                                    Consultation Today!
                                </p>
                                <button className="mt-5 text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Schedule Meeting..
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                      <div>
                        
                      </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
