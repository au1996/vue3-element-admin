import {
  validUsername,
  validURL,
  validLowerCase,
  validUpperCase,
  validAlphabets,
  validEmail,
  isString,
  isArray
} from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validUsername', () => {
    expect(validUsername('admin')).toBe(true)
    expect(validUsername('editor')).toBe(true)
    expect(validUsername('xxxx')).toBe(false)
  })
  it('validURL', () => {
    expect(validURL('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validURL('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validURL('github.com/PanJiaChen/vue-element-admin')).toBe(false)
  })
  it('validLowerCase', () => {
    expect(validLowerCase('abc')).toBe(true)
    expect(validLowerCase('Abc')).toBe(false)
    expect(validLowerCase('123abc')).toBe(false)
  })
  it('validUpperCase', () => {
    expect(validUpperCase('ABC')).toBe(true)
    expect(validUpperCase('Abc')).toBe(false)
    expect(validUpperCase('123ABC')).toBe(false)
  })
  it('validAlphabets', () => {
    expect(validAlphabets('ABC')).toBe(true)
    expect(validAlphabets('Abc')).toBe(true)
    expect(validAlphabets('123aBC')).toBe(false)
  })
  it('validEmail', () => {
    expect(validEmail('123@qq.xom')).toBe(true)
    expect(validEmail('123@163.com')).toBe(true)
    expect(validEmail('123.cn')).toBe(false)
  })
  it('isString', () => {
    expect(isString('str')).toBe(true)
    expect(isString('string123')).toBe(true)
    expect(isString(123)).toBe(false)
  })
  it('isArray', () => {
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray([])).toBe(true)
    expect(isArray(null)).toBe(false)
  })
})
