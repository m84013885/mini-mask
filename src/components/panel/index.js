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
        type: PropTypes.string,
        visible: PropTypes.bool,
        setVisible: PropTypes.func,
    }
    static defaultProps = {
        type: 'bottom',
        visible: false,
        setVisible: () => { }
    }
    state = {
        show: false,
        animaShow: false,
    }
    constructor(props) {
        super(props)
    }
    animationEnd = this.animationEnd.bind(this)
    componentDidUpdate(prevProps) {
        const { show } = this.state
        const { visible } = this.props
        if (visible && visible !== prevProps.visible) {
            this.setState({ show: true, animaShow: true })
        } else if (!visible && visible !== prevProps.visible && show) {
            this.setState({ animaShow: false })
        }
    }
    animationEnd(e) {
        const { setVisible } = this.props
        if (e.animationName.indexOf('hide') !== -1) {
            setVisible(false)
            this.setState({ show: false })
        }
    }
    _renderStyle() {
        const { type } = this.props
        switch (type) {
            case 'top':
            case 'left':
                return style.maskLeftOrTop
            case 'right':
                return style.maskRight
            default:
                return style.mask
        }
    }
    _renderAnima() {
        const { type } = this.props
        switch (type) {
            case 'top':
                return [style.topDown, style.topUp]
            case 'left':
                return [style.leftUp, style.leftDown]
            case 'right':
                return [style.rightUp, style.rightDown]
            default:
                return [style.up, style.down]
        }
    }
    render() {
        const { show, animaShow } = this.state
        const { children } = this.props
        const [up, down] = this._renderAnima()
        return (
            <div className={show ? style.maskBox : style.none}>
                <div className={`${style.maskBg} ${animaShow ? style.show : style.hide}`} onClick={() => { this.setState({ animaShow: false }) }} onAnimationEnd={this.animationEnd}></div>
                <div className={`${this._renderStyle()} ${animaShow ? up : down}`}>
                    {children}
                </div>
            </div >
        )
    }
}

export default Popup