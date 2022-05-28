const getTransactionData = async (transactionHash) => {
  try {
    const details = await customHttpProvider.getTransaction(transactionHash)

    console.log(details)

    return details?.data
  } catch (error) {
    throw new Error('Some error in finding transaction byte code.')
  }
}

export default getTransactionData
