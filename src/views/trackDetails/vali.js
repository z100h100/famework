import {Validator} from 'vee-validate'

// 自定义扩展
// 运单号
Validator.extend('waybillNo', {
  getMessage: (field, [args]) => {
    return `请输入运单号`
  },
  validate: value => {
    // 获取输入的value
    return /^[1-9][0-9]{4,14}$/.test(value)
  }
})
// 经办人
Validator.extend('operator', {
  getMessage: (field, [args]) => {
    return `请输入经办人`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
// 收货人电话号码
Validator.extend('receivingPhone', {
  getMessage: (field, [args]) => {
    return `请填写正确的手机号`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
// 发货人电话号码
Validator.extend('deliveryPhone', {
  getMessage: (field, [args]) => {
    return `请填写正确的手机号`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
// 送货方式
Validator.extend('deliveryMode', {
  getMessage: (field, [args]) => {
    return `请选择送货方式`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
// 付款方式
Validator.extend('payment', {
  getMessage: (field, [args]) => {
    return `请选择付款方式`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
// 发货人
Validator.extend('deliveryPerson', {
  getMessage: (field, [args]) => {
    return `请输入发货人`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
// 件数
Validator.extend('quantity', {
  getMessage: (field, [args]) => {
    return `请输入件数`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})

// 自定义验证
const dict = {
  zh_CN: {
    messages: {
      required: (name) => {
        if (name == 'nameList') return `运单号不能为空!`
          return `aaa不能为空!`
      }
    }
  }
}
Validator.localize(dict)
