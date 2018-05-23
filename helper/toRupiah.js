function toRupiah(money){
    return `Rp.${money.toLocaleString()}`
}

module.exports = toRupiah;