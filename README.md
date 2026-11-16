# VAL | Minimal Fashion E-Commerce

VAL is a minimal fashion e-commerce application with an editorial-inspired design. Users can browse products across different categories, view product details, manage their shopping bag, and receive product recommendations through an AI-powered shopping assistant.

The application combines a responsive shopping experience with product discovery, cart management, authentication, and AI-assisted shopping.

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: React Context API
- AI Integration: Google Gemini API
- Testing: Jest and React Testing Library
- Testing Utilities: @testing-library/react, @testing-library/jest-dom
- Icons: Lucide React

## Features

### Product Browsing

- Browse the complete product collection.
- Filter products by category.
- Sort products by price, from low to high or high to low.
- View product images, names, categories, and prices.
- Navigate between the product listing and individual product pages.

Available categories:

- Women
- Men
- Kids
- Home
- Beauty

### Product Details

Each product has an individual detail page displaying:

- Product image
- Product name
- Product description
- Product price
- Add to Bag functionality

### Shopping Bag

- Add products to the shopping bag.
- Increase product quantities when adding an existing item.
- Decrease product quantities.
- Remove products when their quantity reaches zero.
- View the total number of items in the header.
- Keep shopping bag data persistent using localStorage.
- View an empty-state message when the bag contains no products.

### Order Summary

The shopping bag includes a live order summary displaying:

- Subtotal
- Discount
- Total amount

The order summary updates automatically when products are added, removed, or their quantities change.

A 15% discount is calculated based on the subtotal.

### Authentication

- Sign-in functionality.
- Shopping access is restricted to signed-in users.
- Welcome message displayed for signed-in users.
- Sign-out functionality.
- Shopping bag data is cleared when the user signs out.

### VAL Stylist | AI Shopping Assistant

VAL Stylist is an AI-powered shopping assistant integrated into the application using the Google Gemini API.

It helps users discover products from the VAL collection through natural-language conversations.

Features include:

- Understand shopping requests written in natural language.
- Recommend products from the available collection.
- Respond to product and budget-related questions.
- Extract and maintain shopping preferences during conversations.
- Display recommended products with product details.
- Add recommended products directly to the shopping bag.
- Save conversation history locally.
- Clear the conversation history.

The assistant uses the application's product data as its source for product recommendations.

### Navigation and Design

- Responsive navigation across the application.
- Category-based product navigation.
- Price sorting controls.
- VAL wordmark and shopping bag link in the header.
- Shopping bag item count.
- Editorial-inspired layouts