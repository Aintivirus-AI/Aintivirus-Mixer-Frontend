# Aintivirus-Mixer-Frontend

A frontend application for a cryptocurrency mixer platform, facilitating anonymous transfers between Ethereum and Solana networks.

## Overview

This application allows users to deposit cryptocurrency on the Ethereum network and withdraw equivalent funds on the Solana network, enhancing transaction privacy through mixing mechanisms.

## Features

- **Cross-Chain Mixing**: Deposit on Ethereum and withdraw on Solana.
- **Wallet Integration**: Connect with Ethereum wallets (e.g., MetaMask) and Solana wallets (e.g., Phantom).
- **User-Friendly Interface**: Intuitive UI for selecting currencies and amounts.
- **Secure Transactions**: Utilizes smart contracts and secure APIs for handling deposits and withdrawals.
- **Note Management**: Generates and handles secret notes for withdrawal authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aintivirus-AI/Aintivirus-Mixer-Frontend.git
   cd crypto-mixer-frontend
   ```


2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```


3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```


4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `components/`: Reusable React components (e.g., ConnectButton, WalletButton).
- `pages/`: Next.js pages, including the main application interface.
- `actions/`: API interaction modules for deposit and withdrawal operations.
- `config/`: Configuration files for currencies, network settings, and wallet integrations.

## Usage

1. **Connect Wallet**: Use the provided buttons to connect your Ethereum and Solana wallets.
2. **Select Currency and Amount**: Choose the desired cryptocurrency and amount to deposit.
3. **Deposit Funds**: Confirm the deposit transaction through your Ethereum wallet.
4. **Save Note**: Download and securely store the generated `.secret` note file.
5. **Withdraw Funds**: On the Solana network, upload your `.secret` note and specify the recipient address to withdraw funds.

## Security Considerations

- Always store your `.secret` note files securely; losing them may result in loss of funds.
- Ensure that you are interacting with the correct and official application to avoid phishing attempts.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.