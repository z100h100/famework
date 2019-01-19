import { Validator } from 'vee-validate'
import store from '@/store'
// 自定义扩展
// 收货人电话号码
Validator.extend('phone', {
  getMessage: (field, [args]) => {
    return `请填写正确的手机号`
  },
  validate: value => {
    // 获取输入的value
    return /^1[34578]\d{9}$/.test(value)
  }
})
Validator.extend('waybillNo', {
  getMessage: (field, [args]) => {
    return `运单号不能重复`
  },
  validate: value => {
    // 获取输入的value
    let params = {
      billNo: value
    }
    return store.dispatch('getWaybillNoDuplicate', params).then(res => {
      return !res.data.data
    }).catch(err => {
      console.log(err)
    })
  }
})
// 件数
Validator.extend('quantity', {
  getMessage: (field, [args]) => {
    return `请输入件数`
  },
  validate: value => {
    // 获取输入的value
    return /^[0-9]*$/.test(value)
  }
})

// 自定义验证
const dict = {
  zh_CN: {
    messages: {
      required: (name) => {
        if (name === 'waybillNo') return `运单号不能为空!`
        if (name === 'deliveryMode') return `请选择送货方式!`
        if (name === 'deliveryPerson') return `发货人不能为空!`
        if (name === 'deliveryPhone' || name === 'receivingPhone') return `手机号码不能为空!`
        if (name === 'receivingPerson') return `收货人不能为空!`
        if (name === 'operator') return `请选择经办人!`
        if (name === 'payment') return `请选择付款方式人!`
        return `不能为空!`
      }
    }
  }
}
Validator.localize(dict)
