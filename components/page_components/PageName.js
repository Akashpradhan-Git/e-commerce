import { AiOutlineHome } from 'react-icons/ai'
const PageName = ({ title }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                            <h3 className="font-weight-bold">{title}</h3>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="justify-content-end d-flex">
                                <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                                    <button
                                        className="btn btn-sm btn-light bg-white"
                                        type="button"
                                        id="dropdownMenuDate2"
                                        style={{ border: '1px solid #dbdbdb' }}

                                    >
                                        <AiOutlineHome /> / {title}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageName