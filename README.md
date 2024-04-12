# MarketMate E-Commerce App

MarketMate is an e-commerce web application that allows users to browse, search, and purchase products online. This README provides an overview of the application's features, installation instructions, and usage guidelines.

## Features

MarketMate offers the following features:

- **Product Listings:** Browse a wide range of products across various categories.
- **Search:** Search for specific products by name or category.
- **Product Details:** View detailed information about each product, including images, descriptions, and prices.
- **User Authentication:** Register an account or log in to an existing account to access personalized features such as order history and saved items.
- **Add to Cart:** Add products to a shopping cart for later purchase.
- **Checkout:** Complete the purchase by providing shipping and payment information.
- **Order Tracking:** Track the status of orders from placement to delivery.

## Technologies Used

MarketMate is built using the following technologies:

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)


## Installation

To run MarketMate locally, follow these steps:

1. Clone the repository: `https://github.com/Couragenwanduka/e-commerce.git`
2. Navigate to the project directory: `cd marketmate`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables:
     - `MONGODB_URI`: URI for your MongoDB database.
     - `JWT_SECRET`: Secret key for JWT authentication.
5. Start the backend server: `npm start`
6. Navigate to the frontend directory: `cd Frontend`
7. Start the frontend development server: `npm start`

## Usage

 Here are some usage guidelines:

- **Registration:** If you're a new user, click on the "Sign Up" button to create an account.
- **Login:** If you already have an account, click on the "Login" button and enter your credentials.
- **Browsing:** Explore products by navigating through different categories or using the search bar.
- **Adding to Cart:** Click on the "Add to Cart" button to add products to your shopping cart.
- **Checkout:** Proceed to checkout by clicking on the shopping cart icon and following the prompts to provide shipping and payment information.
- **Order Tracking:** Once your order is placed, you can track its status by visiting the "Order History" page.

## Contributing

Contributions to MarketMate are welcome! If you'd like to contribute new features, bug fixes, or improvements, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name: `git checkout -b feature-new-feature` or `git checkout -b bug-fix`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push your changes to your fork: `git push origin feature-new-feature`.
5. Submit a pull request to the `main` branch of the original repository.

