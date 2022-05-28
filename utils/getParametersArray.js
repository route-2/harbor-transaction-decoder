import chunkSubstring from './chunkSubstring.js'

const getParametersArray = (transactionData) => {
  const methodHexCount = transactionData.length % 64

  const concatenatedChunks = transactionData.slice(methodHexCount)

  const parameters = chunkSubstring(concatenatedChunks, 64)

  return parameters
}

export default getParametersArray
