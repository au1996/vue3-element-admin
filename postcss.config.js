module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      plugins: {
        autoprefixer: {}
      }
    }
  }
  return {}
}
