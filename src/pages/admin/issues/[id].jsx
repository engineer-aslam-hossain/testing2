import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import EditIssueModal from "../../../components/EditIssueModal/EditIssueModal";

const headingH2 = {
	fontFamily: "PT Sans",
	fontStyle: "normal",
	fontWeight: "bold",
	fontSize: "40px",
	lineHeight: "52px",
	// margin: "20",
};

const meeting_wrapper1 = {
	border: "1px solid #E5E5E5",
	padding: "30px",
};
const content = {
	fontFamily: "PT Sans",
	fontStyle: "normal",
	fontWeight: "normal",
	fontSize: "14px",
	lineHeight: "18px",
};

export default function SingleIssue() {
	const router = useRouter();
	const [issue, setIssue] = useState(null);

	useEffect(() => {
		if (router.query.id) {
			getIssue();
		}
	}, [router.query.id]);

	const getIssue = async () => {
		const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
		let url = `${process.env.NEXT_PUBLIC_BASE_URL}/issue?id=${router.query.id}`;
		try {
			const res = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					DreamFinder: getToken,
				},
			});
			const data = await res.json();
			setIssue(data.data[0]);
		} catch (err) {
			console.log(err);
		}
	};

	if (!issue) return null;
	return (
		<Fragment>
			<div className="container">
				<h2 style={headingH2}>Issue Report on 11:43, 21 Feb, 2021 </h2>
				<div style={meeting_wrapper1}>
					<Row>
						<Col md={7}>
							<Row>
								<Col md={3}>
									<h6 className="mb-3">Created on</h6>
									<h6 className="mb-3">Issue Type</h6>
									<h6 className="mb-3">Property ID</h6>
									<h6 className="mb-3">Role of Issuer</h6>
									<h6 className="mb-3">Name</h6>
									<h6 className="mb-3">Phone</h6>
									<h6 className="mb-3">Zilla</h6>
									<h6 className="mb-3">Upazilla/Thana</h6>
									<h6 className="mb-3">STATUS</h6>
								</Col>
								<Col md={9} style={content}>
									<h6 className="mb-3">{issue.createdAt || "N/A"}</h6>
									<h6 className="mb-3">{issue.type || "N/A"}</h6>
									<h6 className="mb-3">{issue.property_id || "N/A"}</h6>
									<h6 className="mb-3">Tenant</h6>
									<h6 className="mb-3">{issue?.created_by?.name || "N/A"}</h6>
									<h6 className="mb-3">{issue?.created_by?.phone || "N/A"}</h6>
									<h6 className="mb-3">{issue?.created_by?.zilla || "N/A"}</h6>
									<h6 className="mb-3">
										{issue?.created_by?.upazilla || "N/A"}
									</h6>
									<h6 className="mb-3">{issue?.status || "N/A"}</h6>
								</Col>
							</Row>
						</Col>
						<Col md={3}></Col>
						<Col md={2}>
							<EditIssueModal issue={issue} getIssue={getIssue}>
								<Button style={{ background: " #6AB53E", marginLeft: "51px" }}>
									Edit Issue
								</Button>
							</EditIssueModal>
						</Col>
						<div className="d-flex">
							<h6 className="ml-3 mr-5">Description</h6>
							<span
								className=""
								style={{
									fontFamily: "PT Sans",
									fontStyle: "normal",
									fontWeight: "normal",
									fontSize: "14px",
									lineHeight: "18px",
									textAlign: "justify",
									color: "#474747",
									paddingRight: "15px",
									marginRight: "7px",
									marginLeft: "28px",
								}}
							>
								{issue?.msg || "N/A"}
							</span>
						</div>
					</Row>
				</div>
			</div>
		</Fragment>
	);
}
