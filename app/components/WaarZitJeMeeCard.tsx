import React, { ComponentType, SVGProps } from "react";

interface WaarZitJeMeeCardProps {
  /** The illustration component to render (e.g. StudyMan, SportMan) */
  illustration: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  /** CSS animation class(es) to apply to the illustration wrapper */
  animationClass?: string;
  /** The category title (e.g. "Studie en school") */
  title: string;
  /** The description text */
  description: string;
  /** Optional extra className on the root element */
  className?: string;
}

export default function WaarZitJeMeeCard({
  illustration: Illustration,
  animationClass = "animate-float",
  title,
  description,
  className = "",
}: WaarZitJeMeeCardProps) {
  return (
    <div className={`${className} flex flex-col xs:flex-row items-center`}>
      {/* Illustration */}
      <div className={`xs:ml-[40px] xs:my-[30px] lg:ml-[0px] ${animationClass}`}>
        <Illustration className="w-[120px] sm:w-[140px]" />
      </div>

      {/* Text */}
      <div className="mt-[12px] mb-[45px] xs:my-[0px] mx-[40px] xs:ml-[20px] lg:mr-[0px] lg:w-[200px] ">
        <p className="font-no-name-regular text-[#56710C]  text-[20px] sm:text-[23px]">
          {title}
        </p>
        <p className="font-open-sans-regular text-white  text-[16px] leading-[26px] sm:leading-[29px]">
          {description}
        </p>
      </div>
    </div>
  );
}