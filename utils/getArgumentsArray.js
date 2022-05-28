import getMethodSignature from './getMethodSignature.js'

const getArgumentsArray = async (transactionData) => {
  const methodHexCount = transactionData.length % 64

  const methodHex = transactionData.slice(0, methodHexCount)

  const methodSignature = await getMethodSignature(methodHex)

  const regExp = new RegExp(/\((.*?)\)/)

  const argumentsArray = regExp.exec(methodSignature)[1].split(',')

  return argumentsArray
}

export default getArgumentsArray
