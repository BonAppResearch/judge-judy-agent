"use client";
import { PrivyProvider } from "@privy-io/react-auth";

export default function Provider({ children }: { children: React.ReactNode }) {
  console.log(process.env.NEXT_PUBLIC_PRIVY_APP_ID);
  return (
    <PrivyProvider
      appId="cm6q0mgup00fjttlc5t8ceudf"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          // logo: "https://your-logo-url",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
