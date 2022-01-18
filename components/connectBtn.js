import styles from '../styles/connectBtn.module.scss'

import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import Modal from "react-modal"

import { injected, walletconnect } from "../hooks/connectors"

const MetamaskLogo = '/metamask.svg'
const WalletConnectLogo = '/walletconnect.svg'

Modal.setAppElement("#__next")

export default function ConnectBtn(props) {
  const { active, activate } = useWeb3React()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  if (active) return null

  async function connect(provider) {
    await activate(provider)

    setModalIsOpen(false)
  }

  return (
    <>
      <button onClick={() => setModalIsOpen(true)} className={styles.Button}>
        {props.btnText}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        overlayClassName={styles.ModalOverlay}
        className={styles.ModalContainer}
      >
        <button onClick={() => setModalIsOpen(false)}>X</button>
        <div className={styles.ModalContent}>
          <h3>Connect your wallet</h3>
          <ul>
            <li onClick={() => connect(injected)}>
              <img className={styles.connectIcon} src={MetamaskLogo} alt="Metamask icon" />
              <p>Browser<br /> Wallet</p>
            </li>
            {/* <li onClick={() => connect(walletconnect)}>
              <img className={styles.connectIcon} src={WalletConnectLogo} alt="WalletConnect icon" />
              <p>Wallet Connect</p>
            </li> */}
          </ul>
          <p><span>Disclaimer</span>: Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your access to the wallet might be reliant on the External Provider being operational.</p>
        </div>
      </Modal>
    </>
  )
}