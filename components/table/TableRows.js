import { AiOutlineDelete } from "react-icons/ai";
const TableRows = ({ rowsData, deleteTableRows, handleChange, selectValue, isEdit = false }) => {
    return (
        rowsData?.map((data, index) => {
            const { pRole, role, status } = data;
            const { roleId, userRoleId } = data ? data : ""

            return (
                <tr key={index}>
                    {!isEdit ?
                        <>
                            <td>{index + 1}</td>
                            <td>
                                <select name="roleId" value={role} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                                    <option value="Select"> --Select--</option>
                                    <option value="1"> Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </td>
                            <td>
                                <select name="isPrimary" value={pRole} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                                    <option value="Select"> --Select--</option>
                                    {
                                        selectValue.map((data, index) => {
                                            return (
                                                <option key={index} value={data.roleId} >{data.displayName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>

                            <td>
                                <select name="status" disabled value={status} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">

                                    {
                                        selectValue.map((data, index) => {
                                            return (
                                                <option key={index} value={data.isActive}>{data.isActive ? "true" : "False"}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}><AiOutlineDelete /></button></td>
                        </>
                        :
                        <>
                            <td>{index + 1}</td>
                            <td>
                                <select name="roleId" value={role} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                                    <option value="Select"> --Select--</option>
                                    <option value="1"> Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </td>
                            <td>
                                <select name="isPrimary" value={pRole} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                                    <option value="Select"> --Select--</option>
                                    {
                                        selectValue.map((data, index) => {
                                            return (
                                                <option key={index} value={data.roleId} selected={data.roleId == userRoleId ? "selected" : ""}>{data.displayName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="status" disabled value={status} onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
                                    {
                                        selectValue.map((data, index) => {
                                            return (
                                                <option key={index} value={data.isActive}>{data.isActive ? "True" : "False"}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}><AiOutlineDelete /></button></td>
                        </>}
                </tr>
            )
        })

    )
}

export default TableRows