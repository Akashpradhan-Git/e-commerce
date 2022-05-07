import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Navigation = ({ menu }) => {
    console.log(menu)
    const router = useRouter();
    return (
        <>
            <ul className="nav">
                {menu.map(({ name, url, icon, isParents, collapseId, subMenu }, index) => (
                    <li className={`nav-item ${router.pathname == url ? "active" : ""}`} key={index}>
                        {isParents ? (
                            <>
                                <a
                                    className="nav-link"
                                    data-toggle="collapse"
                                    href={`#${collapseId}`}
                                    aria-expanded="false"
                                    aria-controls="ui-basic"
                                >
                                    <i className="icon-layout menu-icon"></i>
                                    <span className="menu-title">{name}</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="collapse" id={collapseId}>
                                    <ul className="nav flex-column sub-menu">
                                        {
                                            subMenu.map((item, index) => (
                                                <li className={`nav-item ${router.pathname == item.url ? "active" : ""}`} key={index}>
                                                    <Link href={item.url}>
                                                        <a className="nav-link">{item.name}</a>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href={url}>
                                    <a className="nav-link">
                                        <i className={icon}></i>
                                        <span className="menu-title">{name}</span>
                                    </a>
                                </Link>
                            </>
                        )}

                    </li>
                ))}

            </ul>
        </>
    )
}

export default Navigation