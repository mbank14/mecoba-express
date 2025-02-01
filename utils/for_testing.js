const reverse = (str) =>{
    return str.split('').reverse().join('')
}

const average = (arr) =>{
    const reducer = (sum, item) => {
        return sum + item
    }

    return arr.reduce(reducer, 0) / arr.length
}

module.exports= {
    reverse, average
}