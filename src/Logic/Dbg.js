//":" //#;exec /usr/bin/env node --input-type=module - "$@" < "$0"

import {QnA_List}  from './CnvClasses.js'
//QnA_List = require( '../Utils/CnvClasses.js')

const CnvText = ({records}, lsep = '\nxxx:\n') => {
    const txt = QnA_List.createFromRecords(records).combined(lsep)
    return txt
    console.log(txt)
    //return <pre>txt</pre>
  }


function f(arg0, {arg1 = 'aaa'},   arg2 = 'bbb') {
  console.log('==> arg1: ', arg1)
  console.log('==> arg2: ', arg2)
}

const records = [
  {q:"hi there", a:"hello, i am machine"},
  {q:"who are you?", a:"i am machine, stupid"},
]

//f('zero', {arg1 : "dsd"},'dada')

const t = CnvText({records:records})
console.log(t)