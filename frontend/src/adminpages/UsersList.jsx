import { useDispatch, useSelector } from 'react-redux'
import { adminUserUpdate } from '../redux/admin/adminSlice'
import { useNavigate } from 'react-router-dom';

// profile icon imports
import profileicon from '../assets/profile-icon.jpg'

function UsersList() {
    const { users } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = async (user) => {
        navigate('/admin-user-update');
        dispatch(adminUserUpdate(user));
    }

    return (
        <div id="usersList-page">
            <div id='container'>
                {
                    users.map((user) => (
                        <div id='card' key={user._id} onClick={() => handleUpdate(user)}>
                            <img src={!user.profile ? profileicon : user.profile} alt={user.name[0].toUpperCase()} />
                            <div>
                                <h3>Name : </h3>
                                <h3> {user.name}</h3>
                            </div>

                            <div>
                                <h3>Id : </h3>
                                <h3> {user.email}</h3>
                            </div>

                            <div>
                                <h3>Phone : </h3>
                                <h3> {user.phone}</h3>
                            </div>

                            <div>
                                <h3>D.O.B : </h3>
                                <h3> {user.date}</h3>
                            </div>

                            <div>
                                <h3>Gender : </h3>
                                <h3> {user.gender}</h3>
                            </div>

                            <div>
                                <h3>Address : </h3>
                                <address>
                                    <p>{user.address.door_no},</p>
                                    <p>{user.address.street},</p>
                                    <p>{user.address.town_or_city},</p>
                                    <p>{user.address.district},</p>
                                    <p>{user.address.state},</p>
                                    <p>{user.address.country}</p>
                                    <p> - {user.address.pincode}</p>
                                </address>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UsersList
