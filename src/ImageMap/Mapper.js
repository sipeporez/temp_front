import React from 'react';
import ImageMapper from 'react-img-mapper';


const gg = () => {
  console.log("ㅎㄹㅇ")
}

const map = {
  name: 'my-map',
  areas: [
    {'shape': 'rect', 'coords': [790, 65, 855, 95], 'alt': '노포', preFillColor: "green"},
    {'shape': 'rect', 'coords': [770, 110, 855, 140], 'alt': '범어사', preFillColor: "green"},
    {'shape': 'rect', 'coords': [1135, 495, 1185, 545], 'alt': '명장', preFillColor: "green"},
    {'shape': 'rect', 'coords': [825, 920, 900, 975], 'alt': '서면', preFillColor: "green"},
    {'shape': 'rect', 'coords': [315, 495, 380, 545], 'alt': '덕천', preFillColor: "green"},
    {'shape': 'rect', 'coords': [1155, 1180, 1210, 1230], 'alt': '못골', preFillColor: "green"},
  ],
};

const Mapper = () => {
  const handleClick = (area) => {
    console.log('Clicked area:', area);
  };

  return (
    <div>
      <ImageMapper
        src="http://localhost:8080/images/station.png"
        map={map}
        width={1920} // Adjust based on your image size
        onClick={handleClick}
      />
    </div>
  );
};

export default Mapper;
