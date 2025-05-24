import React from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../components/home/Hero';
import BuiltToLast from '../components/home/BuiltToLast';
import MainFeatures from '../components/home/MainFeatures';
import ElevateWorkout from '../components/home/ElevateWorkout';
import UltimateCompanion from '../components/home/UltimateCompanion';
import AdvancedFunctionalities from '../components/home/AdvancedFunctionalities';
import ShowroomBanner from '../components/home/ShowRoomBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import TopRatedProducts from '../components/products/TopRatedProduct';

function HomePage() {
  return (
    <div>
      <Hero />
      <Container>
        <MainFeatures />
        <BuiltToLast />
        <TopRatedProducts/>
        <ElevateWorkout />
        <UltimateCompanion />
        <AdvancedFunctionalities />
        <ShowroomBanner/>
        <FeaturesSection/>
      </Container>
    </div>
  );
}

export default HomePage;