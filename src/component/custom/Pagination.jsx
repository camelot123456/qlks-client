import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Pagination = ({pageable, onPageable, onChange, fields}) => {
    const { page, size, sort, pages, count, search } = pageable;
    const dispatch = useDispatch();
    const [pageableOption, setPageableOption] = useState({ page, size, sort, pages, count, search });
    const searchRef = useRef();

    useEffect(() => {
        console.log({ page, size, sort, pages, count, search } );
        if (onChange) {
            onChange(true);
        }
        if (onPageable) {
            dispatch(onPageable(pageableOption));
        }
    }, [pageableOption]);
    
    const getArrayMapper = () => {
        const arrResult = [];
        for (let index = 0; index < pages; index++) {
            arrResult.push(index);
        }
        return arrResult;
    };

    const isActive = (_page) => {
        return _page === +page ? 'active' : '';
    };

    const onChangePage = (_page) => {
        setPageableOption(prev => ({
            ...prev,
            page: _page
        }));
    }

    const onChangeSize = (_size) => {
        setPageableOption(prev => ({
            ...prev,
            size: _size
        }));
    }

    const onChangeField = (_field) => {
        console.log(_field);
        setPageableOption(prev => ({
            ...prev,
            sort: [_field, prev.sort.split(',')[1]].join(',')
        }));
    }

    const onChangeDir = (_dir) => {
        setPageableOption(prev => ({
            ...prev,
            sort: [prev.sort.split(',')[0], _dir].join(',')
        }));
    }

    const onSearch = () => {
        setPageableOption(prev => ({
            ...prev,
            search: searchRef.current.value || ''
        }));
    }

    return (
        <div className="vstack">
            <div className="mt-4 d-flex justify-content-between">
                <div className="hstack gap-1">
                    <span style={{minWidth: '70px'}}>Sắp xếp: </span>
                    <select className="form-select form-select-sm me-3" aria-label=".form-select-sm example"
                        onChange={(e) => onChangeField(e.target.value)}
                    >
                        {fields.map(orderField => (
                            <option key={orderField.key} value={orderField.key}
                            >{orderField.value}</option>
                        ))}
                    </select>
                    <span style={{minWidth: '50px'}}>Chiều: </span>
                    <select className="form-select form-select-sm me-3" aria-label=".form-select-sm example"
                        onChange={(e) => onChangeDir(e.target.value)}
                    >
                        <option value="asc" defaultValue>TĂNG</option>
                        <option value="desc">GIẢM</option>
                    </select>
                    <span style={{minWidth: '70px'}}>Hiển thị: </span>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example"
                        onChange={(e) => onChangeSize(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20" defaultValue>20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="500">500</option>
                    </select>
                </div>
                <div className="d-flex" role="search">
                    <input className="form-control form-control-sm me-2 rounded" type="search" placeholder="Search" 
                        aria-label="Search" ref={searchRef}
                    />
                    <button className="btn btn-outline-success rounded btn-sm"
                        onClick={() => onSearch()}
                    >
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-between">
                <p className="">
                    {`Tổng ${pages} trang, ${count} phần tử, sắp xếp theo ${sort}, số phần tử hiển thị ${size}`}
                </p>
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <i className="fa fa-angle-left" aria-hidden="true"></i>
                            </a>
                        </li>
                        {pages && getArrayMapper().map(pageItem => (
                            <li className={`page-item ${isActive(pageItem)}`} key={pageItem}>
                                <a className="page-link" href={`#page-${pageItem + 1}`}
                                    onClick={() => onChangePage(pageItem)}
                                >{pageItem + 1}</a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default Pagination;