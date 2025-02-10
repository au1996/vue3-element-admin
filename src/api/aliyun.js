import request from './Axios'

const API =
  process.env.NODE_ENV === 'development'
    ? '/api/areas_v3/bound/geojson'
    : 'https://www.xyob.cn/network/aliyun/map'

/**
 * 获取地图JSON
 * @param {*} params
 * @returns
 */
export function get_map_json(params) {
  return request({
    // url: 'https://geo.datav.aliyun.com/areas_v3/bound/geojson',
    url: API,
    method: 'GET',
    params
  })
}
