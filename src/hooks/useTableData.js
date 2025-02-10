import { ref, reactive, nextTick } from 'vue'

function useTableData({
  getTableParams,
  setTableData,
  request,
  autoRequest = true,
  page = 1,
  pageSize = 10,
  pageName = 'page',
  pageSizeName = 'page_size'
}) {
  const tableLoading = ref(false)
  const tableData = ref([])
  const tableParams = getTableParams()

  const pagination = reactive({
    total: 0,
    page,
    pageSize,
    pageChange: async (page) => {
      await getTableData(page)
    },
    sizeChange(pageSize) {
      pagination.page = 1
      pagination.pageSize = pageSize
      getTableData()
    }
  })

  const getTableData = async (page, addParams) => {
    const params = {
      ...tableParams,
      ...getTableParams(),
      ...addParams
    }
    pagination.page = page || pagination.page
    params[pageName] = pagination.page
    params[pageSizeName] = pagination.pageSize

    tableLoading.value = true
    await request(params)
      .then((res) => {
        setTableData(res, tableData)
      })
      .finally(() => {
        tableLoading.value = false
      })
  }

  // 是否自动请求
  if (autoRequest) {
    getTableData()
  }

  return { tableLoading, tableData, pagination, getTableData }
}

export default useTableData
