import { useContext } from "react";
import { Modal } from "react-bootstrap";
import DreamFinderContext from "../Context/Context";
import CloseIcon from "@material-ui/icons/Close";
import ModalSearchInputGroup from "../ModalSearchInputGroup/ModalSearchInputGroup";
import { useRouter } from "next/router";

const ModalSearchComponent = ({ show, handleClose }) => {
  const {
    searchData,
    SetSearchData,
    findProperty,
    setFindProperty,
  } = useContext(DreamFinderContext);

  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  //   const showBtnHandler = (item) => {
  //     handleShow();
  //     setFindProperty(item);
  //   };
  const router = useRouter();
  const findHandler = () => {
    router.push("/findProperties");
    handleClose();
  };
  return (
    <Modal
      dialogClassName="modal-90w"
      show={show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Body className="position-relative">
        <div className="col-md-12 col-sm-12 d-flex justify-content-between align-items-center ">
          <h3 className="filterSearch">Search Filters</h3>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className="modalBtnDiv col-sm-12 col-md-12 d-flex justify-content-between px-3">
          <button
            className={`w-100 rent ${findProperty === "Rent" && "active"}`}
            onClick={() => setFindProperty("Rent")}
          >
            Rent
          </button>
          <button
            className={`w-100 ${findProperty === "Sell" && "active"}`}
            onClick={() => setFindProperty("Sell")}
          >
            Sale
          </button>
          <button
            className={`w-100 ${findProperty === "new_project" && "active"}`}
            onClick={() => setFindProperty("new_project")}
          >
            Projects
          </button>
          <button
            className={`w-100 auction ${
              findProperty === "Auction" && "active"
            }`}
            onClick={() => setFindProperty("Auction")}
          >
            Auction
          </button>
        </div>
        <ModalSearchInputGroup />
        <div className="col-md-12 col-sm-12 fixedDiv">
          <div className="searchModalFooter px-3">
            <button
              className="w-100 resetFilter text-dark font-weight-bold"
              onClick={() => SetSearchData({})}
            >
              Reset Filter
            </button>
            <button className="w-100 calculateAgain mt-3" onClick={findHandler}>
              Find
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSearchComponent;
