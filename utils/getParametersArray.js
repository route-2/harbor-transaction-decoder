import chunkSubstring from './chunkSubstring.js'

const getParametersArray = (transactionData) => {
  try {
    const methodHexCount = transactionData.length % 64

    const concatenatedChunks = transactionData.slice(methodHexCount)

    const parameters = chunkSubstring(concatenatedChunks, 64)

    return parameters
  } catch (error) {
    throw new Error('Some error in finding parameters.')
  }
}

export default getParametersArray
