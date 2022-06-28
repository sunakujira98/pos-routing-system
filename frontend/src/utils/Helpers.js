export const showNumberInRupiah = amount => {
  return amount ? 'Rp ' + String(Math.trunc(amount)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '0'
}

export const replaceDashWithSpace = text => {
  return text.replace("-", " ")
}