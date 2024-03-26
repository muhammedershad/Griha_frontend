import Navbar from "../../components/Home/Navbar";
import image from "../../../public/images/armchair-green-living-room-with-copy-space.jpg";

function About() {
    return (
        <>
            <Navbar />
            <div className="md:mx-28 md:mt-28 m-4 mt-24">
                <h1 className="text-3xl font-bold text-gray-400 mb-4">
                    About Us
                </h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <img
                            src={image}
                            alt="About Us"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-1/2 flex align-middle">
                        <div>
                            <p className="text-lg text-gray-500 leading-relaxed text-justify">
                                Welcome to Architecture Firm, your premier
                                destination for innovative architectural
                                solutions. With years of experience and a
                                passion for design excellence, we strive to
                                transform your vision into reality. Our team of
                                talented architects and designers are committed
                                to delivering exceptional results, tailored to
                                meet your unique needs and preferences.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed mt-4">
                                At Architecture Firm, we believe in
                                collaboration, creativity, and attention to
                                detail. Whether you're embarking on a
                                residential, commercial, or institutional
                                project, we're here to guide you every step of
                                the way. Explore our portfolio to witness our
                                commitment to quality and craftsmanship, and
                                contact us today to discuss how we can bring
                                your architectural dreams to life.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default About;
