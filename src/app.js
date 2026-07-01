document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "arabica beans", img: "1.jpg", price: 199000 },
      { id: 2, name: "green robusta beans", img: "2.jpg", price: 159000 },
      { id: 3, name: "toraja beans", img: "3.jpg", price: 130000 },
      { id: 4, name: "bali kintamani beans", img: "4.jpg", price: 169000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada/cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang nya udah ada, cek barang beda apa sama yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada tambahkan quantity dan subtotal nya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
  const cartItem = this.items.find((item) => item.id === id);

  if (cartItem.quantity > 1) {
    this.items = this.items.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        item.quantity--;
        item.total = item.price * item.quantity;
        this.quantity--;
        this.total -= item.price;
        return item;
      }
    });
  } else if (cartItem.quantity === 1) {
    this.items = this.items.filter((item) => item.id !== id);
    this.quantity--;
    this.total -= cartItem.price;
  }
},
  });
});

// konversi mata uang
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    // minimumFractionDigits: 0,
  }).format(number);
};
