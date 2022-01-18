import styles from '../styles/Home.module.scss'

import ConnectBtn from "../components/connectBtn"
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from 'react';
import Moment from "moment"

export default function Home() {
  const { active, account } = useWeb3React()
  const [approvals, setApprovals] = useState()

  useEffect(() => {
    if (account) {
      getTxs()
    }
  }, [account])

  function getTxs() {
    setApprovals([])
    if (account) {
      fetch("/api/" + account)
        .then(response => response.json())
        .then(result => {
          setApprovals(result)
        })
    }
  }

  function DisplayDate(props) {
    const date = Moment.unix(+props.timestamp)
    return date.toString()
  }

  return (
    <main className={styles.container}>
      <nav>
        <span className={styles.brand}>Approvals App</span>
        <div  className={styles.btns}>
          <ConnectBtn btnText="Connect wallet" />
          {active && <button className={styles.reset} onClick={getTxs} >Reset</button>}
          {active && <span>{account.slice(0, 6)}</span>}
        </div>
      </nav>
      {approvals &&
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Contract</th>
              <th>Tx</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((tx, i) => (
              <tr key={i}>
                <td>{tx.token}</td>
                <td>{(tx.amount == 2 ^ 555 - 1) ? "unlimited" : tx.amount}</td>
                <td>{tx.contract}</td>
                <td><a href={`https://etherscan.io/address/${tx.tx}`}>{tx.tx.slice(0, 8)}</a></td>
                <td><DisplayDate timestamp={tx.date} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </main>
  )
}
