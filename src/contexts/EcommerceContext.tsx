import { createContext, useContext, useState, type ReactNode } from "react";

// Types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: "Completed" | "Processing" | "Shipped" | "Pending" | "Cancelled";
  items: number;
}

interface EcommerceContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  createOrder: (customerName: string, total: number) => void;
  addProduct: (product: Omit<Product, "id" | "status">) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(
  undefined
);

// Initial Data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.0,
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 450.0,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.0,
    stock: 120,
    status: "In Stock",
  },
  {
    id: 4,
    name: "4K Monitor 27inch",
    category: "Electronics",
    price: 399.0,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "USB-C Docking Station",
    category: "Electronics",
    price: 89.0,
    stock: 0,
    status: "Out of Stock",
  },
];

const initialOrders: Order[] = [
  {
    id: "#ORD-7352",
    customer: "Alex Thompson",
    date: "Oct 24, 2023",
    total: "$299.00",
    status: "Completed",
    items: 2,
  },
  {
    id: "#ORD-7351",
    customer: "Sarah Miller",
    date: "Oct 24, 2023",
    total: "$450.00",
    status: "Processing",
    items: 1,
  },
  {
    id: "#ORD-7350",
    customer: "James Wilson",
    date: "Oct 23, 2023",
    total: "$129.00",
    status: "Shipped",
    items: 3,
  },
  {
    id: "#ORD-7349",
    customer: "Emily Davis",
    date: "Oct 23, 2023",
    total: "$399.00",
    status: "Completed",
    items: 1,
  },
  {
    id: "#ORD-7348",
    customer: "Michael Brown",
    date: "Oct 22, 2023",
    total: "$89.00",
    status: "Pending",
    items: 4,
  },
  {
    id: "#ORD-7347",
    customer: "Lisa Anderson",
    date: "Oct 22, 2023",
    total: "$599.00",
    status: "Cancelled",
    items: 1,
  },
];

export function EcommerceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addProduct = (newProductData: Omit<Product, "id" | "status">) => {
    const stock = newProductData.stock;
    let status = "In Stock";
    if (stock === 0) status = "Out of Stock";
    else if (stock < 10) status = "Low Stock";

    const product: Product = {
      id: products.length + 1,
      ...newProductData,
      status,
    };
    setProducts([product, ...products]);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (customerName: string, total: number) => {
    const newOrder: Order = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerName,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      total: `$${total.toFixed(2)}`,
      status: "Processing",
      items: cart.reduce((acc, item) => acc + item.quantity, 0),
    };

    setOrders([newOrder, ...orders]);
    clearCart();
  };

  return (
    <EcommerceContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        createOrder,
        addProduct,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (context === undefined) {
    throw new Error("useEcommerce must be used within an EcommerceProvider");
  }
  return context;
}
