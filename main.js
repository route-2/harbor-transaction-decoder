import getTransactionData from './utils/getTransactionData.js'
import ethers from 'ethers'
import dotenv from 'dotenv'
import getArgumentsArray from './utils/getArgumentsArray.js'
import getParametersArray from './utils/getParametersArray.js'
import getMethodSignature from './utils/getMethodSignature.js'
import express from 'express'
import cors from 'cors'

dotenv.config()

const main = async () => {
  const INFURA_TESTNET_URL = process.env.INFURA_TESTNET_URL
  const INFURA_MAINNET_URL = process.env.INFURA_MAINNET_URL

  global.customTestnetHttpProvider = new ethers.providers.JsonRpcProvider(
    INFURA_TESTNET_URL
  )
  global.customMainnetHttpProvider = new ethers.providers.JsonRpcProvider(
    INFURA_MAINNET_URL
  )

  const app = express()
  const port = process.env.PORT

  app.get('/', async function (req, res) {
    try {
      const transactionHash = req.query.hash
      const mode = req.query.mode

      const transactionData = await getTransactionData(transactionHash, mode)

      console.log(transactionData)

      const methodSignature = await getMethodSignature(transactionData)

      const argumentsArray = await getArgumentsArray(transactionData)

      const parametersArray = getParametersArray(transactionData)

      res.send({
        error: false,
        data: {
          transactionData,
          methodSignature,
          argumentsArray,
          parametersArray,
        },
      })
    } catch (error) {
      console.log(error)
      res.send({
        error: true,
        message: error.message ? error.message : 'Something went wrong.',
      })
    }
  })
  app.use(
    cors({
      origin: '*',
    })
  )
  app.listen(port)
}

main().catch((error) => {
  console.log(error)
})
