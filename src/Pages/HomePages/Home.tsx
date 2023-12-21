// import Carousel from "../../components/Home/Carousel";
// import Navbar from "../../components/Home/Navbar";
// import Body from "../../components/common/Body";

// const Home = () => {
//   return (
//     <>
//       <Body />
//       <Navbar />
//           <div className="container z-10 max-h-11 p-24">
//             <Carousel
//               slides={[
//                 "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
//                 "https://www.buildofy.com/blog/content/images/2022/06/_DSC9610-Edited_-min.jpg",
//               ]}
//             />
//           </div>
//     </>
//   );
// };

// export default Home;

// components/pages/Home.js


import Body from '../../components/common/Body';
import Navbar from '../../components/Home/Navbar';
import Carousel from '../../components/Home/Carousel';


const Home = () => {
  return (
    <>
      <Body />
      <div className="absolute inset-0 flex justify-center">
        <Navbar />
        <div className="mx-16 mt-20">
          <Carousel
            slides={[
              'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
              'https://www.buildofy.com/blog/content/images/2022/06/_DSC9610-Edited_-min.jpg',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF2K1JouhV-0mVGnd-UvRJQKis-vPYzp0927YAq2s_5J5fw49oYBDx_GUoYarkjis9hIs&usqp=CAU',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnPvkS8O6WD9x5k3J8NjnGE-K97OIDE90yH6R1051HnZtswgRos8CvL0Bc4eKWBjfD2mg&usqp=CAU'
            ]}
          />
        </div>
      </div>
      
    </>
  );
};

export default Home;
