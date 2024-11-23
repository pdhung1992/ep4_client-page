import {format} from "date-fns";
import {useEffect, useState} from "react";
import {loadScripts} from "../../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import userPackageService from "../../services/user-package-service";
import paymentServices from "../../services/payment-services";
import {updateCurrentPage} from "../../actions/page-actions";
import Swal from "sweetalert2";


const UserPackages = () => {
    useEffect(() => {
        loadScripts()
    }, []);

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);
    const token = user.userData.token;

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    const [packages, setPackages] = useState([]);
    const fetchPackages = async () => {
        const res = await userPackageService.getUserPackages(axiosConfig);
        setPackages(res.data);
    }

    useEffect(() => {
        fetchPackages();
    },[]);

    const handleBuyAgain = async (pkg) => {
        const formData = {
            movieId: pkg.packageId,
            amount: pkg.packagePrice,
            locale: "vn",
            isPackage: false,
        }

        const res = await paymentServices.createPayment(formData, axiosConfig);
        const path = `/account/packages`;
        if (res && res.url){
            dispatch(updateCurrentPage(path));
            setTimeout(() => {
                window.location.href = res.url;
            }, 100);
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Try again later.',
                background: '#1a1a1a',
                color: '#f27474',
                confirmButtonColor: '#f27474'
            });
        }
    }

    return (
        <div>
            <div className="contact-form-wrap">
                <div className="widget-title mb-50">
                    <h5 className="title">Packages</h5>
                </div>
                <div className="contact-form">
                    <table className="table" style={{color: '#fff'}}>
                        <thead>
                        <tr>
                            <th scope="col">Package</th>
                            <th scope="col">Expired at</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(packages) && packages.length > 0 ? packages.map((pkg, index) => (
                            <tr key={index}>
                                <td>{pkg.packageName}</td>
                                <td>
                                    {new Date(pkg.expiredAt) <= new Date()
                                        ? (
                                            <span style={{color: '#e4d804'}}>Expired!</span>
                                        )
                                        : format(new Date(pkg.expiredAt), 'yyyy-MMM-dd HH:mm:ss')}
                                </td>
                                <td>
                                    {new Date(pkg.expiredAt) <= new Date() ? (
                                        <span className={'account-table-action'} onClick={() => handleBuyAgain(pkg)}>
                                            Buy Again
                                        </span>
                                    ) : ([])}
                                </td>
                            </tr>
                        )) : ([])}
                        </tbody>
                    </table>
                    {!Array.isArray(packages) || packages.length === 0 ? (
                        <div className="text-center">
                            <h5>No Package found.</h5>
                        </div>
                    ) : ([])}
                </div>
            </div>
        </div>
    );
}

export default UserPackages;
