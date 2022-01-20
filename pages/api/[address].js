const _ = require('lodash')
const Web3 = require('web3')
import abiDecoder from "abi-decoder"

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)
);
const erc20ABI = require("../../utils/erc20ABI.json")
abiDecoder.addABI(erc20ABI)

async function getSpenderContract(address) {
  const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_KEY}`
  const response = await fetch(url).then(res => res.json())
  return response.result[0]
}

export default function handler(req, res) {
  const { address } = req.query
  const apiURI = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`

  fetch(apiURI)
    .then(res => res.json())
    .then(async response => {
      const approvals = []
      for (let i = 0; i < response.result.length; i++) {
        const tx = response.result[i]
        const txMethod = abiDecoder.decodeMethod(tx.input)
        if (txMethod && txMethod.name === "approve") {
          const TokenContract = new web3.eth.Contract(erc20ABI, tx.to)

          const TokenName = await TokenContract.methods.name().call().catch(console.log)
          const { ContractName } = await getSpenderContract(txMethod.params[0].value)

          approvals.push({
            token: TokenName,
            contract: ContractName,
            amount: txMethod.params[1].value,
            tx: tx.hash,
            date: tx.timeStamp
          })
        }
      }

      res.status(200).json(approvals)
    })
}