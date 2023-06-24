import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CategoryPage from './pages/Category/CategoryPage';
import LoginPage from './pages/User/LoginPage';
import RegisterPage from './pages/User/RegisterPage';
import Header from './components/Header/Header';
import RecipesPage from './pages/Recipes/RecipesPage';
import SingleRecipePage from './pages/Recipes/SingleRecipePage';

function App() {
  return (
    <div className="App">
      labas
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/recipes/" element={<RecipesPage />} /> */}
        <Route path="/recipes/" element={<CategoryPage />} />
        <Route path="/recipes/category/:categoryId" element={<RecipesPage />} />
        <Route path="/recipes/category/:categoryId/recipe/:recipeId" element={<SingleRecipePage />} />

        {/* <Route path="/categories/" element={<CategoryPage />} /> */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
