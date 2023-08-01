import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-scroll';
import Balancer from 'react-wrap-balancer';
import Donators from './Donators';
import Image from "next/image";

export default function Landing() {
  const donators = [
    { name: 'Anuar', amount: '$' },
    // { name: 'Jane Smith', amount: '$400' },
    // { name: 'Bob Johnson', amount: '$300' },
    // { name: 'Alice Williams', amount: '$200' },
    // { name: 'Charlie Brown', amount: '$100' }
  ];
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer><br /> <br /> <br /> Meet your AI Roadmap Assistant</Balancer>
        </h1>
        <div
          className="mt-6 animate-fade-up flex justify-center items-center opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Link to="about-section" smooth={true} className="mt-16">
            <Image src="/down-arrow.png" alt='arrow' width="60" height="60"/>
          </Link>
        </div>
      </div>

      <div id="about-section" className="flex flex-col items-center mt-80 sm:mt-40">
        <Fade direction="up" triggerOnce>
          <div className="text-center px-4 sm:px-10">
            <h1 className="text-6xl font-bold sm:text-4xl">About Us</h1>
            <p className="mt-6 text-black-500 text-2xl sm:text-xl" >
              Our product is a roadmap assistant that helps users achieve their goals by using a step-by-step roadmap. This site can create a personal roadmap for users in IT. It will be useful for users with a background in the field because it can create a roadmap based on your already known skills. It is also great for beginners because it creates a roadmap for some majors on how to start from scratch and provides useful resources where users can learn material and practice.
            </p>
          </div>
        </Fade>
        <Link to="founder-section" smooth={true} className="mt-16">
          <Image src="/down-arrow.png" alt='arrow' width="60" height="60"/>
        </Link>
      </div>
      <div id="founder-section" className="flex flex-col items-center mt-80 sm:mt-40">
        <Fade direction="up" triggerOnce>
          <div className="text-center px-4 sm:px-10">
            <h2 className="text-4xl sm:text-2xl"> I am Anuar, the founder of this project. </h2>
            <p className="mt-6 text-black-500 text-2xl sm:text-xl">
              The concept for this project was born out of my own struggle to find a structured roadmap when I was just starting out in IT. I wanted to build something that would not only guide aspiring professionals on their IT journey, but also provide resources to help them develop and grow in their careers.<br />
              <br />
              I truly believe that technology can empower us and transform the world we live in. If you like this project and share the same belief, you can donate to support it. Your donation will go towards making this platform even better and reaching more people in need of guidance.<br /> <br /> (Kaspi 87472729558)<br /> <br /> <br />  
            </p>
            <Donators className="w-full items-center mt-6" donators={donators} />
          </div>
        </Fade>
      </div>
    </>
  )
}
