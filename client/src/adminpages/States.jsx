import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { hideLocationWindow, showLocationWindow } from "../redux/admin/locationSlice";

function States() {
    const { isLocationPopupVisible } = useSelector((state) => state.location);
    const dispatch = useDispatch();
    const [states, setStates] = useState([]);
    const [updatedState, setUpdatedState] = useState({
        state_name: "",
        state_description: "",
    });
    const [newState, setNewState] = useState({
        state_name: "",
        state_description: "",
    });
    const [updateCount, setUpdateCount] = useState(0);

    const getStates = useCallback(async () => {
        try {
            const allStates = await axios.get('/api/admin/get-states');
            if (allStates) {
                setStates(allStates.data);
            }
        } catch (error) {
            console.log(error);
        }
    },
        [])

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/admin/delete-state/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setStates(prevStates => prevStates.filter(state => state._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id) => {
        try {
            if (updatedState.state_name === "" && updatedState.state_description === "") {
                toast.error("No Changes Made!");
                return;
            }

            const updateData = {};
            if (updatedState.state_name !== "") {
                updateData.state_name = updatedState.state_name;
            } else {
                updateData.state_name = states.state_name;
            }
            if (updatedState.state_description !== "") {
                updateData.state_description = updatedState.state_description;
            } else {
                updateData.state_description = states.state_description;
            }

            const { data } = await axios.put("api/admin/update-state/" + id, updateData);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setUpdatedState({
                    state_name: "",
                    state_description: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("api/admin/create-state", newState);
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setNewState({
                    state_name: "",
                    state_description: "",
                });
                setUpdateCount(updateCount + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            getStates();
        },
        [getStates, updateCount]
    );

    const handleInputChange = (e, field) => {
        setUpdatedState((prevStateUpdates => ({ ...prevStateUpdates, [field]: e.target.innerText })));
    }

    const handlePopupInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setNewState((prevState) => ({ ...prevState, [name]: value }));
        },
        []
    );

    return (
        <div id="locations">
            <h1 >States</h1>
            <div id="addLocation" style={{ display: isLocationPopupVisible ? "block" : "none" }}>
                <h2>Add State</h2>
                <form onSubmit={handleSubmit}>
                    <FontAwesomeIcon icon={faXmark} id="close-btn" onClick={() => { dispatch(hideLocationWindow()) }} />
                    <div>
                        <label>state name</label>
                        <input type="text" name="state_name" value={newState.state_name} onChange={handlePopupInputChange} />
                    </div>
                    <div>
                        <label>state description</label>
                        <input type="text" name="state_description" value={newState.state_description} onChange={handlePopupInputChange} />
                    </div>
                    <div>
                        <label>optional</label>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="submit" value="Add State" />
                    </div>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>state-name</th>
                        <th>state-description</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        states.map(
                            (state, index) => (
                                <tr key={index}>
                                    <td contentEditable={true} onBlur={(e) => handleInputChange(e, "state_name")} suppressContentEditableWarning={true}>{state.state_name}</td>
                                    <td contentEditable={true} onBlur={(e) => handleInputChange(e, "state_description")} suppressContentEditableWarning={true}>{state.state_description}</td>
                                    <td><button id='update' onClick={() => { handleUpdate(state._id) }}>update</button></td>
                                    <td><button id="delete" onClick={() => { handleDelete(state._id) }}>delete</button></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <div id="btns">
                <button onClick={() => { dispatch(showLocationWindow()) }}>Add state</button>
            </div>
        </div>
    )
}

export default States
