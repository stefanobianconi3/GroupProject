module.exports = {
    defineDataLocation: function (dirname) {
        let x = dirname.replace('routes', '')
        let y = x.substr(0, x.length - 1)
        let location = y.replace('src', 'user_data')
        return location
    }
}