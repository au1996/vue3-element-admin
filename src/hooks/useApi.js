import { ref } from 'vue'

export default function useApi(api) {
  const loading = ref(false)

  const fetch_resource = (params) => {
    loading.value = true

    return api(params)
      .then((res) => {
        return res
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false
        }, 100)
      })
  }

  return {
    loading,
    fetch_resource
  }
}
