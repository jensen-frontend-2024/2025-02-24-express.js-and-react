import { useEffect, useState } from 'react';
import { mapRawCocktailData } from '../utilities';
import { RandomCocktail } from '../components/RandomCocktail';

export function RandomCocktailView() {
  const [randomCocktail, setRandomCocktail] = useState(null);

  const fetchRandomCocktailAsync = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const rawData = await response.json();
    const data = mapRawCocktailData(rawData.drinks.at(0));
    return data;
  };

  // Empty dependency array makes this useEffect run on first render only.
  useEffect(() => {
    fetchRandomCocktailAsync().then((data) => setRandomCocktail(data));
  }, []);

  // Early return if randomCocktail is null
  if (randomCocktail === null) {
    return (
      <main className="random-cocktail-view">
        <div className="loader"></div>
      </main>
    );
  }

  return (
    <main className="random-cocktail-view">
      <RandomCocktail cocktail={randomCocktail} />
    </main>
  );
}
