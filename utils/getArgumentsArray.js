import getMethodSignature from './getMethodSignature.js'

const getArgumentsArray = async (transactionData) => {
  try {
    const methodHexCount = transactionData.length % 64

    const methodHex = transactionData.slice(0, methodHexCount)

    const methodSignature = await getMethodSignature(methodHex)

    const regExp = new RegExp(/\((.*?)\)/)

    const argumentsArray = regExp.exec(methodSignature)[1].split(',')

    return argumentsArray
  } catch (error) {
    throw new Error('Some error in finding arguments.')
  }
}

export default getArgumentsArray
