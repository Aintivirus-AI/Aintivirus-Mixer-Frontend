import { ConnectButton } from '@rainbow-me/rainbowkit';

import Button from './button';

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
                  <Button className="flex w-full" variantColor="blue" onClick={openConnectModal}>
                    Select Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button className="flex w-full" color="danger" type="button" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex flex-col gap-3 rounded-[13px] border border-black-80 bg-black-100 px-3 py-3 sm:px-4 sm:py-[14px] lg:px-[21px]">
                  <p className="text-sm font-medium text-white/70">Select wallet</p>
                  <div>
                    <div className="flex flex-col items-center gap-3 lg:flex-row">
                      <button
                        className="flex h-[45px] w-full flex-1 items-center gap-1 rounded-[13px] bg-black-80 px-3 py-[10px] text-start text-sm font-medium tracking-[-0.56px] text-white/70 lg:px-[21px]"
                        onClick={openAccountModal}
                      >
                        Wallet Connected: {account.displayName}
                      </button>
                      <Button
                        className="w-full lg:w-auto"
                        variantColor="blue"
                        variants="outline"
                        onClick={openChainModal}
                      >
                        Switch Networks
                      </Button>
                    </div>
                    {/* <button
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
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 32, height: 32 }}
                            />
                          )}
                        </div>
                      )}
                    </button>
                    <Button className="flex w-full" variantColor="blue" type="button" onClick={openAccountModal}>
                      {account.displayName}
                    </Button> */}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
