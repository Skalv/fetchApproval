import styles from '../styles/Home.module.scss'

import ConnectBtn from "../components/connectBtn"
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from 'react';
import Moment from "moment"


export function MdiReload(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><path d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0z" fill="currentColor"></path></svg>
  )
}

export default function Home() {
  const { active, account } = useWeb3React()
  const [approvals, setApprovals] = useState([])
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (account) {
      getTxs()
    }
  }, [account])

  function getTxs() {
    setError(null)
    setFetching(true)
    setApprovals([])

    if (account) {
      fetch("/api/" + account)
        .then(response => response.json())
        .then(result => {
          setApprovals(result)
          setFetching(false)
        }).catch(err => {
          console.log("error", err)
          setError(err)
          setFetching(false)
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
        <div className={styles.btns}>
          <ConnectBtn btnText="Connect wallet" />
          {active && <button className={styles.reset} onClick={getTxs} >Reset</button>}
          {active && <span>{account.slice(0, 6)}</span>}
        </div>
      </nav>
      {error &&
        <div className={styles.error}>
          <p>{err.message}</p>
        </div>
      }
      {fetching &&
        <div className={styles.spinner}>
          <MdiReload />
        </div>
      }
      {approvals.length > 0 &&
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
                <td><a href={`https://etherscan.io/tx/${tx.tx}`} target="_blank">{tx.tx.slice(0, 8)}</a></td>
                <td><DisplayDate timestamp={tx.date} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </main>
  )
}
