import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const contributors = [
    {
      name: "Contributor 1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f5l8yq2MvvdIp9t88gx92Gtv_3i4tLxFcQ&s",
      description: "Description 1",
    },
    {
      name: "Contributor 2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f5l8yq2MvvdIp9t88gx92Gtv_3i4tLxFcQ&s",
      description: "Description 2",
    },
    {
      name: "Contributor 3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f5l8yq2MvvdIp9t88gx92Gtv_3i4tLxFcQ&s",
      description: "Description 3",
    },
    {
      name: "Contributor 4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f5l8yq2MvvdIp9t88gx92Gtv_3i4tLxFcQ&s",
      description: "Description 3",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
    "https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024",
  ];

  return (
    <div className="home">
      {/* About Section */}
      <section id="about" className="about">
        <img
          src="https://aspireandglee.com/wp-content/uploads/2020/04/cropped-img-20200417-wa0062_edited.png"
          alt="A&G"
          className="logo-img"
        />
        <h1>Welcome to Our NGO</h1>
        <h1>Aspire and Glee</h1>
      </section>

      <div className="slideshow">
        <div className="image-scroll-slideshow">
          <div className="scrolling-row">
            {images.concat(images).map((src, index) => (
              <img key={index} src={src} alt={`Slide ${index}`} />
            ))}
          </div>
        </div>
      </div>
      <div id="our-story" className="about-2">
        <div className="about-2">
          <h3>Our Story</h3>
          <p>
            What began as a humble desire to make a difference has blossomed
            into a powerful force for change. Inspired by the heartfelt prayers
            of patients at Saroj Mohan Cancer Hospital and their joy from simple
            acts of kindness, we united with a common purpose: "Let’s intend to
            spread smiles." Aspire and Glee, registered under the West Bengal
            Registration Act, 1961 (Registration No: 3/2D/24337 of 2014-15), was
            founded seven years ago with a mission to create positive impact.
            Over these years, we’ve organized 35+ events, reaching out to those
            in need:
          </p>
          <ul>
            <li> Feeding the Hungry</li>
            <li> Supporting Orphanages</li>
            <li> Providing Drinking Water to Old Age Homes</li>
            <li> Offering Free Medical Checkups and Medicines</li>
            <li> Sponsoring Education</li>
            <li> Reconstructing Homes Affected by Floods</li>
            <li> Supporting Cancer Treatment and Critical Surgeries</li>
          </ul>
        </div>
      </div>

      <div className="about-2">
        <h3>Our Events for This Year</h3>
        <p>
          1. Ration Kits and Essential Medicines for Dhaki Dadas: o Date:
          Panchami o Details: Distributing essential ration kits and medicines
          to the Dhaki dadas who bring joy to our celebrations, ensuring they
          have the support they need. 2. Festive Pujo Lunch Sponsorship: o
          Dates: Shasthi to Dashami o Details: Sponsoring festive lunches at
          seven carefully selected locations, including:  4 Old-Age Homes  3
          Orphanages These meals will spread the joy of the festival across West
          Bengal. 3. New Clothes Donation: o Details: Providing new clothes to
          the residents of old-age homes and orphanages, adding a festive touch
          to their celebrations and making them feel special. 4. Hunger Drive
          for Street Children: o Date: Shasthi/Saptami Evening o Details:
          Launching a hunger drive with the distribution of biryani packets to
          street children, ensuring they too can enjoy the festival’s delights.
        </p>
      </div>

      {/* Other sections go here with respective IDs */}

      {/* Buttons Section */}
      <section className="buttons">
        <RouterLink to="/dash">
            <button className="btn-primary mainbtn">Spread the Smile!!</button>
        </RouterLink>
        
      </section>

      {/* Contributors Section */}
      <section id="contributors" className="contributors">
        <h2>Our Contributors</h2>
        <Slider {...settings}>
          {contributors.map((contributor, index) => (
            <div key={index} className="contributor">
              <img src={contributor.image} alt={contributor.name} />
              <h3>{contributor.name}</h3>
              <p>{contributor.description}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Extra Section */}
      <section className="extra">
        <h2>Get to Know Us</h2>
        <p>
          As promised, we started off the malnutrition drive at Boso Village in
          Hooghly, at Parul Ashram from 31st January 2021 for next 3 months. We
          are providing daily nutrition for 35 children who are suffering from
          acute malnutrition. Each child, everyday will be given eggs, glucose
          biscuits, immunity health drink, sattoo to boost the nutrients in
          their body. They will be trained with basic health, hygiene practices
          and physical fitness.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Our NGO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
