import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaceImages.css';
import { Grid, makeStyles, Box } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

interface PlaceImagesProps {
  place: string;
}

// Define your styles here
const useStyles = makeStyles(() => ({
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    transition: 'transform 0.2s ease-in-out',
  },
  carousel: {
    width: '300px',
    height: '400px',
    margin: 'auto',
    padding: '20px'
  },
  imageWrapper: {
    '&:hover $image': {
      transform: 'scale(1.1)',
    },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
},
}));


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export interface PlacesToVisitData {
  Place: string;
  ImageUrl: string;
}

// First, change the Prop type to expect a PlacesToVisitData object:
interface Props {
  placeData: PlacesToVisitData;
}

const PlaceImages: React.FC<Props> = ({ placeData }) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles(); // He
  // Then, use placeData.Place in your code:
  const [images, setImages] = useState<string[]>([]);
  const { Place } = placeData;

  useEffect(() => {
    const promises = Array(3).fill(0).map(() =>
      axios.get(`http://127.0.0.1:5000/generateImage?location=${Place}`, { responseType: 'arraybuffer' })
    );

    axios.all(promises).then((responses) => {
      const imageUrls = responses.map((response) =>
        'data:image/jpeg;base64,' + arrayBufferToBase64(response.data)
      );
      setImages(imageUrls);
      setLoading(false);
    }).catch((error) => { console.error("Error fetching images", error); setLoading(false); });
  }, [Place]);

  const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

  if (loading) {
    return (
      <div className={classes.loading}>
          <BounceLoader color={"#123abc"} loading={loading} size={150} />
      </div>
  );
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Carousel className={classes.carousel}>
        {images.map((img, index) => (
          <div key={index} className={classes.imageWrapper}>
            <img src={img} alt="" className={`${classes.image}`} />
          </div>
        ))}
      </Carousel>
    </Grid>
  );
};

export default PlaceImages;



