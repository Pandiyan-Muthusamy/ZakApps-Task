function loadLayout() {
  fetch("components/header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header-placeholder").innerHTML = html;
      initHamburgerMenu();
      updateCartCounter();
    })
    .catch((err) => console.error("Header load failed", err));

  fetch("components/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    .catch((err) => console.error("Footer load failed", err));
}

function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!hamburger || !mobileMenu) {
    setTimeout(initHamburgerMenu, 100);
    return;
  }

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("active");
  });
}

function renderProducts(list, containerId = "product-container", limit = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  const finalList = limit === "all" ? list : list.slice(0, limit);

  finalList.forEach((product) => {
    const card = document.createElement("div");

    card.style.cssText = `
      width: 100%;
      max-width: 260px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      overflow: hidden;
      cursor: pointer;
      transition: 0.2s;
      text-align: center;
    `;

    card.addEventListener("click", () => goToProductDetail(product.id));

    card.innerHTML = `
      <img src="${
        product.image
      }" style="width:100%; height:25vh; object-fit:fill;">
      <div style="padding:15px;">
        <h3 style="margin:0 0 10px; font-size:18px;">${product.name}</h3>
        <p style="color:#e60000; font-size:18px; font-weight:bold;">₹${product.price.toLocaleString()}</p>
        <div style="margin:8px 0; color:gold;">
          ${"⭐".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
        </div>
        <p style="color:#777;">(${product.reviews} reviews)</p>

        <button onclick="addToCart(event)" style="
          width:45%; padding:8px; background:#333; color:white; border:none; border-radius:5px; cursor:pointer;
        ">Add</button>

        <button onclick="buyNow(event)" style="
          width:45%; padding:8px; background:#e60000; color:white; border:none; border-radius:5px; cursor:pointer;
        ">Buy</button>
      </div>
    `;

    container.appendChild(card);
  });

  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.justifyContent = "center";
  container.style.gap = "20px";
}

document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.querySelector(".filter-btn");
  const filterDropdown = document.querySelector(".filter-dropdown");

  if (filterBtn && filterDropdown) {
    filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      filterDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      filterDropdown.classList.remove("show");
    });

    filterDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

function initFilterAndSort() {
  const checkboxes = document.querySelectorAll(".filter-section input");
  const sortSelect = document.getElementById("sort");

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
      filtered = filtered.filter((p) => {
        return selectedPrices.some((range) => {
          if (range === "under50k") return p.price < 50000;
          if (range === "50k-1l") return p.price >= 50000 && p.price <= 100000;
          if (range === "1l-2l") return p.price >= 100000 && p.price <= 200000;
          if (range === "above2l") return p.price > 200000;
        });
      });
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

    renderProducts(filtered, "product-container", "all");
  }

  checkboxes.forEach((cb) => cb.addEventListener("change", applyFilters));
  sortSelect.addEventListener("change", applyFilters);
}

let cartCount = parseInt(localStorage.getItem("cartCount") || 0);

function updateCartCounter() {
  const counter = document.getElementById("cart-counter");
  if (counter) counter.innerText = cartCount;
}

function addToCart(e) {
  e.stopPropagation();
  cartCount++;
  localStorage.setItem("cartCount", cartCount);
  updateCartCounter();
}

function buyNow(e) {
  e.stopPropagation();

  const popup = document.getElementById("orderPopup");
  if (!popup) return;

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  loadLayout();

  if (
    document.getElementById("product-container") &&
    window.location.pathname.includes("index.html")
  ) {
    renderProducts(products, "product-container", 4);
  }

  if (window.location.pathname.includes("products.html")) {
    renderProducts(products, "product-container", "all");
    initFilterAndSort();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const heroBtn = document.querySelector(".hero-btn");
  const heroImg = document.querySelector(".hero-left img");

  heroBtn?.addEventListener("click", () => {
    window.location.href = "products.html";
  });

  heroImg?.addEventListener("click", () => {
    window.location.href = "products.html";
  });
});
