import Column from "../components/Column";
import Pie from "./Pie";
import { useHistory } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { actions } from '../../../Redux/action'
import { useEffect } from "react";
import './style.css';
import { useState } from "react";

function mapStateToProps(state) {
    return {
        allUsers: state.usersReducer.allUsers,
        allPackagesByUser: state.packagesByUserReducer.allPackagesByUser,
        allPackages: state.packagesReducer.packages
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllUsers: () => dispatch(actions.getAllUsers()),
    getAllPackagesByUsers: () => dispatch(actions.getAllPackagesByUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Statistic(props) {
    let usersAge = { "age10": 5, "age20": 5, "age30": 5, "age40": 5, "age50": 5, "age60": 5 }
    const { allUsers, allPackagesByUser, allPackages } = props;
    const [usersAgesStatistic, setUsersAgesStatistic] = useState({});
    useEffect(async () => {
        await allUsers?.users?.map((item) => {
            usersAge[`age${(parseInt((new Date().getFullYear() - new Date(item?.birthDate).getFullYear()) / 10, 10) + 1) * 10}`]++
        })
        setUsersAgesStatistic(usersAge);
    }, []);

    const history = useHistory();
    const navigateToPages = (page) => {
        history.push(`/${page}`)
    }
    return (
        <>
            <div className="buttons-for-navigat row">
                <div className="btn-nabigate col" onClick={() => navigateToPages('courses')}>Create new course</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('packages')}>Create new Packade</div>
                <div className="btn-nabigate-choosed col" onClick={() => navigateToPages('statistic')}>Statistic</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('requests-user')}>Reqests from users</div>
            </div>
            <div className="generalContainer">
                <div className="statistic-title">Statistic</div>
                <Pie numberOfUsers={allUsers?.users?.length} usersAge={usersAgesStatistic} />
                <br />
                <br />
                <Column allPackages={allPackages} />
                <br />
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPackagesByUser?.packages?.map((item, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item?.packageForBuy?.name}</td>
                                <td>{item?.packageForBuy?.description}</td>
                                <td>{item?.packageForBuy?.price}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>);
}
)