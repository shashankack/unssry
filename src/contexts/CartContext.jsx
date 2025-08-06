import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createCart, addToCart, removeFromCart, updateCartItemQuantity, getCart } from '../utils/shopify';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  SET_ERROR: 'SET_ERROR',
  SET_CART_OPEN: 'SET_CART_OPEN',
  CLEAR_CART: 'CLEAR_CART',
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case CART_ACTIONS.SET_CART:
      return { 
        ...state, 
        cart: action.payload, 
        loading: false,
        error: null 
      };
    case CART_ACTIONS.SET_ERROR:
      return { 
        ...state, 
        error: action.payload, 
        loading: false 
      };
    case CART_ACTIONS.SET_CART_OPEN:
      return { ...state, isCartOpen: action.payload };
    case CART_ACTIONS.CLEAR_CART:
      return { 
        ...state, 
        cart: null, 
        error: null 
      };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  cart: null,
  loading: false,
  error: null,
  isCartOpen: false,
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize cart on app load
  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      // Check if cart ID exists in localStorage
      const existingCartId = localStorage.getItem('shopify_cart_id');
      
      let cart;
      if (existingCartId) {
        try {
          // Try to fetch existing cart
          cart = await getCart(existingCartId);
          if (!cart) {
            // If cart doesn't exist, create new one
            cart = await createCart();
            localStorage.setItem('shopify_cart_id', cart.id);
          }
        } catch (error) {
          // If error fetching existing cart, create new one
          cart = await createCart();
          localStorage.setItem('shopify_cart_id', cart.id);
        }
      } else {
        // Create new cart
        cart = await createCart();
        localStorage.setItem('shopify_cart_id', cart.id);
      }
      
      dispatch({ type: CART_ACTIONS.SET_CART, payload: cart });
    } catch (error) {
      console.error('Error initializing cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const addItemToCart = async (variantId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      if (!state.cart?.id) {
        throw new Error('Cart not initialized');
      }
      
      const updatedCart = await addToCart(state.cart.id, variantId, quantity);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: updatedCart });
      
      // Show cart after adding item
      dispatch({ type: CART_ACTIONS.SET_CART_OPEN, payload: true });
      
      return updatedCart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const removeItemFromCart = async (lineItemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      if (!state.cart?.id) {
        throw new Error('Cart not initialized');
      }
      
      const updatedCart = await removeFromCart(state.cart.id, lineItemId);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: updatedCart });
      
      return updatedCart;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateItemQuantity = async (lineItemId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      if (!state.cart?.id) {
        throw new Error('Cart not initialized');
      }
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return await removeItemFromCart(lineItemId);
      }
      
      const updatedCart = await updateCartItemQuantity(state.cart.id, lineItemId, quantity);
      dispatch({ type: CART_ACTIONS.SET_CART, payload: updatedCart });
      
      return updatedCart;
    } catch (error) {
      console.error('Error updating item quantity:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const openCart = () => {
    dispatch({ type: CART_ACTIONS.SET_CART_OPEN, payload: true });
  };

  const closeCart = () => {
    dispatch({ type: CART_ACTIONS.SET_CART_OPEN, payload: false });
  };

  const clearCart = () => {
    localStorage.removeItem('shopify_cart_id');
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    initializeCart();
  };

  // Calculate cart totals
  const cartItemCount = state.cart?.lines?.edges?.reduce((total, edge) => {
    return total + edge.node.quantity;
  }, 0) || 0;

  const cartTotal = state.cart?.cost?.totalAmount?.amount || '0.00';
  const cartCurrency = state.cart?.cost?.totalAmount?.currencyCode || 'USD';

  const value = {
    // State
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    isCartOpen: state.isCartOpen,
    cartItemCount,
    cartTotal,
    cartCurrency,
    
    // Actions
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    openCart,
    closeCart,
    clearCart,
    initializeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
