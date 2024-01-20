import React from "react";
import Navbar from "../../components/Home/Navbar";

const UserProjectDetails = () => {
    return (
        <>
            <Navbar />
            <div className="md:mx-44 mt-28 text-gray-400">
                <h3 className="text-2xl font-bold">Resort</h3>

                <div className=" mt-8 h-[450px] w-full flex flex-col md:flex-row">
                    <div className=" col-span-12 md:col-span-6 w-full text-justify overflow-hidden overflow-scroll p-4">
                        <div className="flex p-4">
                            <div>
                                <p>Project name</p>
                                <p>Client</p>
                                <p>Site Area</p>
                                <p>Location</p>
                                <p>Builtup Area</p>
                            </div>
                            <div className="ml-10">
                                <p>- Project name</p>
                                <p>- Client</p>
                                <p>- Site Area</p>
                                <p>- Location</p>
                                <p>- Builtup Area</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p>
                                5 point 05 is a three bedroom house composed
                                with notions of Vaasthu Shastra under a modest
                                budget in the outskirts of Calicut within a
                                total site area of 5.05 cents. The design was
                                intended to maximize ventilation and accommodate
                                open spaces. With The prevailing winds from
                                southwest and northeast, the site is abutted by
                                road in south and existing structures on all the
                                other sides. North side of the site has an
                                advantage of vegetation cover. To design a
                                residence which is well ventilated without
                                compromising on privacy was a challenging factor
                                in such a scenario. To overcome this, the
                                ventilation openings were maximized in the north
                                and south and minimized in east and west as
                                privacy is a matter of concern due to existing
                                structures.
                                <br />
                                <br /> The design was initiated by basic concept
                                of Vaasthu Shastra of dividing the site into a
                                3X3 grid. The spaces were then arranged into
                                these blocks as per principles of Vaasthu
                                Shastra. The kitchen was moved from northeast to
                                North West to benefit predominant winds to
                                ventilate interior spaces. This unfolded the
                                design into 3 volumes of varying porosity which
                                demarcated private, common and breathing space.
                                The private space integrated a bedroom space and
                                kitchen space. The common space accommodated the
                                living and dining spaces. The breathing space
                                included a sit out and a courtyard featured by
                                the stair case which acted as a focal point and
                                increased the openness of the project. The
                                staircase in the courtyard enhanced a sculptural
                                dimension (element) to the breathing space. The
                                first floor accommodates two bedrooms in the
                                south and a family living area which overlooks
                                the common space below. A balcony was
                                incorporated in the southern side accessible
                                from bedrooms to serve as a shading device from
                                the southern sun. The project 5 point 05
                                portrayed a modernistic take on the traditional
                                Vaasthu Shastra while engaging the spaces to be
                                balanced.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center col-span-12 md:col-span-6 w-full p-2 ">
                        <img
                            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg"
                            alt=""
                        />
                    </div>
                </div>
                <div>
                    <img
                        className="w-32 h-32 object-contain"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGRovjyxL8GIRLUvCfGkUJV0KdzbhMtVFPMkajW75H6q6tEnICKJ3JcmBMXJig7fIMcgM&usqp=CAU"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default UserProjectDetails;
