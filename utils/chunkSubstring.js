const chunkSubstring = (str, size) => {
  try {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }

    return chunks
  } catch (error) {
    throw new Error('Some error in making chunks of string.')
  }
}

export default chunkSubstring
