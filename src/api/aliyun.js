import request from './Axios'

const API = 'https://www.xueyueob.cn'

/**
 * 获取地图JSON
 * @param {*} params
 * @returns
 */
export function get_map_json(params) {
  return request({
    // url: 'https://geo.datav.aliyun.com/areas_v3/bound/geojson',
    url: `${API}/network/aliyun/map`,
    method: 'GET',
    params
  })
}
