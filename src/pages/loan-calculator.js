import { useState } from "react";
import { Card, Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import { Range } from "react-range";
import fakeHomeLoanFaq from "../fakeData/fakeHomeLoanFaq";
import Link from "next/link";
import loanPeriod from "../fakeData/LoanPeriod";
const loanCalculator = () => {
  const [loanCalculation, setLoanCalculation] = useState({
    price: "0",
    period: 0,
    down_Payment: "0",
    interest_rate: "0",
  });

  const downPayment = [
    {
      id: 1,
      value: 5,
    },
    {
      id: 2,
      value: 10,
    },
    {
      id: 3,
      value: 15,
    },
    {
      id: 4,
      value: 20,
    },
    {
      id: 5,
      value: 25,
    },
    {
      id: 6,
      value: 30,
    },
    {
      id: 7,
      value: 40,
    },
    {
      id: 8,
      value: 50,
    },
  ];

  const [interestRate, setInterestRate] = useState([5]);
  const interestRateHandle = (values) => {
    setInterestRate(values);
    let interest = (values[0] / 100 / 12).toFixed(4);
    setLoanCalculation({
      ...loanCalculation,
      interest_rate: interest,
    });
  };
  const [downPaymentRate, setDownPaymentRate] = useState("5");
  const downPaymentHandle = (value) => {
    setDownPaymentRate(value);
    setLoanCalculation({
      ...loanCalculation,
      down_Payment: (loanCalculation.price * value) / 100,
    });
  };

  const submitHandler = async (e) => {
    const powerBase = 1 + +loanCalculation.interest_rate;
    const fullPeriod = loanCalculation.period * 12;

    const p = powerBase ** fullPeriod;

    // Math.pow(1 + +0.00315, 360);
    // var m = 385000 * ((0.00315 * p) / (p - 1));
    // console.log(m);
    // Math.pow(powerBase, fullPeriod);

    const pricipleMoney = loanCalculation.price - loanCalculation.down_Payment;
    let sum = pricipleMoney * ((loanCalculation.interest_rate * p) / (p - 1));

    setLoanCalculation({
      ...loanCalculation,
      monthlyInstallment: sum.toFixed(0),
    });
  };

  const calculateAgain = () => {
    setLoanCalculation({
      price: "0",
    });
    setDownPaymentRate("5");
    setInterestRate([5]);
  };
  return (
    <section className="loanCalculator" id="calculate">
      <section className="CalCulationTopHeader">
        <div className="container">
          <div className="row">
            <div className="col-md-12 loanCalculatorHeader d-flex justify-content-between flex-wrap">
              <div className="col-md-6 d-flex flex-column justify-content-center my-3">
                <h1>Loan Calculator</h1>
                <p>Calculate home loan for buying properties in Bangladesh</p>
              </div>
              <div className="col-md-5">
                <Card style={{ padding: "2rem 2rem" }} className="signUpCard">
                  <Form noValidate onSubmit={submitHandler}>
                    <Form.Group>
                      <Form.Label>Property Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Property Price."
                        name="price"
                        value={loanCalculation.price}
                        onChange={(e) =>
                          setLoanCalculation({
                            ...loanCalculation,
                            price: e.target.value,
                          })
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid" className="phone">
                        {/* {!CreateUser.phone ? "must have atleast 11 number" : ""} */}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="basicFormInput">
                      <Form.Label>Loan Period</Form.Label>
                      <Dropdown className="d-flex flex-column justify-content-center Gender">
                        <Dropdown.Toggle id="SignUpFormDropDown">
                          {loanCalculation.period
                            ? `${loanCalculation.period} Years`
                            : "Loan Period"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="SignUpFormDropDownMenu">
                          {loanPeriod.map((item) => (
                            <Dropdown.Item
                              key={item.id}
                              onSelect={() =>
                                setLoanCalculation({
                                  ...loanCalculation,
                                  period: item.value,
                                })
                              }
                              className="d-flex justify-content-center"
                            >
                              {item.value} years
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                    <Form.Group className="basicFormInput">
                      <Form.Label>Down Payment</Form.Label>
                      <Dropdown className="d-flex flex-column justify-content-center Gender">
                        <Dropdown.Toggle id="SignUpFormDropDown">
                          {/* {values.gender ? values.gender : "Gender"} */}
                          <div className="d-flex justify-content-between w-100 pr-3">
                            <h6 className="m-0">
                              {loanCalculation.down_Payment
                                ? loanCalculation.down_Payment
                                : "Down Payment"}
                            </h6>
                            <h6 className="m-0">{downPaymentRate}%</h6>
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="SignUpFormDropDownMenu">
                          {downPayment.map((item) => (
                            <Dropdown.Item
                              key={item.id}
                              onSelect={() => downPaymentHandle(item.value)}
                              className="d-flex justify-content-center"
                            >
                              {item.value} %
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Interest Rate</Form.Label>

                      <button
                        className="interestBtn w-100 align-items-center"
                        type="button"
                      >
                        <div className="d-flex justify-content-between align-items-center insideInterestBtn">
                          <h6>{loanCalculation.interest_rate}</h6>
                          <h6>{interestRate}%</h6>
                        </div>
                      </button>
                      <div className="my-4">
                        <Range
                          step={0.1}
                          min={5}
                          max={30}
                          values={interestRate}
                          onChange={(values) => interestRateHandle(values)}
                          renderTrack={({ props, children }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "6px",
                                width: "100%",
                                backgroundColor: "#666666",
                                borderRadius: "1rem",
                              }}
                            >
                              {children}
                            </div>
                          )}
                          renderThumb={({ props }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "20px",
                                width: "20px",
                                borderRadius: "50%",
                                outline: "none",
                                backgroundColor: "#BC9700",
                              }}
                            />
                          )}
                        />
                      </div>
                    </Form.Group>

                    <div className="mt-5">
                      <Link href="/loan-calculator#calculationResult">
                        <a
                          className="calculateBtn w-100"
                          onClick={submitHandler}
                        >
                          Calculate
                        </a>
                      </Link>
                    </div>
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container" id="calculationResult">
        <div className="row justify-content-between">
          {loanCalculation.monthlyInstallment ? (
            <div className="col-md-12 my-5">
              <div className="px-5">
                <h2 className="calculationTitle"> Calculation Results</h2>
              </div>
              <div className="col-md-12 d-flex flex-wrap calculationResult justify-content-between">
                <div className="col-md-4 px-0 calculationLeft d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex mb-2 justify-content-between">
                      <div className="px-0">
                        <p>Property Price</p>
                      </div>
                      <div className="">
                        <p>
                          <strong>BDT {loanCalculation.price}</strong>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex mb-2 justify-content-between">
                      <div className="px-0">
                        <p>Loan Period</p>
                      </div>
                      <p>
                        <strong>{loanCalculation.period} Years</strong>
                      </p>
                    </div>
                    <div className="d-flex mb-2 justify-content-between">
                      <div className="px-0">
                        <p>Down Payment</p>
                      </div>
                      <p>
                        <strong>
                          BDT {loanCalculation.down_Payment} ({downPaymentRate}{" "}
                          %)
                        </strong>
                      </p>
                    </div>
                    <div className="d-flex mb-2 justify-content-between">
                      <div className=" px-0 d-flex justify-content-between flex-wrap">
                        <p>Interest Rate</p>
                      </div>
                      <p>
                        <strong>
                          BDT {loanCalculation.interest_rate} ({interestRate} %)
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="my-4">
                    <Link href="/loan-calculator#calculate">
                      <a onClick={calculateAgain} className="calculateAgain">
                        CALCULATE AGAIN
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="calculationRight">
                    <div>
                      <div className="">
                        <h6>monthly installment</h6>
                        <h1>BDT {loanCalculation.monthlyInstallment} </h1>
                      </div>
                      <div className="my-3">
                        <h6>Loan Period</h6>
                        <h1>{loanCalculation.period} Years </h1>
                      </div>
                      <div className="">
                        <h6>Loan Amount</h6>
                        <h1>
                          BDT{" "}
                          {(
                            loanCalculation.monthlyInstallment *
                            loanCalculation.period *
                            12
                          ).toFixed(0)}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="col-md-12 my-5">
            <div className="px-5 homeloanTitle w-100 pb-4">
              <h2 className="calculationTitle"> Bank Home Loans</h2>
            </div>
            <div className="col-md-12 d-flex flex-wrap bankHomeLoan">
              <Table borderless className="my-3">
                <tbody>
                  <tr className="flex-wrap">
                    <td>
                      <img src="/" alt="bank_Logo" className="img-fluid" />
                    </td>
                    <td>
                      <p>Bank</p>
                      {/* <h3>City Bank Limited Home Load</h3> */}
                    </td>
                    <td>
                      <p>Interest Rate</p>
                      {/* <h3>8.75%</h3> */}
                    </td>
                    <td>
                      <p>Monthly Installment</p>
                      {/* <h3>BDT 79,533</h3> */}
                    </td>
                    <td>
                      <button className="applyNowBtn">Apply Now</button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-12 mb-5">
            <div>
              <div className="my-5">
                <h1 className="faqTitle">
                  Frequently Asked Questions (FAQ) about Home Loans in
                  Bangladesh
                </h1>
              </div>
              {fakeHomeLoanFaq.map((item) => (
                <div key={item.id}>
                  <div className="mb-4">
                    <h5 className="faqQuestion">{item.ques}</h5>
                    <p className="faqAns">{item.ans}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loanCalculator;
