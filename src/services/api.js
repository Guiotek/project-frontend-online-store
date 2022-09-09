export async function getCategories() {
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await fetchCategories.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query) {
    const fetchGetProductsFromCategoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const response = await fetchGetProductsFromCategoryAndQuery.json();
    return response;
  }
  if (query) {
    const fetchGetProductsFromCategoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const response = await fetchGetProductsFromCategoryAndQuery.json();
    return response;
  }
  if (categoryId) {
    const fetchGetProductsFromCategoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const response = await fetchGetProductsFromCategoryAndQuery.json();
    return response;
  }
}

export async function getProductById(productId) {
  const fetchGetProductsFromId = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const response = await fetchGetProductsFromId.json();
  return response;
}
