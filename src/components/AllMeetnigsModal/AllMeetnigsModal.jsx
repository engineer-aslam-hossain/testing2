import { makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
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
	},
	mettingsWrapper: {
		padding: "20px 0",
	},
	mettingsItem: {
		display: "grid",
		gridTemplateColumns: "1fr 100px",
		background: "#FFFFFF",
		border: "1px solid #C7C7C7",
		boxSizing: "border-box",
		borderRadius: "4px",
		padding: "10px",
		"& span": {
			display: "block",
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "12px",
			lineHeight: "150.7%",
			color: "#474747",
		},
		"& > div:last-child": {
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "14px",
			lineHeight: "18px",
			color: "#474747",
			cursor: "pointer",
		},
	},
});

const AllMeetnigsModal = ({ children, date }) => {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);
	const [meetings, setMeetings] = useState([]);

	useEffect(() => {
		if (openModal) {
			getAllMettings();
		}
	}, [openModal]);

	const getAllMettings = async () => {
		const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
		let url = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/day_view?date=${date}`;
		try {
			const res = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					DreamFinder: getToken,
				},
			});
			const data = await res.json();
			setMeetings(data.data);
		} catch (err) {
			console.log(err);
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
					<h3>Meetings on 4 March, 2021</h3>

					<div className={classes.mettingsWrapper}>
						{meetings.map((metting) => (
							<div key={meeting._id} className={classes.mettingsItem}>
								<div>
									<span>
										Meeting With: {meeting?.assigned_for?.name || "N/A"}
									</span>
									<span>Lead Type: {meeting?.lead_id?.lead_type || "N/A"}</span>
									<span>Created on: {meeting?.date || "N/A"}</span>
								</div>
								<div>VIEW DETAILS</div>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default AllMeetnigsModal;
