"use client";
import { useState } from 'react';
import Slider from "react-slick";
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import ToggleSwitch from './ToggleSwitch '; 
import MediaCard from './MediaCard '; // Import the MediaCard component
import HorizontalSlider from './HorizontalSlider'; // Import the reusable HorizontalSlider component

export default function TrendingSection() {
  const [trendingType, setTrendingType] = useState('day');
  const { movies, loading, error } = useTrendingMovies(trendingType);

  const trendingOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' }
  ];

  if (error) return <p>{error}</p>;

  var settings = {
    dots: false,
    arrows: false,
    infinite: true, // 'Infinite' should be 'infinite'
    speed: 800,
    slidesToScroll: 1,
    autoplay: true, // 'autoPlay' should be 'autoplay'
    autoplaySpeed: 4000, // 'autoPlaySpeed' should be 'autoplaySpeed'
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <div className='container mx-auto font-custom pt-15 px-2'>
      <div className="trending-section " style={{ /*boxShadow:'inset -38px 0px 20px -15px rgba(255, 255, 254, 0.62)' */}}>
        <div className="toggle-switch flex items-center gap-4 mb-6 ">
          <h2 className="text-2xl font-bold pl-4">Trending</h2>

          {/* Toggle Switch */}
          <ToggleSwitch
            options={trendingOptions}
            selectedOption={trendingType}
            onChange={setTrendingType}
          />
        </div>

        {/* Loading State */}
        {loading ? <p>Loading...</p> : (
          <HorizontalSlider>
            <Slider {...settings}>
            {movies.map((movie) => (
              <MediaCard
                key={movie.id}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                voteAverage={movie.vote_average}
                releaseDate={movie.release_date}
                link={`/movie/${movie.id}`}  // Dynamic link for each movie
              />
            ))}
            </Slider>
          </HorizontalSlider>
        )}
      </div>
    </div>
  );
}
