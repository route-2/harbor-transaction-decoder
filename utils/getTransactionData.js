const getTransactionData = async (transactionHash, mode) => {
  try {
    let details
    if (mode === 'testnet') {
      details = await customTestnetHttpProvider.getTransaction(transactionHash)
    } else {
      details = await customMainnetHttpProvider.getTransaction(transactionHash)
    }

    return details?.data
  } catch (error) {
    throw new Error('Some error in finding transaction byte code.')
  }
}

export default getTransactionData
