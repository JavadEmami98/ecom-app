import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import themeReducer from "./themeSlice";

const loadAuthState = () => {
  try {
    const savedAuth = localStorage.getItem("auth");
    const parsedAuth = savedAuth ? JSON.parse(savedAuth) : undefined;

    if (!parsedAuth) {
      return undefined;
    }

    const registeredUsers = parsedAuth.registeredUsers || [];
    const hasCurrentUser = registeredUsers.some(
      (user) => user.email === parsedAuth.user?.email,
    );

    return {
      isAuthenticated: false,
      user: null,
      ...parsedAuth,
      registeredUsers:
        parsedAuth.user?.email && !hasCurrentUser
          ? [...registeredUsers, { email: parsedAuth.user.email }]
          : registeredUsers,
    };
  } catch {
    return undefined;
  }
};

const saveAuthState = (authState) => {
  try {
    localStorage.setItem("auth", JSON.stringify(authState));
  } catch {
    // localStorage can be unavailable in some browser modes.
  }
};

const loadCartState = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : undefined;

    return parsedCart
      ? {
          items: parsedCart.items || [],
        }
      : undefined;
  } catch {
    return undefined;
  }
};

const saveCartState = (cartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartState));
  } catch {
    // localStorage can be unavailable in some browser modes.
  }
};

const persistedAuthState = loadAuthState();
const persistedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
  preloadedState: {
    ...(persistedAuthState ? { auth: persistedAuthState } : {}),
    ...(persistedCartState ? { cart: persistedCartState } : {}),
  },
});

store.subscribe(() => {
  saveAuthState(store.getState().auth);
  saveCartState(store.getState().cart);
});
