import React from 'react'

function Services({servicesData}) {
  return servicesData&&(
    <div className="whychooseus">
    <p>Why Choose SnapStore!</p>
    <h1>THE JOY OF SHOPPING AT ITS BEST</h1>
    <div className="services">
      {servicesData.map((service, index) => (
        <div key={index} className="service">
          <img src={service.iconSrc} alt="ServiceImage" />
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Services
