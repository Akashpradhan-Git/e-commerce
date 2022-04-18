import { AiOutlineDelete } from "react-icons/ai";
const TableRows = ({ rowsData, deleteTableRows, handleChange, selectValue }) => {
    return (
        rowsData.map((data, index) => {
            const { pRole, role, status } = data;
            const { primaryRole, roles, activeStatus } = selectValue;
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        <select name="pRole" value={pRole} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                            {
                                primaryRole.map((data, index) => {
                                    return (
                                        <option key={index} value={data.value}>{data.label}</option>
                                    )
                                })
                            }
                        </select>
                        {/* <input type="text" value={fullName} onChange={(evnt) => (handleChange(index, evnt))} name="fullName" className="form-control" /> */}
                    </td>
                    <td>
                        <select name="role" value={role} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                            {
                                roles.map((data, index) => {
                                    return (
                                        <option key={index} value={data.value}>{data.label}</option>
                                    )
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <select name="status" value={status} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                            {
                                activeStatus.map((data, index) => {
                                    return (
                                        <option key={index} value={data.value}>{data.label}</option>
                                    )
                                })
                            }
                        </select>
                    </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}><AiOutlineDelete /></button></td>
                </tr>
            )
        })

    )
}

export default TableRows