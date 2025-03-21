'use client';
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus(""); // Clear previous status
    emailjs
      .sendForm(
        "service_584nbo7", // Replace with your EmailJS service ID
        "template_ryhh51o", // Replace with your EmailJS template ID
        e.target,
        "BpLl6GlYWdp4RpFjQ" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          setFormStatus("Booking request sent successfully to Chemisphere!");
          e.target.reset(); // Reset form fields
        },
        (error) => {
          setFormStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="bg-bgg bg-cover rounded-3xl mobile:pb-2 laptop:mt-44 laptop:mx-4">
      <section className="laptop:mx-24 mobile:mx-4 pt-0 laptop:mt-44">
        <div className="grid gap-4 mx-auto laptop:pb-8 laptop:mb-0 laptop:grid-cols-12">
          {/* Heading and description */}
          <div className="laptop:col-span-7">
            <div className="bg-white p-4 rounded-b-3xl">
            
              <h1 className="laptop:text-slate-900  mobile:text-black mobile:mt-24 text-center laptop:text-center font-bold text-3xl laptop:text-4xl tracking-tight laptop:mt-0">
                AspectAI <br /><span className='font-normal text-2xl'>AI that autoframes your story with perfection. </span>
                
              </h1>
              
            </div>
            <div className="bg-white text-blacl rounded-xl text-left mobile:text-center transition font-semibold my-4 flex laptop:flex-row mobile:flex-col  justify-center laptop:px-24 items-center">
  {/* Image Section */}
  {/* <div className=" mobile:mb-0">
    <img src="/4.png" className="w-32 max-h-fit" alt="Chemisphere Merchandise" />
  </div> */}
  {/* Text Section */}
  <div className="flex-1">
   <p className='mobile:text-center py-4'> Resize, Format Converter & AI video enhancer for Instagram, YouTube, Facebook, Twitter and other social media </p> 
  </div>
</div>


            <div className="bg-white p-4 rounded-3xl laptop:mt-4 mobile:mt-12">
              <div className="mx-auto p-5">
                <div className="rounded flex flex-col max-w-fit mx-auto w-full">
                <iframe 
  className="rounded-3xl w-full aspect-video" 
  src="" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowFullScreen>
</iframe>


                  <div className="relative px-6 pt-5 pb-5 bg-black rounded-3xl mt-4">
                    <p
                      className="font-normal text-lg text-white  transition duration-500 ease-in-out"
                    >
                      Why choose Chemisphere?
                    </p>
                    <p className="text-gray-400 text-sm">
                      There are customized classes for you to suit your needs.
                      Also, you will get a lot of video and text resources to
                      learn along with the most neat class notes which will
                      probably make you fall in love with Chemistry again! You
                      will be able to track your progress at every level with
                      weekly and monthly tests.s
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking section */}
          <div className="laptop:col-span-5 flex justify-center h-fit">
            <div className=" mx-auto mobile:my-12 px-4 laptop:px-12 laptop:mx-0  bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="text-center py-4">
                <img
                  src="/herobanner.svg"
                  className="w-[400px] mx-auto rounded-3xl"
                  alt="Aspect AI banner"
                />
              </div>
           <div className='text-center pb-8'>
                   <Link href="/sign-up">
                    <button className='bg-black text-white px-4 py-2 rounded-lg mr-8'>
                      Sign up
                    </button>
                   </Link>
                   
                    
                   <Link href="/sign-in">
                    <button className='bg-black text-white px-4 py-2 rounded-lg' >
                      Log in
                    </button>
                   </Link>
                    </div><div></div>            </div>
          </div>
                  {/* Right Section */}
        
        </div>
      </section>
    </div>
  );
};

export default Hero;