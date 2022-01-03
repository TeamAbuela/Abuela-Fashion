import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import styled from 'styled-components';
import ProductDetail from './ProductDetail.jsx';
import ProductDescription from './ProductDescription.jsx';
import ImageGallery from './ImageGallery.jsx';
import { TOKEN } from '../../config.js';
import axios from 'axios';
import ReviewsContext from './ReviewsContext.js';
import ReviewsStars from './ReviewsStars.jsx';
import StyleSelector from './StyleSelector.jsx';
import StylesContext from './StylesContext.js';
import Icons from './Icons.jsx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export default function Overview() {
  const { productsContext } = useContext(AppContext);
  const [products, setProducts] = productsContext;
  const { selectedProductContext } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [reviewsData, setreviewsData] = useState([]);
  const [loadingStatusReviews, setLoadingStatusReviews] = useState(false);
  const [loadingStatusStyles, setLoadingStatusStyles] = useState(false);
  const [stylesData, setstylesData] = useState([]);
  const [currentStyle, setCurrentStyle] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', {
          params: {
            product_id: selectedProduct.id,
          },
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
        setreviewsData(res.data);
        setLoadingStatusReviews(true);
      } catch (err) {
        console.error(err);
      }
    };
    getReviews();
  }, [selectedProduct]);
  useEffect(() => {
    const getStyles = async () => {
      try {
        const res = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${selectedProduct.id}/styles`, {
          params: {
            product_id: selectedProduct.id,
          },
          headers: {
            Authorization: `${TOKEN}`,
          },
        });
        setstylesData(res.data);
        console.log(res.data);
        setCurrentStyle(res.data.results[0]);
        setLoadingStatusStyles(true);
      } catch (err) {
        console.error(err);
      }
    };
    getStyles();
  }, [selectedProduct]);
  return (
    <div>
      <Grid>
        <StylesContext.Provider
          value={{
            stylesDataContent: [stylesData, setstylesData],
            currentStyleContent: [currentStyle, setCurrentStyle],
          }}
        >
          {loadingStatusStyles && <ImageGallery />}
        </StylesContext.Provider>
        <Container>
          <ReviewsContext.Provider value={{ reviewsData, setreviewsData }}>
            {loadingStatusReviews && <ReviewsStars />}
          </ReviewsContext.Provider>
          <ProductDetail product={selectedProduct} />
          <StylesContext.Provider
            value={{
              stylesDataContent: [stylesData, setstylesData],
              currentStyleContent: [currentStyle, setCurrentStyle],
            }}
          >
            {loadingStatusStyles && <StyleSelector />}
          </StylesContext.Provider>
          <Icons />
        </Container>
      </Grid>
      <ProductDescription product={selectedProduct} />
    </div>
  );
}
