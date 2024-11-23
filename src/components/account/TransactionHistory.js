import {format} from "date-fns";
import {useEffect, useState} from "react";
import {loadScripts} from "../../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import transactionServices from "../../services/transaction-services";


const TransactionHistory = () => {
    useEffect(() => {
        loadScripts()
    }, []);


    const user = useSelector(state => state.auth);
    const token = user.userData.token;

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    const [pageNo, setPageNo] = useState(1)
    const [pageArr, setPageArr] = useState([]);

    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = async () => {
        const res = await transactionServices.getUserTransactions(pageNo, axiosConfig);
        setTransactions(res);
        setPageArr(Array.from({length: res.totalPages}, (v, i) => i + 1));
    }

    useEffect(() => {
        fetchTransactions();
    },[pageNo]);

    console.log(transactions);

    return (
        <div>
            <div className="contact-form-wrap">
                <div className="widget-title mb-50">
                    <h5 className="title">Transaction history</h5>
                </div>
                <div className="contact-form">
                    <table className="table" style={{color: '#fff'}}>
                        <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Gateway</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Content</th>
                            <th scope="col">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(transactions.data) && transactions.data.length > 0 ? transactions.data.map((trans, index) => (
                            <tr key={index}>
                                <td>{trans.code}</td>
                                <td>{trans.gateway}</td>
                                <td>${trans.amount}</td>
                                <td>{trans.status ===1 ? "Success" : "Failure"}</td>
                                <td>Paid for: {trans.isPackage ? trans.packageName : trans.movieTitle}</td>
                                <td>{format(new Date(trans.createdAt), 'yyyy-MMM-dd')}</td>
                            </tr>
                        )) : ([])}
                        </tbody>
                    </table>
                    {!Array.isArray(transactions.data) || transactions.data.length === 0 ? (
                        <div className="text-center">
                            <h5>No movie found.</h5>
                        </div>
                    ) : ([])}
                    <div className={'row'}>
                        <div className="col">
                            {transactions.toItem > 0 ? (
                                <strong>Showing {transactions.fromItem} to {transactions.toItem} of {transactions.totalItems} entries</strong>
                            ) : ([])}
                        </div>
                        <div className="col">
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm justify-content-end">
                                    {transactions.currentPage > 1 ? (
                                        <li className="page-item">
                                            <button className="page-link"
                                                    style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                    onClick={() => {
                                                setPageNo(pageNo - 1)
                                            }}>Previous
                                            </button>
                                        </li>
                                    ) : ([])}
                                    {Array.isArray(pageArr) && pageArr.length > 0 ? pageArr.map((page, index) => (
                                        <div>
                                            {page === pageNo ? (
                                                <li className="page-item" key={index}>
                                                    <button className="page-link text-warning"
                                                            style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                            onClick={() => setPageNo(page)}>{page}</button>
                                                </li>
                                            ) : (
                                                <li className="page-item" key={index}>
                                                    <button className="page-link"
                                                            style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                            onClick={() => setPageNo(page)}>{page}</button>
                                                </li>
                                            )}
                                        </div>
                                    )) : ([])}
                                    {transactions.currentPage < transactions.totalPages ? (
                                        <li className="page-item">
                                            <button className="page-link"
                                                    style={{color: '#ffffff', backgroundColor: '#100f18'}}
                                                    onClick={() => {
                                                setPageNo(pageNo + 1)
                                            }}>Next
                                            </button>
                                        </li>
                                    ) : ([])}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory;
