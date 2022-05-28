const getTransactionData = async (transactionHash) => {
  const details = await customHttpProvider.getTransaction(transactionHash)

  return details?.data
}

export default getTransactionData
