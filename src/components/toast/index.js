import style from './index.css'
class Toast extends React.Component {
    static propTypes = {
        // 常规必传
        toastText: PropTypes.string,
        setToastText: PropTypes.func,
        // 样式
        toastBoxClassName: PropTypes.string,
        className: PropTypes.string,
        // 自定义内容
        toastMAX: PropTypes.number, // 最长显示的toast数
        toastTIME: PropTypes.number // 多少秒后消失
    }
    static defaultProps = {
        toastText: '',
        setToastText: () => { },
        toastBoxClassName: '',
        className: '',
        toastMAX: 3,
        toastTIME: 3000
    }
    state = {
        toastTextArray: [],
        closeToast: false,
    }
    constructor(props) {
        super(props)
    }
    toastTIMER = null   // 定时器
    componentDidUpdate(prevProps) {
        const { toastText, setToastText, toastTIME } = this.props
        const { toastTextArray } = this.state
        if (toastText && toastText !== prevProps.toastText) {
            toastTextArray.push(toastText)
            // 导入toast完成就清空toastText
            setToastText('')
            this.setState({ toastTextArray, closeToast: false })
            if (this.toastTIMER) {
                clearTimeout(this.toastTIMER)
                this.toastTIMER = null
            }
            this.toastTIMER = setTimeout(() => {
                this.setState({ closeToast: true })
            }, toastTIME)
        }
    }
    animationEnd(e, index) {
        const { toastTextArray, closeToast } = this.state
        // 但动画为leave且closeToast为true且为最后一个toast时重置
        if (e.animationName.indexOf('leave') !== -1 && closeToast && toastTextArray.length - 1 === index) {
            this.setState({ toastTextArray: [] })
        }
    }
    render() {
        const { toastTextArray, closeToast } = this.state
        const { toastBoxClassName, className, toastMAX } = this.props
        return (
            <div className={`${style.toastBox} ${toastBoxClassName}`}>
                {toastTextArray.map((item, index) => {
                    const length = toastTextArray.length
                    if (length - index < toastMAX + 2) {
                        return (
                            <div key={index} style={{ animationDelay: (closeToast ? index * 0.2 : 0) + 's' }} className={`${style.toast} ${className} ${closeToast || index + toastMAX < length ? style.leave : style.entry}`}
                                onAnimationEnd={(e) => { this.animationEnd(e, index) }}
                            >
                                {item}
                            </div>)
                    }
                })}
            </div >
        )
    }
}

export default Toast