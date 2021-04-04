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
			display: "flex",
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

const AddNewLeadModal = ({ children, getAllleads }) => {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);
	const [formValues, setFormValues] = useState({
		leadType: "Owner",
		owner_role: "Owner",
		owner_purpose: "Rent",
		division: "",
		zilla: "",
		upazilla: "",
		name: "",
		property_id: "",
		phone: "",
		email: "",
		address: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = async () => {
		try {
			const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lead`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					DreamFinder: getToken,
				},
				body: JSON.stringify({
					...formValues,
					lead_type: formValues.leadType,
					...(formValues.property_id.length > 0
						? { property_id: formValues.property_id }
						: { property_id: undefined }),
					...(formValues.division.length > 0
						? { division: formValues.property_id }
						: { division: undefined }),
					...(formValues.zilla.length > 0
						? { zilla: formValues.property_id }
						: { zilla: undefined }),
					...(formValues.upazilla.length > 0
						? { upazilla: formValues.property_id }
						: { upazilla: undefined }),
					leadType: undefined,
					comment: undefined,
				}),
			});
			const data = await res.json();
			if (data) {
				getAllleads();
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
					<h3>Generate a new Lead</h3>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="lead-type">
									Lead Type <span className="required">*</span>
								</label>
								<select
									name="leadType"
									onChange={handleChange}
									defaultValue={formValues.leadType}
								>
									<option value="Owner">Owner</option>
									<option value="Tenant">Tenant</option>
									<option value="Buyer">Buyer</option>
								</select>
							</div>
						</div>
					</div>

					{formValues.leadType !== "Owner" && (
						<div className="row">
							<div className="col-md-12">
								<div className={classes.inputGroup}>
									<label htmlFor="property-id">Property ID</label>
									<input
										type="text"
										placeholder="N/A"
										name="property_id"
										value={formValues.property_id}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>
					)}

					{formValues.leadType === "Owner" && (
						<div className="row">
							<div className="col-md-6">
								<div className={classes.inputGroup}>
									<label htmlFor="owners-role">Owner's Role</label>
									<select name={formValues.owner_role} onChange={handleChange}>
										<option value="Owner">Owner</option>
									</select>
								</div>
							</div>
							<div className="col-md-6">
								<div className={classes.inputGroup}>
									<label htmlFor="owners-purpose">Owner's Purpose</label>
									<select
										name={formValues.owner_purpose}
										onChange={handleChange}
									>
										<option value="Rent">Rent</option>
									</select>
								</div>
							</div>
						</div>
					)}

					<div className="row">
						<div className="col-md-4">
							<div className={classes.inputGroup}>
								<label htmlFor="division">Division</label>
								<select name={formValues.division} onChange={handleChange}>
									<option>Select Division</option>
								</select>
							</div>
						</div>
						<div className="col-md-4">
							<div className={classes.inputGroup}>
								<label htmlFor="zilla">Zilla</label>
								<select name={formValues.zilla} onChange={handleChange}>
									<option>Select Zilla</option>
								</select>
							</div>
						</div>
						<div className="col-md-4">
							<div className={classes.inputGroup}>
								<label htmlFor="upazilla">Upazilla/Thana</label>
								<select name={formValues.upazilla} onChange={handleChange}>
									<option>Select Thana/Upazilla</option>
								</select>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="address">Address of the Client</label>
								<input
									type="text"
									placeholder="Detailed address if necessary"
									value={formValues.address}
									name="address"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="name">Name</label>
								<input
									type="text"
									placeholder="Name of the Potential Client"
									value={formValues.name}
									name="name"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="phone">Phone Number</label>
								<input
									type="text"
									value={formValues.phone}
									name="phone"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="email">Email Address</label>
								<input
									type="text"
									value={formValues.email}
									name="email"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className={classes.inputGroup}>
								<label htmlFor="comment">Comment</label>
								<textarea
									cols="30"
									rows="10"
									value={formValues.comment}
									name="comment"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className={classes.btnGroup}>
						<button onClick={handleSubmit}>Create New Lead</button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default AddNewLeadModal;
