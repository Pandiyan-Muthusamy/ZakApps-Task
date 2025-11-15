document.addEventListener("DOMContentLoaded", () => {
  loadLayout();

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = products.find((p) => p.id === id);

  const container = document.getElementById("product-detail-container");
  if (!product || !container) return;

  container.innerHTML = `
    <div style="
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    ">
      
      <div style="
        flex: 1 1 400px;
        text-align: center;
      ">
        <img src="${product.image}" alt="${product.name}" style="
          width: 100%;
          height: 40vh;
          max-width: 450px;
          border-radius: 10px;
          object-fit: fill;
        ">
      </div>

      <div style="flex: 1 1 400px;">
        
        <h2 style="
          font-size: 28px;
          margin-bottom: 10px;
          font-weight: 700;
          text-align: left;
        ">
          ${product.name}
        </h2>

        <p style="
          font-size: 24px;
          color: #e60000;
          font-weight: bold;
          margin-bottom: 10px;
        ">
          ₹${product.price.toLocaleString()}
        </p>

        <div style="
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        ">
          <span style="color: gold; font-size: 20px;">
            ${"⭐".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
          </span>
          <span style="color:#555;">
            (${product.reviews} reviews)
          </span>
        </div>

        <p style="
          font-size: 16px;
          line-height: 1.5;
          color: #444;
          margin-bottom: 20px;
        ">
          ${
            product.description ||
            "Experience premium performance, stunning design, and unmatched riding comfort."
          }
        </p>

        <div style="
          display: flex;
          gap: 15px;
          margin-top: 25px;
        ">
          <button onclick="addToCart(event)" style="
            flex: 1;
            padding: 12px;
            border: none;
            background: #333;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          ">Add to Cart</button>

          <button onclick="buyNow(event)" style="
            flex: 1;
            padding: 12px;
            border: none;
            background: #e60000;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          ">Buy Now</button>
        </div>

      </div>
    </div>

    <style>
      @media (max-width: 768px) {
        #product-detail-container {
          padding: 10px;
        }
      }
    </style>
  `;
});
