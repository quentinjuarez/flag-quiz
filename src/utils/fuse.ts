import Fuse from 'fuse.js'

const configStore = useConfigStore()

const options = {
  // isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  // findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.7,
  distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  keys: ['name', 'frenchName', 'normalizedName', 'normalizedFrenchName']
}

// const myIndex = Fuse.createIndex(['name'], configStore.codes)

const fuse = new Fuse(configStore.countries, options)

export default fuse
