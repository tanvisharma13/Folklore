import React from 'react';
import teamImage from '../assets/team.jpg';
import teamImage2 from '../assets/team2.jpg';
import teamImage3 from '../assets/team3.jpg';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-6xl font-bold mb-10 text-center text-[#475226]">About FOLKLORE</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-[#475226]">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          At FOLKLORE, we aim to revolutionize the way people experience books in the digital age. 
          We believe that books are more than just pages — they are vessels of stories, knowledge, 
          emotions, and imagination. Our goal is to create a seamless and immersive online bookstore 
          experience that bridges the gap between technology and storytelling. By fostering a space 
          that celebrates creativity, community, and curiosity, we hope to connect readers with books 
          that resonate on a deeper level. Whether you're a casual reader, a passionate bibliophile, 
          or someone rediscovering the magic of reading, FOLKLORE is designed to feel like home. 
          We envision a platform where every visit brings new discoveries, meaningful connections, 
          and a sense of belonging within a growing community of book lovers.
        </p>
      </section>
<br></br>
<br></br>
      <section className="mb-16">
        <h2 className="text-6xl font-semibold mb-8 text-[#475226] text-center">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {[
            { src: teamImage, name: 'Tanvi Sharma' },
            { src: teamImage3, name: 'Utsav Pahwa' },
            { src: teamImage2, name: 'Muskan Saluja' },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={member.src}
                alt={member.name}
                className="w-72 h-72 rounded-full object-cover mb-4 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
              />
              <p className="text-xl font-semibold text-center">{member.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-[#475226]">Fun Facts</h2>
        <ul className="list-disc pl-6 space-y-3 text-lg">
          <li>We brainstorm book ideas over late-night chai 🍵</li>
          <li>Our first design was drawn on a napkin ✍️</li>
          <li>We read a book a week as a team challenge 📚</li>
          <li>Every team member has a favorite genre – and defends it fiercely! 💥</li>
          <li>Our Slack channel has a dedicated #book-memes thread 😂</li>
          <li>The name “FLOKLORE” was voted on after 37 different ideas 🗳️</li>
          <li>One of our devs once fixed a bug while hiking — true story 🥾💻</li>
          <li>Our playlist includes lo-fi, Taylor Swift, and ambient bookstore sounds 🎶</li>
          <li>We host monthly “Blind Date with a Book” exchanges 💌📖</li>
          <li>We believe coffee and code go hand-in-hand ☕💻</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
