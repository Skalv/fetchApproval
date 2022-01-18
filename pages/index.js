import styles from '../styles/Home.module.css'

import ConnectBtn from "../components/connectBtn"
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from 'react';

export default function Home() {
  const { active, account } = useWeb3React()
  const [approvals, setApprovals] = useState()

  useEffect(() => {
    if (account) {
      getTxs()
    }
  }, [account])

  function getTxs() {
    if (account) {
      fetch("/api/" + account)
        .then(response => response.json())
        .then(result => {
          setApprovals(result)
        })
    }
  }

  function DisplayDate(props) {
    const date = new Date(+props.timestamps)
    console.log(date)
    return date.toISOString()
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">
        Hello
        {active && <span>: {account}</span>}
      </h1>
      <ConnectBtn btnText="Connect wallet" />
      <button onClick={() => getTxs()}>Fetch</button>

      {approvals &&
        <table className="table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Contract</th>
              <th>Tx</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((tx) => (
              <tr key={tx.token}>
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
    </div>
  )
}
