import React from "react";
import Accordion from "./Accordian";

const FAQ = () => {
  return (
    <div>
      <section className='mb-24 laptop:mx-24 laptop:pt-[50px]  mobile:mx-4'>
      <div className='text-center text-4xl font-semibold mb-5' id="faq-section">
        <h4>Frequently asked queries</h4>
      </div>
      <div className="p-4 bg-white rounded-lg text-black border border-1 shadow text-md">
        <Accordion
          title={<h5 className='font-bold laptop:text-lg'>Why choose Chemisphere?</h5>}
          answer = {<p className='pt-2 text-black laptop:text-md opacity-95'>Choose Chemisphere for a captivating chemistry learning experience! Learn from professionals with a decade of mentoring success. Enjoy engaging live classes, meticulous class notes, and track progress with regular assessments and examinations. Elevate your marks and embrace the joy of learning chemistry!</p>}
          className='lg:text-left gap-14 '
          id='accordian'
        />
        <hr />
        <Accordion
          title={<h5 className='font-bold  laptop:text-lg'>Doubt clarification?</h5>}
          answer = {<p className='pt-2 text-black laptop:text-md opacity-95'>Despite the higher number of hours at other institutes, the challenge lies in providing personalized attention to each student. We are committed to ensuring that students have direct communication with the teacher for doubt clarification through platforms like Telegram and WhatsApp. This allows for a more individualized and focused learning experience.</p>}
          className='lg:text-left'
        /><hr />
        <Accordion
          title={<h5 className='font-bold laptop:text-lg'>How will tests be conducted?</h5>}
          answer = {<p className='pt-2 text-black laptop:text-md opacity-95'>Our coaching program leverages technology to enhance the learning experience. The Android/iOS app facilitates a convenient platform for conducting tests and enables parents to track their child's performance. This integration of technology ensures a modern and efficient learning environment. All the reports of the tests are also shared with the parent so that their performance is tracked.</p>}
          className='lg:text-left svg'
        />        <hr />

        <Accordion
          title={<h5 className='font-bold laptop:text-lg'>Will our child be in safe hands?</h5>}
          answer = {<p className='pt-2 text-black laptop:text-md opacity-95'>As an IIT Madras graduate with 12 years of teaching experience in various coaching institutes across India, I bring a unique perspective to the table. Unlike some coaching institutes that prioritize completing the syllabus and little focus beyond that, my focus is on understanding individual student needs and providing quality education. My experience allows me to guide students not just through the curriculum sooner but also to help them develop a deeper understanding of the subjects.</p>}
          className='lg:text-left'
        />        <hr />

        <Accordion
          title={<h5 className='font-bold laptop:text-lg'>Study materials are provided?</h5>}
          answer = {<p className='pt-2 text-black laptop:text-md opacity-95'>Yes, absolutely. To complement the learning experience, we provide meticulously crafted assignments and neatly handwritten notes after every class, which can be directly printed. Moreover, I also provide the  students the access to all the modules and books from the best coaching institutes in the country. This diverse range of study material aims to enrich the learning journey and provide comprehensive coverage of the subjects.</p>}
          className='lg:text-left'
        />      

      </div>
      </section>
     
    </div>
  );
};

export default FAQ;