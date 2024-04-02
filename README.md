# SnapStore - Fullstack Ecommerce Project

SnapStore is a fullstack ecommerce project developed using React, Express, Node.js, and integrated with the Razorpay payment gateway. It offers a seamless online shopping experience for users and provides a robust platform for managing products, orders, and payments.

## Features

- **User Authentication**: Secure user authentication system for managing user accounts and access control.
- **Product Management**: Efficient product management system for adding, editing, and removing products.
- **Shopping Cart**: Interactive shopping cart functionality to manage selected items before checkout.
- **Order Management**: Streamlined order management system for tracking orders and order history.
- **Razorpay Integration**: Seamless integration with Razorpay payment gateway for secure and convenient online transactions.
- **Responsive Design**: Responsive design ensures optimal user experience across devices of all sizes.

## Technologies Used

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - Context-API: State management library for managing application state.
  - HTML/CSS: Markup and styling languages for designing user interfaces.
- **Backend**:
  - Express.js: Web application framework for Node.js.
  - Node.js: JavaScript runtime for building server-side applications.
  - MongoDB: NoSQL database for storing application data.
  - Mongoose: MongoDB object modeling for Node.js.
- **Payment Gateway**:
  - Razorpay: Payment gateway for processing online payments securely.
- **Deployment**:
  - Vercel(frontend): Cloud platform for deploying and hosting web applications.
  - Render(backend): Cloud platform for deploying and hosting web applications.

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/Ajay-Dhakad/FullStack_EcommerceAPP.git
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd ./client && npm install
   cd ./server && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory and also in the `client` directory
   - Add the required environment variables such as database connection URI, Razorpay API keys, etc.

4. Run the development server:
   - For frontend:
     ```bash
     cd ./client && npm run dev
     ```
   - For backend:
     ```bash
     cd ./server && npm run start
     ```

5. Access SnapStore in your browser:
   - Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. Sign up for an account or log in if you already have one.
2. Browse through the available products and add items to your shopping cart.
3. Review your cart and proceed to checkout.
4. Complete the payment process securely using the Razorpay payment gateway.
5. Receive confirmation of your order and track its status in the order history.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to contribute to SnapStore.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Special thanks to the developers of React, Express, Node.js, and Razorpay for providing powerful tools and technologies.
- Thanks to the open-source community for their invaluable contributions to the software development ecosystem.
