function goToProductDetail(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

function initFilterAndSort() {
  const checkboxes = document.querySelectorAll(".filter-section input");
  const sortSelect = document.getElementById("sort");

  if (!checkboxes.length || !sortSelect) return;

  function applyFilters() {
    let filtered = [...products];

    const selectedCategories = [...checkboxes]
      .filter((cb) => cb.checked && cb.dataset.type === "category")
      .map((cb) => cb.value);

    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    const selectedPrices = [...checkboxes]
      .filter((cb) => cb.checked && cb.dataset.type === "price")
      .map((cb) => cb.value);

    if (selectedPrices.length) {
      filtered = filtered.filter((p) =>
        selectedPrices.some((range) => {
          if (range === "low") return p.price < 100000;
          if (range === "mid") return p.price >= 100000 && p.price <= 150000;
          if (range === "high") return p.price > 150000;
        })
      );
    }

    switch (sortSelect.value) {
      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    renderProducts(filtered);
  }

  checkboxes.forEach((cb) => cb.addEventListener("change", applyFilters));
  sortSelect.addEventListener("change", applyFilters);
}
