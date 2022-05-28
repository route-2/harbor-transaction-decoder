import getTransactionData from './utils/getTransactionData.js'
import ethers from 'ethers'
import dotenv from 'dotenv'
import getArgumentsArray from './utils/getArgumentsArray.js'
import getParametersArray from './utils/getParametersArray.js'
import getMethodSignature from './utils/getMethodSignature.js'
import express from 'express'

dotenv.config()

const main = async () => {
  const INFURA_TEST_URL = process.env.INFURA_TESTNET_URL

  global.customHttpProvider = new ethers.providers.JsonRpcProvider(
    INFURA_TEST_URL
  )

  const app = express()

  app.get('/', async function (req, res) {
    try {
      const transactionHash = req.query.hash

      const transactionData = await getTransactionData(transactionHash)

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
      res.send({
        error: true,
        message: error.message ? error.message : 'Something went wrong.',
      })
    }
  })

  app.listen(3000)
}

main().catch((error) => {
  console.log(error)
})