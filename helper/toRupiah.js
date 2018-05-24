function toRupiah(money){
    return `Rp.${money.toLocaleString()},00`
}

module.exports = toRupiah;