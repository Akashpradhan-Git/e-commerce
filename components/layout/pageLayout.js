// components/layout.js
export default function pageLayout({ children }) {

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    {children}
                </div>
            </div>
        </>
    )
}
