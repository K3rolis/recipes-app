import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CategoryPage from './pages/Category/CategoryPage';
import LoginPage from './pages/User/LoginPage';
import Header from './components/Header/Header';
import RecipesPage from './pages/Recipes/RecipesPage';
import SingleRecipePage from './pages/Recipes/SingleRecipePage';
import CategoriesPage from './pages/Category/CategoriesPage';
import RecipeForm from './components/Forms/Recipe/RecipeForm';
import RegisterPage from './pages/User/RegisterPage';
import { LoginContext } from './components/Contexts/LoginContext';

function App() {
  const [authUser, setAuthUser] = useState<any | null>({
    name: 'labas',
    id: 1,
  });
  const [isLoggedIn, setIsLoggedIn] = useState<any | null>(false);

  return (
    <div className="App">
      <LoginContext.Provider value={{ authUser, setAuthUser, isLoggedIn, setIsLoggedIn }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/recipes/" element={<RecipesPage />} /> */}
          <Route path="/recipes/" element={<CategoryPage />} />
          <Route path="/recipes/create/" element={<RecipeForm />} />

          <Route path="/recipes/category/:categoryId" element={<RecipesPage />} />
          <Route path="/recipes/category/:categoryId/recipe/:recipeId" element={<SingleRecipePage />} />

          <Route path="/categories/" element={<CategoriesPage />} />
          <Route path="/categories/create" element={<CategoriesPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
