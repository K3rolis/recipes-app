import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoginContext } from './components/Contexts/LoginContext';
import HomePage from './pages/Home/HomePage';
import CategoryPage from './pages/Category/CategoryPage';
import LoginPage from './pages/User/LoginPage';
import Header from './components/Header/Header';
import RecipesPage from './pages/Recipes/RecipesPage';
import SingleRecipePage from './pages/Recipes/SingleRecipePage';
import CategoriesPage from './pages/Category/CategoriesPage';
import RegisterPage from './pages/User/RegisterPage';
import RecipeEdit from './components/Forms/Recipe/RecipeEdit';
import RecipeCreate from './components/Forms/Recipe/RecipeCreate';
import EditUserPage from './pages/User/EditUserPage';
import Footer from './components/Footer/Footer';
import NotFound from './components/Errors/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/recipes/" element={<RecipesPage />} /> */}
        <Route path="/recipes/" element={<CategoryPage />} />
        <Route path="/recipes/create/" element={<RecipeCreate />} />
        <Route path="/recipes/edit/:recipeId" element={<RecipeEdit />} />

        <Route path="/recipes/category/:categoryId" element={<RecipesPage />} />
        <Route path="/recipes/category/:categoryId/recipe/:recipeId" element={<SingleRecipePage />} />

        <Route path="/categories/" element={<CategoriesPage />} />
        <Route path="/categories/create" element={<CategoriesPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/edit/:userId" element={<EditUserPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
