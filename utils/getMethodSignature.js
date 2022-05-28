import axios from 'axios'

const getMethodSignature = async (transactionData) => {
  try {
    const methodHexCount = transactionData.length % 64

    const methodHex = transactionData.slice(0, methodHexCount)

    const searchResults = await axios.get(
      `https://www.4byte.directory/api/v1/signatures/?hex_signature=${methodHex}`
    )

    if (searchResults.data) {
      if (searchResults.data.count < 1) {
        throw new Error('No signature found.')
      } else {
        return searchResults.data.results[0]['text_signature']
      }
    }
  } catch (error) {
    throw new Error('Some error in finding method signature.')
  }
}

export default getMethodSignature
