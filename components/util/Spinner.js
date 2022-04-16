import style from './spinner.module.css'
function Spinner() {
    return (
        <div className={style.loadingSpinnerContainer}>
            <div className={style.loadingSpinner}></div>
        </div>
    )
}
export default Spinner
