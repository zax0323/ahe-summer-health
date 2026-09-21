const lastRandomSelections = new Map()

const defaultGetId = (option) => option

export const pickRandomExceptLast = (key, options, getId = defaultGetId) => {
  if (!options.length) {
    return null
  }

  if (options.length === 1) {
    const onlyOption = options[0]
    lastRandomSelections.set(key, getId(onlyOption))
    return onlyOption
  }

  const lastId = lastRandomSelections.get(key)
  const candidates = options.filter((option) => getId(option) !== lastId)
  const pool = candidates.length ? candidates : options
  const selectedOption = pool[Math.floor(Math.random() * pool.length)]

  lastRandomSelections.set(key, getId(selectedOption))
  return selectedOption
}

export const shuffleExceptLastOrder = (key, options, getId = defaultGetId) => {
  if (options.length <= 1) {
    return [...options]
  }

  const lastOrder = lastRandomSelections.get(key)
  let shuffledOptions = [...options]
  let shuffledOrder = ''

  for (let attempt = 0; attempt < 8; attempt += 1) {
    shuffledOptions = [...options]

    for (let index = shuffledOptions.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffledOptions[index], shuffledOptions[randomIndex]] = [
        shuffledOptions[randomIndex],
        shuffledOptions[index],
      ]
    }

    shuffledOrder = shuffledOptions.map(getId).join('|')

    if (shuffledOrder !== lastOrder) {
      break
    }
  }

  lastRandomSelections.set(key, shuffledOrder)
  return shuffledOptions
}
