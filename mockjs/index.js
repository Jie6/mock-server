const Mock = require('mockjs');


Mock.Random.extend({
    phone: function () {
        const phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
})

module.exports = Mock