const Pagination = ({ page, size, sort, pages, count }) => {
    return (
        <div className="vstack">
            <div className="mt-4 d-flex justify-content-between">
                <div className="hstack gap-1">
                    <span style={{minWidth: '70px'}}>Sắp xếp: </span>
                    <select class="form-select form-select-sm me-3" aria-label=".form-select-sm example">
                        <option value="1" selected>id</option>
                        <option value="2">name</option>
                        <option value="3">price</option>
                    </select>
                    <span style={{minWidth: '50px'}}>Chiều: </span>
                    <select class="form-select form-select-sm me-3" aria-label=".form-select-sm example">
                        <option value="asc" selected>TĂNG</option>
                        <option value="desc">GIẢM</option>
                    </select>
                    <span style={{minWidth: '70px'}}>Hiển thị: </span>
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option value="1" selected>5</option>
                        <option value="2">10</option>
                        <option value="3">20</option>
                        <option value="1">50</option>
                        <option value="2">100</option>
                        <option value="3">200</option>
                        <option value="3">500</option>
                    </select>
                </div>
                <div class="d-flex" role="search">
                    <input class="form-control form-control-sm me-2 rounded" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success rounded btn-sm" type="submit">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-between">
                <p className="">
                    Tổng ? đơn vị
                </p>
                <nav aria-label="Page navigation example">
                    <ul class="pagination pagination-sm">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default Pagination;