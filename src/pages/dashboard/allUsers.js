import { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20);

  const previousPage = () => {
    pageNo > 1 && setPageNo(pageNo - 1);
    startIndex > 0 && setStartIndex(startIndex - 20);
    endIndex > 20 && setEndIndex(endIndex - 20);
  };
  const nextPage = () => {
    setPageNo(pageNo + 1);
    setStartIndex(startIndex + 20);
    setEndIndex(endIndex + 20);
  };
  //   console.log(startIndex, endIndex);
  const searchLoadData = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("dreamfinder_session"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/search`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            dreamfinder: getToken,
          },
        }
      );
      const data = await res.json();
      setAllUsers(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchLoadData();
  }, []);

  //   console.log(allUsers);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 findPropertyHeader ">
            <div>
              <h1>Blog Posts</h1>
            </div>
          </div>
          <div className="col-md-12 allPropertiesListTable">
            <Table hover>
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="">
                {allUsers.slice(startIndex, endIndex).map((item) => (
                  <tr key={item._id}>
                    <td className="">{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>
                      {item.role &&
                        item.role.map((singleRole) => ` ${singleRole}, `)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-md-12 d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{pageNo}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
