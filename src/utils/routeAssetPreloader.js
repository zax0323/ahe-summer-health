const assetModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,gif,webp,mov,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const assetEntries = Object.entries(assetModules)
const pendingAssets = new Set()
const loadedAssets = new Set()
let installedRouter = null

const routeAssetGroups = {
  home: ['home-main-bg'],
  'wuse-yuanhuan': ['wuse-yuanhuan'],
  'wuse-yuanhuan-detail': ['wuse-yuanhuan-detail'],
  'wuse-zhouji': ['wuse-zhouji'],
  morning: ['transition-morning-qichuang', 'morning-observation'],
  'morning-meal': [
    'morning-meal-bg',
    'morning-meal-time-overlay',
    'morning-meal-settings-overlay',
    'morning-meal-character',
    'morning-meal-backdrop',
    'morning-meal-food-board-morning',
    'morning-meal-panel',
    'meal-status',
    'morning-meal-items',
  ],
  'morning-meal-feedback': ['morning-meal-feedback'],
  'physical-exam': [
    'physical-exam-bg',
    'physical-exam-back',
    'physical-exam-character',
    'physical-exam-flash',
    'physical-exam-magnifier',
    'physical-exam-organ-',
    'physical-exam-organs',
    'physical-exam-tip-bubble',
    'physical-exam-title',
    'physical-exam-warning',
    'physical-exam-detail',
  ],
  'physical-exam-detail': ['physical-exam-detail'],
  'forenoon-transition': ['transition-forenoon-xuexi'],
  'forenoon-feedback': ['forenoon-feedback'],
  'lunch-meal': [
    'lunch-meal-bg',
    'lunch-meal-time',
    'lunch-meal-settings',
    'lunch-meal-character',
    'morning-meal-backdrop',
    'morning-meal-food-board-morning',
    'morning-meal-panel',
    'meal-status',
    'morning-meal-items',
  ],
  'lunch-meal-feedback': ['lunch-meal-feedback'],
  'afternoon-transition': ['transition-afternoon-yundong'],
  'afternoon-feedback': ['afternoon-feedback'],
  'night-meal': [
    'night-meal',
    'night-meal-time',
    'night-meal-settings',
    'morning-meal-backdrop',
    'morning-meal-food-board-morning',
    'morning-meal-panel',
    'meal-status',
    'morning-meal-items',
  ],
  'night-meal-feedback': ['night-meal-feedback'],
  'bedtime-choice': ['bedtime-choice-overall'],
  'bedtime-result': ['bedtime-result'],
  'game-ending': ['ending-'],
  'food-book': ['food-book'],
  'food-atlas': ['food-atlas'],
  'food-intro': ['food-intro'],
  'summer-note': ['summer-note'],
}

const nextRouteGroups = {
  home: ['morning', 'food-book', 'wuse-yuanhuan', 'wuse-zhouji'],
  'wuse-yuanhuan': ['wuse-yuanhuan-detail'],
  'wuse-yuanhuan-detail': ['wuse-yuanhuan'],
  'wuse-zhouji': ['home'],
  morning: ['morning-meal'],
  'morning-meal': ['morning-meal-feedback'],
  'morning-meal-feedback': ['forenoon-transition'],
  'physical-exam': ['physical-exam-detail'],
  'forenoon-transition': ['forenoon-feedback'],
  'forenoon-feedback': ['lunch-meal'],
  'lunch-meal': ['lunch-meal-feedback'],
  'lunch-meal-feedback': ['afternoon-transition'],
  'afternoon-transition': ['afternoon-feedback'],
  'afternoon-feedback': ['night-meal'],
  'night-meal': ['night-meal-feedback'],
  'night-meal-feedback': ['bedtime-choice'],
  'bedtime-choice': ['bedtime-result'],
  'bedtime-result': ['today-record'],
  'game-ending': ['home'],
  'food-book': ['home', 'food-atlas', 'summer-note'],
  'food-atlas': ['food-book', 'food-intro'],
  'food-intro': ['food-atlas'],
  'summer-note': ['food-book'],
}

const scheduleIdle = (callback) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 1200 })
    return
  }

  window.setTimeout(callback, 160)
}

const addPreloadHint = (url, asType) => {
  const selector = `link[data-route-preload="${CSS.escape(url)}"]`

  if (document.head.querySelector(selector)) {
    return
  }

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = asType
  link.href = url
  link.dataset.routePreload = url
  document.head.appendChild(link)
}

const preloadImage = (url) => {
  const image = new Image()
  image.decoding = 'async'
  image.loading = 'eager'
  image.src = url

  if (image.decode) {
    return image.decode()
  }

  return new Promise((resolve, reject) => {
    image.onload = resolve
    image.onerror = reject
  })
}

const preloadVideo = (url) =>
  new Promise((resolve) => {
    const video = document.createElement('video')
    const done = () => {
      video.removeAttribute('src')
      video.load()
      resolve()
    }

    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    video.src = url
    video.addEventListener('canplaythrough', done, { once: true })
    video.addEventListener('loadedmetadata', done, { once: true })
    video.addEventListener('error', done, { once: true })
    window.setTimeout(done, 2200)
    video.load()
  })

const preloadAsset = (url) => {
  if (loadedAssets.has(url) || pendingAssets.has(url)) {
    return
  }

  pendingAssets.add(url)

  const isVideo = /\.(mov|mp4)(?:$|\?)/i.test(url)
  addPreloadHint(url, isVideo ? 'video' : 'image')
  const loader = isVideo ? preloadVideo(url) : preloadImage(url)

  loader
    .catch(() => undefined)
    .finally(() => {
      pendingAssets.delete(url)
      loadedAssets.add(url)
    })
}

const getAssetsForRoute = (routeName) => {
  const needles = routeAssetGroups[routeName] ?? []

  if (!needles.length) {
    return []
  }

  return assetEntries
    .filter(([path]) => needles.some((needle) => path.includes(needle)))
    .map(([, url]) => url)
}

const warmRoutes = (routeNames) => {
  routeNames.forEach((routeName) => {
    getAssetsForRoute(routeName).forEach(preloadAsset)
  })
}

export const installRouteAssetPreloader = (router) => {
  if (installedRouter === router || typeof window === 'undefined') {
    return
  }

  installedRouter = router

  router.beforeEach((to) => {
    warmRoutes([to.name])
  })

  router.afterEach((to) => {
    const relatedRoutes = nextRouteGroups[to.name] ?? []

    scheduleIdle(() => {
      warmRoutes([to.name, ...relatedRoutes])
    })
  })
}
