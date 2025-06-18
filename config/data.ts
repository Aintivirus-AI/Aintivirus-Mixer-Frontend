type CurrenciesMap = {
    ethereum: {
        [key: string]: string;
    };
    solana: {
        [key: string]: string;
    };
};

// export const currenciesMap: CurrenciesMap = {
//     // Mainnet
//     ethereum: {
//         eth: '0x0000000000000000000000000000000000000000',
//         ainti: '0x686c5961370db7f14f57f5a430e05deae64df504',
//     },
//     solana: {
//         sol: 'So11111111111111111111111111111111111111112',
//         ainti: 'BAezfVmia8UYLt4rst6PCU4dvL2i2qHzqn4wGhytpNJW',
//     },
// };

export const currenciesMap: CurrenciesMap = { // Testnet
    ethereum: {
        "eth": "0x0000000000000000000000000000000000000000",
        "ainti": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    solana: {
        "sol": "So11111111111111111111111111111111111111112",
        "ainti": "Bq2cu6o9bhdecFxD7pLbb3VMakbo9TAQgU8jUUzjCAh3",
    }
}