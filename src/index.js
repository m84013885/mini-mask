import { useState } from 'react'
import { Panel, Toast, Popup } from './components'
// import '../dist/assets/index.common.css'
// import { Panel, Toast, Popup } from '../dist/assets/index.edb4a'
import style from './index.css'

const Index = () => {
    const [value, setValue] = useState('')
    const [svalue, setSvalue] = useState('')

    return (
        <>
            <input value={value} onChange={(e) => { setValue(e.target.value) }} />
            <button onClick={() => { setSvalue(value); }}>提交</button>
            <Panel></Panel>
            <Popup></Popup>
            <Toast toastText={svalue} setToastText={setSvalue}></Toast>
        </>
    )
}

export default Index 