export default (blob, callback) => {
  const a = new FileReader()
  a.onload = e => {callback(e.target.result)}
  a.readAsDataURL(blob)
}