import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importar estilos CSS
import chuckNorrisLogo from './chuck-norris-logo.png'; // Importar la imagen de Chuck Norris

function App() {
  const initialState = {
    searchTerm: '',
    searchResults: null,
    favorites: [],
    showFavorites: false,
    error: '',
  };

  const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
  const [searchResults, setSearchResults] = useState(initialState.searchResults);
  const [favorites, setFavorites] = useState(initialState.favorites);
  const [showFavorites, setShowFavorites] = useState(initialState.showFavorites);
  const [error, setError] = useState(initialState.error);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${searchTerm}`);
      const result = response.data.result;
      setSearchResults(result.length > 0 ? result : null);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setSearchResults(null);
      setError('No se encontraron resultados para la búsqueda.');
    }
    setShowFavorites(false); // Ocultar los favoritos después de la búsqueda
  };

  const handleAddFavorite = (index) => {
    const selectedResult = searchResults[index];
    if (!favorites.some((fav) => fav.id === selectedResult.id)) {
      setFavorites([...favorites, selectedResult]);
    }
  };

  const handleViewFavorites = () => {
    setShowFavorites(!showFavorites); // Alternar la visibilidad de los favoritos
    setError('');
  };

  const handleReset = () => {
    setSearchTerm(initialState.searchTerm);
    setSearchResults(initialState.searchResults);
    setFavorites(initialState.favorites);
    setShowFavorites(initialState.showFavorites);
    setError(initialState.error);
  };

  return (
    <div className="App">
      <img src={chuckNorrisLogo} alt="Chuck Norris Logo" className="App-logo" />
      <header className="App-header">
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Ingrese término de búsqueda" />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleViewFavorites}>Ver Favoritos</button>
        <button onClick={handleReset}>Restablecer</button>
      </header>
      <div>
        {error && <p>{error}</p>}
        {searchResults && !showFavorites && (
          <div>
            <h2>Resultados de la Búsqueda</h2>
            {searchResults.map((numero, index) => (
              <div key={index}>
                <p>Numero {index + 1}</p>
                <p>Descripción: {numero.value}</p>
                <p>Fecha de creación: {numero.created_at}</p>
                {numero.categories.length > 0 && <p>Categorías: {numero.categories.join(', ')}</p>}
                <button onClick={() => handleAddFavorite(index)}>Me gusta</button>
              </div>
            ))}
          </div>
        )}
        {showFavorites && (
          <div>
            <h2>Favoritos</h2>
            {favorites.length === 0 && <p>No hay favoritos</p>}
            {favorites.map((numero, index) => (
              <div key={index}>
                <p>Numero {index + 1}</p>
                <p>Descripción: {numero.value}</p>
                <p>Fecha de creación: {numero.created_at}</p>
                {numero.categories.length > 0 && <p>Categorías: {numero.categories.join(', ')}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

