import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', () => {
  const state = reactive({
    visitedViews: [],
    cachedViews: []
  })

  const addView = (view) => {
    addVisitedView(view)
    addCachedView(view)
  }

  const addVisitedView = (view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  }

  const addCachedView = (view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  }

  const delView = async (view) => {
    await delVisitedView(view)
    await delCachedView(view)
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  }

  const delVisitedView = async (view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
    return [...state.visitedViews]
  }

  const delCachedView = async (view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
    return [...state.cachedViews]
  }

  const delOthersViews = async (view) => {
    await delOthersVisitedViews(view)
    await delOthersCachedViews(view)
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  }

  const delOthersVisitedViews = async (view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path
    })
    return [...state.visitedViews]
  }

  const delOthersCachedViews = async (view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
    return [...state.cachedViews]
  }

  const delAllViews = async () => {
    await delAllVisitedViews()
    await delAllCachedViews()
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  }

  const delAllVisitedViews = async () => {
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix)
    state.visitedViews = affixTags
    return [...state.visitedViews]
  }

  const delAllCachedViews = async () => {
    state.cachedViews = []
    return []
  }

  const updateVisitedView = (view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  return {
    state,
    addView,
    addVisitedView,
    addCachedView,
    delView,
    delVisitedView,
    delCachedView,
    delOthersViews,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView
  }
})
