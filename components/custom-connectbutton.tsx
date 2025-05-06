import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@heroui/button';

export const CustomConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button className="flex w-full" color="primary" type="button" onPress={openConnectModal}>
                                        Select Wallet
                                    </Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button className="flex w-full" color="danger" type="button" onPress={openChainModal}>
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        type="button"
                                        onClick={openChainModal}
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 32, height: 32 }} />
                                                )}
                                            </div>
                                        )}
                                    </button>
                                    <Button className="flex w-full" color="primary" type="button" onPress={openAccountModal}>
                                        {account.displayName}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
