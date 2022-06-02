import style from './index.css'
class Popup extends React.Component {
    static propTypes = {
        // 常规必传
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array,
            PropTypes.element,
        ]),
        popupNum: PropTypes.number,
        setPopupNum: PropTypes.func
    }
    static defaultProps = {
        popupNum: -1,
        setPopupNum: () => { }
    }
    state = {
        show: false,
        animaShow: false,
        showNum: -1
    }
    constructor(props) {
        super(props)
    }
    animationEnd = this.animationEnd.bind(this)
    componentDidUpdate(prevProps) {
        const { show } = this.state
        const { popupNum } = this.props
        if (popupNum >= 0 && popupNum !== prevProps.popupNum) {
            this.setState({ showNum: popupNum, show: true, animaShow: true })
        } else if (popupNum < 0 && popupNum !== prevProps.popupNum && show) {
            this.setState({ animaShow: false })
        }
    }
    animationEnd(e) {
        const { setPopupNum } = this.props
        if (e.animationName.indexOf('hide') !== -1) {
            setPopupNum(-1)
            this.setState({ show: false, showNum: -1 })
        }
    }
    _renderChildren() {
        const { children } = this.props
        const { showNum } = this.state
        if (Array.isArray(children) && showNum >= 0) {
            return children[showNum]
        } else if (showNum === 0) {
            return children
        }
    }
    render() {
        const { show, animaShow } = this.state
        return (
            <div className={show ? style.maskBox : style.none}>
                <div className={`${style.maskBg} ${animaShow ? style.show : style.hide}`} onClick={() => { this.setState({ animaShow: false }) }} onAnimationEnd={this.animationEnd}></div>
                <div className={`${style.mask} ${animaShow ? style.big : style.small}`}>
                    {this._renderChildren()}
                </div>
            </div >
        )
    }
}

export default Popup