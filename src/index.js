import { useState } from 'react'
import { Panel, Toast, Popup } from './components'
// import '../dist/assets/index.common.css'
// import { Panel, Toast, Popup } from '../dist/assets/index.edb4a'
import style from './index.css'

const Index = () => {
    const [value, setValue] = useState('')
    const [svalue, setSvalue] = useState('')
    const [popupNum, setPopupNum] = useState(-1)
    const [panelOpen, setPanelOpen] = useState(false)
    return (
        <>
            <input value={value} onChange={(e) => { setValue(e.target.value) }} />
            <button onClick={() => { setSvalue(value); }}>提交</button>
            <button onClick={() => { setPopupNum(0) }}>popup0</button>
            <button onClick={() => { setPopupNum(1) }}>popup1</button>
            <button onClick={() => { setPanelOpen(!panelOpen) }}>panel</button>
            <Panel visible={panelOpen} setVisible={setPanelOpen} type="top">
                <div onClick={() => { setPanelOpen(!panelOpen) }}>panel</div>
            </Panel>
            <Popup popupNum={popupNum} setPopupNum={setPopupNum}>
                <div className={style.test} onClick={() => { setPopupNum(-1) }}>123</div>
                <div className={style.test} onClick={() => { setPopupNum(-1) }}>456</div>
            </Popup>
            <Toast toastText={svalue} setToastText={setSvalue}></Toast>
        </>
    )
}

export default Index 