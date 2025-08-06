// Use Vite environment variables
const SHOPIFY_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "m0di8r-eh.myshopify.com";
const STOREFRONT_ACCESS_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ||
  "02049f00a15db55e3c8d566d473664e7";
const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  // Check if configuration is properly set
  if (!SHOPIFY_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    throw new Error(
      "Shopify configuration is missing. Please check your environment variables."
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message || "GraphQL error");
  }

  return json.data;
}

export async function fetchShopifyProducts(limit = 20) {
  const query = `
    {
      products(first: ${limit}) {
        edges {
          node {
            id
            title
            productType
            tags
            descriptionHtml
            images(first: 10) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 4) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  weight
                  weightUnit
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query);
  return data.products.edges.map((edge) => edge.node);
}

export async function fetchCollection(collectionTitle, limit = 50) {
  const query = `
    query GetCollection($title: String!, $limit: Int!) {
      collections(first: 250, query: $title) {
        edges {
          node {
            id
            title
            description
            handle
            image {
              url
            }
            products(first: $limit) {
              edges {
                node {
                  id
                  title
                  productType
                  tags
                  descriptionHtml
                  images(first: 10) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  variants(first: 4) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                        quantityAvailable
                        price {
                          amount
                          currencyCode
                        }
                        weight
                        weightUnit
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    title: `title:${collectionTitle}`,
    limit: limit,
  };

  const data = await shopifyFetch(query, variables);

  if (!data.collections || data.collections.edges.length === 0) {
    throw new Error(`Collection with title "${collectionTitle}" not found`);
  }

  // Find exact match (case-insensitive)
  const exactMatch = data.collections.edges.find(
    (edge) => edge.node.title.toLowerCase() === collectionTitle.toLowerCase()
  );

  const collection = exactMatch
    ? exactMatch.node
    : data.collections.edges[0].node;

  return {
    collection: {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      handle: collection.handle,
      image: collection.image?.url || null,
    },
    products: collection.products.edges.map((edge) => edge.node),
  };
}

export async function fetchAllCollections(limit = 50) {
  const query = `
    query GetAllCollections($limit: Int!) {
      collections(first: $limit) {
        edges {
          node {
            id
            title
            description
            handle
            image {
              url
            }
          }
        }
      }
    }
  `;

  const variables = { limit };
  const data = await shopifyFetch(query, variables);

  const collections = data.collections.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    description: edge.node.description,
    handle: edge.node.handle,
    image: edge.node.image?.url || null,
  }));

  return collections;
}

export async function createCart() {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                    }
                    product {
                      title
                      handle
                    }
                  }
                }
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch(query);

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

export async function addToCart(cartId, variantId, quantity) {
  const query = `
  mutation AddToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
    cartLinesAdd(cartId: $cartId, lines: [
      {
        quantity: $quantity,
        merchandiseId: $variantId
      }
    ]) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

  const variables = { cartId, variantId, quantity };
  const data = await shopifyFetch(query, variables);

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId, lineItemId) {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                    }
                    product {
                      title
                      handle
                    }
                  }
                }
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lineIds: [lineItemId],
  };

  const data = await shopifyFetch(query, variables);

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

export async function updateCartItemQuantity(cartId, lineItemId, quantity) {
  const query = `
    mutation UpdateCartItemQuantity($cartId: ID!, $lineId: ID!, $quantity: Int!) {
      cartLinesUpdate(cartId: $cartId, lines: [
        {
          id: $lineId,
          quantity: $quantity
        }
      ]) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                    }
                    product {
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { cartId, lineId: lineItemId, quantity };
  const data = await shopifyFetch(query, variables);

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function getCart(cartId) {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              cost {
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = { cartId };
  const data = await shopifyFetch(query, variables);
  return data.cart;
}

export async function searchProducts(keyword) {
  if (!keyword || keyword.trim().length === 0) {
    return [];
  }

  try {
    // First try a global product search using Shopify's search API
    const globalSearchQuery = `
      query SearchProducts($query: String!) {
        products(first: 20, query: $query) {
          edges {
            node {
              id
              title
              productType
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                    quantityAvailable
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Try different search patterns
    const searchQueries = [
      keyword.trim(),
      `title:*${keyword.trim()}*`,
      `product_type:*${keyword.trim()}*`,
      `tag:*${keyword.trim()}*`,
    ];

    let allResults = [];

    for (const searchQuery of searchQueries) {
      try {
        const variables = { query: searchQuery };
        const data = await shopifyFetch(globalSearchQuery, variables);

        if (data.products && data.products.edges.length > 0) {
          const products = data.products.edges.map((edge) => edge.node);

          allResults = allResults.concat(products);
        }
      } catch (queryError) {
        // Continue with next query pattern
      }
    }

    // Remove duplicates based on product ID
    const uniqueProducts = allResults.reduce((acc, product) => {
      if (!acc.find((p) => p.id === product.id)) {
        acc.push(product);
      }
      return acc;
    }, []);

    // If global search didn't work, try a simple fetch and filter approach
    if (uniqueProducts.length === 0) {
      const allProducts = await fetchShopifyProducts(50);

      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()) ||
          product.productType.toLowerCase().includes(keyword.toLowerCase()) ||
          (product.tags &&
            product.tags.some((tag) =>
              tag.toLowerCase().includes(keyword.toLowerCase())
            ))
      );

      uniqueProducts.push(...filteredProducts);
    }

    // Additional client-side filtering to ensure relevance
    const filteredResults = uniqueProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.productType.toLowerCase().includes(keyword.toLowerCase())
    );

    // Format results
    const results = filteredResults.slice(0, 10).map((product) => {
      const firstVariant =
        product.variants?.edges?.[0]?.node || product.variants?.[0];
      const price = firstVariant?.price;
      const compareAtPrice = firstVariant?.compareAtPrice;
      const quantityAvailable = firstVariant?.quantityAvailable || 0;
      const availableForSale = firstVariant?.availableForSale || false;

      return {
        id: product.id.split("/").pop(),
        title: product.title,
        productType: product.productType,
        handle: product.handle,
        image:
          product.images?.edges?.[0]?.node?.url ||
          product.images?.[0]?.url ||
          null,
        price: price
          ? {
              amount: parseFloat(price.amount),
              currencyCode: price.currencyCode,
            }
          : null,
        compareAtPrice: compareAtPrice
          ? {
              amount: parseFloat(compareAtPrice.amount),
              currencyCode: compareAtPrice.currencyCode,
            }
          : null,
        variantId: firstVariant?.id,
        quantityAvailable,
        availableForSale,
      };
    });

    return results;
  } catch (error) {
    // Fallback: try simple product fetch and filter
    try {
      const allProducts = await fetchShopifyProducts(50);
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()) ||
          product.productType.toLowerCase().includes(keyword.toLowerCase())
      );

      const results = filteredProducts.slice(0, 10).map((product) => {
        const firstVariant =
          product.variants?.edges?.[0]?.node || product.variants?.[0];
        const price = firstVariant?.price;
        const compareAtPrice = firstVariant?.compareAtPrice;
        const quantityAvailable = firstVariant?.quantityAvailable || 0;
        const availableForSale = firstVariant?.availableForSale || false;

        return {
          id: product.id.split("/").pop(),
          title: product.title,
          productType: product.productType,
          image: product.images?.edges?.[0]?.node?.url || null,
          price: price
            ? {
                amount: parseFloat(price.amount),
                currencyCode: price.currencyCode,
              }
            : null,
          compareAtPrice: compareAtPrice
            ? {
                amount: parseFloat(compareAtPrice.amount),
                currencyCode: compareAtPrice.currencyCode,
              }
            : null,
          variantId: firstVariant?.id,
          quantityAvailable,
          availableForSale,
        };
      });

      return results;
    } catch (fallbackError) {
      return [];
    }
  }
}

export async function fetchProductByTitle(productTitle) {
  const query = `
    query GetProductByTitle($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            productType
            tags
            descriptionHtml
            description
            images(first: 20) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  weight
                  weightUnit
                  image {
                    url
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
          }
        }
      }
    }
  `;

  const variables = { query: `title:${productTitle}` };
  const data = await shopifyFetch(query, variables);

  if (!data.products || data.products.edges.length === 0) {
    throw new Error(`Product with title "${productTitle}" not found`);
  }

  // Find exact match (case-insensitive)
  const exactMatch = data.products.edges.find(
    (edge) => edge.node.title.toLowerCase() === productTitle.toLowerCase()
  );

  const product = exactMatch ? exactMatch.node : data.products.edges[0].node;

  return {
    id: product.id,
    title: product.title,
    productType: product.productType,
    tags: product.tags,
    descriptionHtml: product.descriptionHtml,
    description: product.description,
    images: product.images.edges.map((edge) => edge.node),
    variants: product.variants.edges.map((edge) => edge.node),
    options: product.options,
  };
}
