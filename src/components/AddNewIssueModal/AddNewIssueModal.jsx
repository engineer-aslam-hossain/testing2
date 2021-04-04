import { makeStyles } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import Modal from "../Modal/Modal";

const useStyles = makeStyles({
	root: {
		padding: "30px",
		"& h3": {
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "20px",
			lineHeight: "26px",
			color: "#474747",
			marginBottom: "30px",
		},
		"& .row": {
			marginTop: "12px",
		},
	},
	inputGroup: {
		width: "100%",
		"& label": {
			display: "block",
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "14px",
			lineHeight: "18px",
			color: "#474747",
			"& span.required": {
				color: "red",
				fontSize: "18px",
			},
		},
		"& select": {
			width: "100%",
			height: "36px",
			background: "#FFFFFF",
			border: "1px solid #C7C7C7",
			boxSizing: "border-box",
			borderRadius: "4px",
			padding: "0 10px",
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "12px",
			lineHeight: "16px",
			color: "#747474",
			outline: "none",
		},
		"& input": {
			width: "100%",
			height: "36px",
			background: "#FFFFFF",
			border: "1px solid #C7C7C7",
			boxSizing: "border-box",
			borderRadius: "4px",
			padding: "0 10px",
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "12px",
			lineHeight: "16px",
			color: "#747474",
			outline: "none",
		},
		"& textarea": {
			width: "100%",
			background: "#FFFFFF",
			border: "1px solid #C7C7C7",
			boxSizing: "border-box",
			borderRadius: "4px",
			padding: "0 10px",
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "12px",
			lineHeight: "16px",
			color: "#747474",
			outline: "none",
		},
	},
	btnGroup: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "30px",
		"& button": {
			width: "180px",
			height: "36px",
			background: "#BC9700",
			borderRadius: "4px",
			border: "none",
			outline: "none",
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "16px",
			lineHeight: "21px",
			color: "#FFFFFF",
			textTransform: "uppercase",
		},
	},
});

const AddNewIssueModal = ({ children, getAllIssues }) => {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);
	const [formValues, setFormValues] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
		type: "Feedback",
		msg: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = async () => {
		try {
			const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/issue`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					DreamFinder: getToken,
				},
				body: JSON.stringify({
					...formValues,
				}),
			});
			const data = await res.json();
			if (data) {
				getAllIssues();
				setOpenModal(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Fragment>
			{children &&
				React.cloneElement(children, {
					onClick: () => setOpenModal(true),
				})}
			<Modal open={openModal} closeModal={() => setOpenModal(false)}>
				<div className={classes.root}>
					<h3>New a Issue Report</h3>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="issuers-name">
									Issuer's Name <span className="required">*</span>
								</label>
								<input
									type="text"
									name="name"
									value={formValues.name}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="phone-no">
									Issuer's Phone No <span className="required">*</span>
								</label>
								<input
									type="text"
									name="phone"
									value={formValues.phone}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="email">
									Issuer's Email <span className="required">*</span>
								</label>
								<input
									type="text"
									name="email"
									value={formValues.email}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="address">Issuer's Address</label>
								<input
									type="text"
									name="address"
									value={formValues.address}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="issue-type">Issue Type</label>
								<select
									name="type"
									defaultValue={formValues.type}
									onChange={handleChange}
								>
									<option value="Feedback">Feedback</option>
									<option value="Complaint">Complaint</option>
								</select>
							</div>
						</div>
						{/* <div className="col-md-6">
							<div className={classes.inputGroup}>
								<label htmlFor="state-of-issue">State of Issue</label>
								<select>
									<option>Unresolved</option>
								</select>
							</div>
						</div> */}
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="details">Issue Details</label>
								<textarea
									cols="30"
									rows="10"
									name="msg"
									value={formValues.msg}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className={classes.btnGroup}>
						<button onClick={handleSubmit}>New Issue Report</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default AddNewIssueModal;
