import { useGSAP } from '@gsap/react';
import React, { useState } from 'react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'

function App() {

  let[showContent,setShowContent]=useState(false);
  useGSAP(()=>{
    const tl=gsap.timeline();

    tl.to(".vi-mask-group",{
      rotate:10,
      duration:2,
      ease:"Power4.easeInOut",
      transformOrigin:"50% 50%",
    }).to(".vi-mask-group",{
      scale:10,
      duration:2,
      delay:-1.8,
      ease:"Expo.easeInOut",
      transformOrigin:"50% 50%",
      opacity:0,
      onUpdate:function(){
        if(this.progress()>=0.9){
          document.querySelector(".svg").remove();
          setShowContent(true)
          this.kill()
        }
      },
    });
  });
  
  useGSAP(()=>{
    const main=document.querySelector(".main");

    main?.addEventListener("mousemove",function (e){
      const xMove=(e.clientX / window.innerWidth - 0.5) * 40;
      
      gsap.to(".imagesdiv .text",{
        x: `${-33 - xMove * 0.4}%`,
      });

      gsap.to(".sky",{
        x: xMove,
      });

      gsap.to(".bg",{
        x: xMove*1.7,
      });

    });
  }, [showContent])

  return (
    <>
    <div>
       <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
    </div>

    {showContent && 
      <div className='main w-full '>
        <div className='landing w-full h-screen bg-black'>
          <div className='navbar absolute top-0 left-0 z-[10]  w-full py-10 px-10 '>
            <div className='logo flex gap-7'>
              <div className='lines flex flex-col gap-1 justify-center'>
                <div className='line w-10 h-1 bg-white'></div>
                <div className='line w-6 h-1 bg-white'></div>
                <div className='line w-3 h-1 bg-white'></div>
              </div>
              <h3 className='text-3xl -mt-[7px] leading-none text-white'>Rockstar</h3>
            </div>
          </div>


          <div className='imagesdiv relative overflow-hidden w-full h-screen'>
            <img className='sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" />
            <img className='bg scale-[1.1] absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
            
            <div className='text absolute flex flex-col gap-2 top-20 left-1/2 -translate-x-1/3 text-white'>
              <h1 className='text-8xl leading-none  -ml-20'>grand</h1>
              <h1 className='text-8xl leading-none  ml-20'>theft</h1>
              <h1 className='text-8xl leading-none  -ml-20'>auto</h1>
            </div>

            <img className='charactor absolute bottom-[-35%] left-1/2 -translate-x-1/3 scale-[0.8]' src="./girlbg.png" alt="" />

          </div>

          <div className='btmbar text-white w-full py-10 px-10 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0'>
            <div className='flex gap-4 items-center'>
              <i className="text-1xl ri-arrow-down-line"></i>
              <h3 className='font-[Helvetica_Now_Display]'>Scroll Down</h3>
            </div>

            <img className='h-[45px] absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2' src="./ps5.png" alt="" />

          </div>

          
        </div>
      </div>

      
    }
    </>
  );
}

export default App
