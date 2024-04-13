import '../App.css'
import LOGO from '../components/Logo'
import LANDINGHeader from '../components/LandingHeader'
import FOOTER from '../components/Footer'
import CATEGORIES from '../components/Category'
import SHOWALLPRODUCTSExtra  from '../components/landingPageShowProduct';
import  { useState } from 'react';

function  Lp() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchResults = (results) => {
    setSearchResults(results);
};
  return (
    <div>
      <LOGO/>
      <LANDINGHeader onSearchResults={handleSearchResults}/>
      < CATEGORIES/>
      <SHOWALLPRODUCTSExtra  products={searchResults} />
      <FOOTER />
      
    </div>
  )
}

export default  Lp
