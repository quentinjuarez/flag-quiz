import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const dataMiddleware = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!to.name) return next()

  const configStore = useConfigStore()
  await configStore.initCountries()

  return next()
}

export default dataMiddleware
