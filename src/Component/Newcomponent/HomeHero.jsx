import React from "react";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";
import cardimg from "../../img/home/right-box.png";
import bgHero from "../../img/home/bg-hero.png";
import { FaLessThan } from "react-icons/fa6";


const HeroSection = () => {
  return (
    <section
      className="
        relative w-full  overflow-hidden min-h-[120vh]
        bg-black bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: `url(${bgHero})` }}
    >

      {/* Container */}
      <div
        className="
          relative z-10
          w-full
          !px-3 md:!px-6 lg:!px-10 xl:!px-16
          pt-[40px] lg:pt-[120px]
          pb-[50px] lg:pb-[80px]
        "
      >
        {/* Top Section */}
        <div
          className="
            relative
            flex flex-col md:flex-row
            items-center
            justify-between
            min-h-[610px]
          "
        >
          {/* Left Content */}
          <div className="w-full md:w-[43%] lg:w-[40%] self-start !text-center md:!text-left">
            {/* Subtitle */}

            <div className="flex justify-center md:justify-start">
              <p
                className="
                  inline-flex items-center gap-2
                  text-[#0066FF]
                  text-[10px] sm:text-xs
                  font-semibold
                  tracking-[1.4px]
                  font-['JetBrains_Mono']
                  uppercase
                  mb-3
                  px-4 py-2
                  rounded-full
                  bg-[#0066FF0F]
                  border-t-[0.77px] border-t-[#0066FF40]
                  shadow-[0px_3px_4px_0px_#0066FF4D]
                "
              >
                <span className="w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]"></span>
                PROFESSIONAL CRYPTO EXCHANGE
              </p>
            </div>

            {/* Heading */}
            <h2
              className="
                font-['Inter'] 
                font-medium
                text-white w-full
                md:max-w-[700px]
                md:mb-4 mb-3 
                tracking-[0px]
                leading-[100%]
                text-[36px]
                sm:text-[54px]
                md:text-[42px]
                lg:text-[54px]
                xl:text-[74px]
              "
            >
              Trade Digital Assets Without Compromise
            </h2>



            {/* Paragraph */}
            <p
              className="
                w-full md:max-w-[380px] 
                text-[#D0D0D0]
                font-[400] font-['DM Sans']
                text-lg leading-[28px]
                sm:text-lg md:leading-[24px]
                lg:text-lg lg:leading-[34px]
              "
            >
              Access 350+ cryptocurrencies on an exchange built for speed, security, and scale. Institutional infrastructure — available to everyone.
            </p>
          </div>

          {/* Right Cards */}
          <div
            className="
              w-full md:w-[38%]
              flex flex-col sm:flex-row
              items-center md:items-center
              justify-center md:justify-end
              gap-[18px]
              self-end 
            "
          >
  
            {/* Left Column */}
            <div
              className="
                flex flex-col gap-[18px] shrink-0
                lg:mt-[85px]
                w-full sm:w-auto
                items-center mt-5 sm:mt-0
              "
            >
              <div
                className="
                  w-full max-w-[173px] sm:w-[140px] lg:w-[173px]
                  min-h-[160px] lg:min-h-[194px]
                  p-2 sm:p-6
                  rounded-[10px]
                  bg-[#000000]
                  text-center
                  border !border-[#2B7FFFAB]
                  backdrop-blur-[14px]
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-[#2B7FFFAB]
                  hover:shadow-[0px_0px_20px_rgba(43,127,255,0.35)]
                "
              >

              <div
    className="
      absolute
      top-[35%]
      left-1/2
      -translate-x-1/2
      w-[60px]
      h-[60px]
      rounded-full
      bg-[#155DFC]
      
      blur-[40px]
      pointer-events-none
    "
  />
                <img
                  src={cardimg}
                  alt="Card 1"
                  className="
                    w-[60px] lg:w-[96px] h-[62px] lg:h-[99px]
                    object-contain
                    mb-3 lg:mb-6
                    mx-auto
                  "
                />

                <h3
                  className="
                    text-white
                    font-[400]
                    font-['Inter']
                    mb-2
                    text-xl lg:text-2xl
                    flex items-center justify-center gap-1
                  "
                >
                  <FaLessThan />
                  <span>0.10%</span>
                </h3>

                <p
                  className="
                    text-[#D0D0D0] font-['DM Sans'] font-[400]
                    lg:text-base text-sm
                    leading-6
                  "
                >
                  Trading fee
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div
              className="
                flex flex-col gap-[18px] shrink-0
                w-full sm:w-auto
                items-center
              "
            >
              {/* Card 2 */}
              <div
                className="
                  w-full  max-w-[173px] sm:w-[140px] lg:w-[173px]
                  min-h-[160px] lg:min-h-[194px]
                  px-2 !sm:px-6
                  rounded-[10px]
                  bg-[#000000]
                  text-center
                  border !border-[#2B7FFFAB]
                  backdrop-blur-[14px]
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-[#2B7FFFAB]
                  hover:shadow-[0px_0px_20px_rgba(43,127,255,0.35)]
                "
              >
                       <div
    className="
      absolute
      top-[35%]
      left-1/2
      -translate-x-1/2
      w-[60px]
      h-[60px]
      rounded-full
      bg-[#155DFC]
      
      blur-[40px]
      pointer-events-none
    "
  />
                <img
                  src={cardimg}
                  alt="Card 2"
                  className=" w-[60px] lg:w-[96px] h-[62px] lg:h-[99px]
                    object-contain
                    mb-3 !lg:mb-6
                    mx-auto"
                />

                <h3
                  className="
                    text-white
                    font-[400]
                    font-['Inter']
                    mb-2
                    text-xl lg:text-2xl
                  "
                >
                  350+
                </h3>

                <p className=" text-[#D0D0D0] font-['DM Sans'] font-[400]
                    lg:text-base text-sm
                    leading-6">
                  Trading pairs
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="
                 w-full max-w-[173px] sm:w-[140px] lg:w-[173px]
                  min-h-[160px]  lg:min-h-[194px]
                  p-2 sm:p-6
                  rounded-[10px]
                  bg-[#000000]
                  text-center
                  border !border-[#2B7FFFAB]
                  backdrop-blur-[14px]
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-[#2B7FFFAB]
                  hover:shadow-[0px_0px_20px_rgba(43,127,255,0.35)]
                "
              >
                       <div
    className="
      absolute
      top-[35%]
      left-1/2
      -translate-x-1/2
      w-[60px]
      h-[60px]
      rounded-full
      bg-[#155DFC]
      
      blur-[40px]
      pointer-events-none
    "
  />
                <img
                  src={cardimg}
                  alt="Card 3"
                  className=" w-[60px] lg:w-[96px] h-[62px] lg:h-[99px]
                    object-contain
                    mb-3 lg:mb-6
                    mx-auto"
                />

                <h3
                  className="
                    text-white
                    font-[400]
                    font-['Inter']
                    mb-2
                    text-xl lg:text-2xl
                  "
                >
                  99.99%
                </h3>

                <p className=" text-[#D0D0D0] font-['DM Sans'] font-[400]
                    lg:text-base text-sm
                    leading-6">
                  Platform uptime
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="
            flex
            flex-row
            flex-wrap
            justify-center
            items-center
            gap-[18px]
            mt-4
          "
        >
          {/* Button 1 */}
          <button
            className="
               sm:w-auto shrink-0
              h-[49px] font-['DM Sans']
              px-5
              rounded-[16px]
              flex items-center justify-center
              gap-2.5
              text-[#0B0E13]
              text-sm
              font-bold
              bg-gradient
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_16px_40px_rgba(0,132,255,0.45)]
            "
          >
            Start Trading
            <FaArrowRight />
          </button>

          {/* Button 2 */}
          <button
            className="
               sm:w-auto shrink-0
              h-[49px]
              px-4
              rounded-[16px]
              flex items-center justify-center
              gap-2.5
              text-[#E8EDF5]  font-['DM Sans']
              text-sm
              font-semibold 
              border !border-[#1E2740]
              bg-[#000]
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[#009dff] hover:border-2
              hover:shadow-[0_16px_40px_rgba(0,132,255,0.45)]
            "
          >
            Create Free Account
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;




