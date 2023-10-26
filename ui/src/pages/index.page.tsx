import { BaseActionBox } from "@/components/HomeComponents/BasicActionBox.tsx";
import { MinaSendBox } from "@/components/HomeComponents/SendBox.tsx";
import { SignFieldsBox } from "@/components/HomeComponents/SignFieldsBox.tsx";
import { SignMessageBox } from "@/components/HomeComponents/SignMessageBox.tsx";
import { SignTransactionBox } from "@/components/HomeComponents/SignTransactionBox";
import { SignTypeMessageBox } from "@/components/HomeComponents/SignTypeMessageBox";
import { StakingBox } from "@/components/HomeComponents/StakingBox.tsx";
import { SwitchChainBox } from "@/components/HomeComponents/SwitchChainBox";
import { InfoRow, InfoType } from "@/components/InfoRow.tsx";
import {
  Container,
  PageContainer,
  StyledPageTitle,
  StyledRowSection,
  StyledRowTitle,
  StyledStatusRowWrapper,
} from "@/styles/HomeStyles.ts";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("");

  const initNetwork = useCallback(async () => {
    const network = await (window as any)?.mina
      ?.requestNetwork()
      .catch((err: any) => err);
    setCurrentNetwork(network);
  }, []);

  useEffect(() => {
    /** account change listener */
    (window as any)?.mina?.on("accountsChanged", async (accounts: string[]) => {
      console.log("accountsChanged", accounts);
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        const data = await (window as any)?.mina
          .requestAccounts()
          .catch((err: any) => err);
        if (Array.isArray(data) && data.length > 0) {
          setCurrentAccount(data[0]);
        }
      }
    });
    (window as any)?.mina?.on("chainChanged", async (chain: string) => {
      console.log("chainChanged");
      setCurrentNetwork(chain);
    });
      (window as any)?.mina?.on("connect", async () => {
        console.log("auro connect");
      });
    
    (window as any)?.mina?.on("disconnect", async () => {
      console.log("auro disconnect");
    });

    initNetwork();
  }, []);

  const initAccount = useCallback(async () => {
    const data = await (window as any)?.mina
      ?.requestAccounts()
      .catch((err: any) => err);
    if (Array.isArray(data) && data.length > 0) {
      setCurrentAccount(data[0]);
    }
  }, []);
  useEffect(() => {
    initAccount();
  }, []);

  return (
    <PageContainer>
      <Head>
        <link rel="shortcut icon" href="/imgs/auro.png" />
        <title>AURO E2E Test zkApp</title>
        <meta
          name="robots"
          content="max-snippet:-1,max-image-preview:standard,max-video-preview:-1"
        />
        <meta
          name="description"
          content="Available as a browser extension and as a mobile app, Auro Wallet perfectly supports Mina Protocol. easily send, receive or stake your MINA anytime."
        />
        <meta
          property="og:image"
          content="%PUBLIC_URL%/imgs/og_priview.png"
          data-rh="true"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Auro Wallet - Mina Protocol Wallet"
          data-rh="true"
        />
        <meta
          property="og:description"
          content="Available as a browser extension and as a mobile app, Auro Wallet perfectly supports Mina Protocol. easily send, receive or stake your MINA anytime."
        />
        {/* <meta property="og:url" content="https://www.aurowallet.com/" /> */}
        <meta property="og:site_name" content="Auro Wallet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Auro Wallet - Mina Protocol Wallet"
          data-rh="true"
        />
        <meta
          name="twitter:description"
          content="Available as a browser extension and as a mobile app, Auro Wallet perfectly supports Mina Protocol. easily send, receive or stake your MINA anytime."
        />
        <meta
          name="twitter:image"
          content="%PUBLIC_URL%/imgs/og_priview.png"
          data-rh="true"
        />
      </Head>
      <header>
        <StyledPageTitle>AURO E2E Test zkApp</StyledPageTitle>
      </header>
      {/* status + account  */}
      <StyledRowSection>
        <StyledRowTitle>Status</StyledRowTitle>
        <Container>
          <StyledStatusRowWrapper>
            <InfoRow
              title="Network: "
              content={currentNetwork}
              type={InfoType.primary}
            />
          </StyledStatusRowWrapper>
          <StyledStatusRowWrapper>
            <InfoRow
              title="Accounts: "
              content={currentAccount}
              type={InfoType.success}
            />
          </StyledStatusRowWrapper>
        </Container>
      </StyledRowSection>
      <Container>
        {/* connect and get account */}
        <BaseActionBox currentAccount={currentAccount} />
        {/* send  */}
        <MinaSendBox network={currentNetwork} />
        {/* stake */}
        <StakingBox network={currentNetwork} />
        {/* sign message */}
        <SignMessageBox currentAccount={currentAccount} />
        <SignTypeMessageBox
          currentAccount={currentAccount}
          network={currentNetwork}
        />
        {/* sign fields */}
        <SignFieldsBox currentAccount={currentAccount} />
        <SwitchChainBox network={currentNetwork}/>
        {/* zk app */}
        <SignTransactionBox network={currentNetwork} />
      </Container>
    </PageContainer>
  );
}
