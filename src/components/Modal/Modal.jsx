import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles({
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		background: "rgba(0,0,0,.5)",
		width: "100vw",
		height: "100vh",
		overflowY: "auto",
		zIndex: "10000",
	},
	modal: {
		position: "absolute",
		top: "150px",
		left: "50%",
		transform: "translateX(-50%)",
		width: "700px",
		background: "#FFFDF7",
		border: "1px solid #C7C7C7",
		boxSizing: "border-box",
		borderRadius: "4px",
	},
});

const Modal = ({ open, children, closeModal }) => {
	const classes = useStyles();

	useEffect(() => {
		const body = document.querySelector("body");
		if (open) body.style.overflow = "hidden";
		else body.style.overflow = "unset";
	}, [open]);

	if (!open) return null;
	return (
		<div className={classes.overlay} onClick={closeModal}>
			<div className={classes.modal} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
