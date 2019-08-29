
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '@Components/ArticleCard';
import Header from '@Components/Header';

const data = {
  title: 'Will AI take over programming',
  description: 'As the technology explodes, a growing movement of local legislation is setting ..',
  authorName: 'IgweChinonso',
  image: 'https://res.cloudinary.com/dwawmgnac/image/upload/v1564566304/samples/landscapes/beach-boat.jpg',
  likes: 20,
  dislikes: 20,
  comments: 25,
  readTime: 5,
};

const Home = () => (
  <div>
    <Header />
    <h1 data-test="homepageComponent">Home</h1>
    <Link to="/login">Click to Login</Link>
    <ArticleCard type="horizontal" data={data} />
    <ArticleCard type="vertical" data={data} />
  </div>
);

export default Home;
