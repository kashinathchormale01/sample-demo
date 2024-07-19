import { Button } from '@mui/material';
import React, { useState, useEffect} from 'react';
import moment from 'moment';

const BankApp = (props) => {
    const [applicationData, setApplicationData] = useState(props.data);

    useEffect(() => {
      setApplicationData(props.data);
    }, [props.data]);

    const clickhandle = async () => {
      const convertspdf = document.getElementById("converts");
      let mywindow = window.open("Application to Bank", "Save");
      mywindow.document.write(convertspdf.innerHTML);
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      mywindow.close();

      return true;
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-IN").format(amount);
    };    
  
  return (
    <>
      {props && (
        <>
          {applicationData?.map((data, index) => (
            <React.Fragment key={index}>
              <div className="wrapperPrint">
                <div
                  id="converts"
                  className="card border-0 shadow overflow-hidden p-2 rounded-0"
                >
                  <div className="row align-items-center no-gutters">
                    <div className="col-md-12 order-2 order-md-1">
                      <div className="card-body content">
                        <div className="row">
                          <div className="col-12 mb-4">
                            <p className="mb-1" style={{ textAlign: "right" }}>
                              Date:{" "}
                              {moment(data?.applicationDate).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                            <p className="mb-0">To,</p>
                            <p className="mb-0">
                              <b>{data?.bnkNameApp}</b>
                            </p>
                            <p className="mb-0">
                              <b>{data?.bnkBranchApp}</b>
                            </p>
                            <p className="mb-0">
                              <b>{data?.bankAdress}</b>
                            </p>
                          </div>
                          <div className="col-12">
                            <p>Dear Sir/Madam,</p>
                            <p>
                              Enclosed please find a list of our workman and
                              Cheque Number. '<b>{data?.chequenumApp}</b>'
                            </p>
                            <p>
                              Dated on.{" "}
                              <b>
                                {moment(data?.chequeDateApp).format(
                                  "DD/MM/YYYY"
                                )}
                              </b>{" "}
                              draw in faviour of you, for Rs.{" "}
                              <b>{formatCurrency(data?.AmountbnkApp)}</b> /- and
                              arrange to credit the amount mentioned against
                              each Workman to their respective saving Bank A/C.
                              No. held by you and conform having Done so.
                            </p>
                            <p>Thanking You,</p>
                            <p>
                              <b>{data?.chequeBy}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={clickhandle}
                >
                  {" "}
                  Save or Print PDF
                </Button>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
  
}

export default BankApp