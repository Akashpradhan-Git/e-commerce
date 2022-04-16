import style from '../../styles/error.module.css'
import Link from 'next/link'
const Unauthorized = () => {
    return (
        <div>
            <div className={style.errorWrap}>
                <img src="/error/401.svg" alt="error" />
                <style jsx>{`
                    img {width:100%}
                     `}
                </style>
                <h4>There's nothing here!</h4>
                <p>Sorry, the page you were looking for in this blog does not exist.</p>

                <button className={style.btn_home}>
                    <Link href={'/login'}>
                        Home
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Unauthorized