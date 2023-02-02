export default {
  namespaced: true,
  state: {
    cancelList: []
  },
  mutations: {
    addCancel(state, cancel) {
      state.cancelList.push(cancel)
    },
    deleteCancel(state, url) {
      const index = state.cancelList.findIndex((cancel) => cancel.url === url)
      if (~index) {
        state.cancelList[index].cancel()
        state.cancelList.splice(index, 1)
      }
    },
    clearCancelList(state) {
      state.cancelList.forEach((item) => item.cancel('cancel request'))
      state.cancelList = []
    }
  }
}
