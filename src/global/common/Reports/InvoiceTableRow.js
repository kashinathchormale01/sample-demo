import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: {
    marginTop: 0,
    padding: 2,
    flexGrow: 1,
  },
  TopsideTable: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    marginTop: "20pt",
  },
  TopsideRow: {
    margin: "auto",
    flexDirection: "row",
  },
  TopsideCol: {
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    width: "16.66%",
  },
  TopsideCell: {
    padding: 0,
    fontSize: 8,
  },
  topsidefirst: {
    width: "10%",
  },
  topsidesecond: { width: "20%", lineHeight: "1.1" },
  topsidethird: { width: "20%" },
  table: {
    display: "table",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    margin: "auto",
  },
  tableColTop: {
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "left",
  },
  tableColToplast: {
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderRightWidth: 1,
  },
  tableCol: {
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 2,
    fontSize: 8,
    textAlign: "left",
    wordBreak: "word-break",
  },
  srno: {
    transform: "rotate(270deg)",
    padding: "10px 0",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: "6vh",
    margin: "auto",
    marginLeft: "-11pt",
  },
  srnowrapper: {
    width: "1.5%",
  },
  slnoregister: {
    width: "6vh",
    padding: "2pt",
    marginLeft: "-5pt",
  },
  deductionsection: {
    margin: "0",
  },
  tableRowDeduction: {
    flexDirection: "row",
  },
  tableDeductionCell: {
    margin: "0 0 0 70pt",
  },
  tableDeductionCol: {
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottom: 0,
  },
});

const customWidth = StyleSheet.create({
  extraExtraSmall: {
    width: "1%",
  },
  extraSmall: {
    width: "1.5%",
  },
  verySmall: {
    width: "3%",
  },
  Smallmid: {
    width: "3.5%",
  },
  small: {
    width: "5%",
  },
  verymediuam: {
    width: "10%",
  },
  mediuam: {
    width: "12%",
  },
  mediuamMid: {
    width: "11.6%",
  },
  large: {
    width: "auto",
    border: 0,
  },
});

const textRotate = StyleSheet.create({
  rotate: {
    transform: "rotate(270deg)",
    margin: "auto",
    padding: "10pt 0",
    lineHeight: "10%",
  },
  textoverflow: {
    maxWidth: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: 2,
  },
});

const InvoiceTableRow = ({ items }) => {
  console.log('items in row',items)
  const rows = items.map((item) => (
    <>
      {/* Upper section */}
      <View style={styles.section}>
        <View style={styles.TopsideTable}>
          <View style={styles.TopsideRow}>
            <View style={[styles.TopsideCol, styles.topsidefirst]}>
              <Text style={styles.TopsideCell}>M/s</Text>
            </View>
            <View style={[styles.TopsideCol, styles.topsidesecond]}>
              <Text style={styles.TopsideCell}>N.K.Sharma</Text>
            </View>
            <View style={[styles.TopsideCol, styles.topsidethird]}>
              <Text style={styles.TopsideCell}>FORM XIX SeeRule 78(1) (b)</Text>
            </View>
            <View style={styles.TopsideCol}>
              <Text style={styles.TopsideCell}>Period………</Text>
            </View>
            <View style={styles.TopsideCol}>
              <Text style={styles.TopsideCell}>{item.startDate}</Text>
            </View>
            <View style={styles.TopsideCol}>
              <Text style={styles.TopsideCell}>Wage Slip</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Header section */}
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.srnowrapper]}>
              <Text style={[styles.tableCell, styles.srno]}>Serial No</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text
                style={[
                  styles.tableCell,
                  textRotate.rotate,
                  styles.slnoregister,
                ]}
              >
                Sl.No.in the Reg.
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text
                style={[
                  styles.tableCell,
                  textRotate.rotate,
                  styles.slnoregister,
                ]}
              >
                P.F.Account No
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.mediuamMid]}>
              <Text style={styles.tableCell}>Name of Workmen</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Father's Name</Text>
            </View>
            <View style={[styles.tableCol, customWidth.extraSmall]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>Sex</Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>
                Designation / Nature
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>
                No.of days worked
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.extraSmall]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>P.L</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>Holiday</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>HRA Fix</Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={[styles.tableCell, textRotate.rotate]}>
                Rate of Wage
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text
                style={[
                  styles.tableCell,
                  textRotate.rotate,
                  { width: "6vh", marginLeft: "-5pt" },
                ]}
              >
                No.of OT hours worked
              </Text>
            </View>

            <View style={styles.tableCol}>
              <View style={styles.TopsideTable}>
                <View style={styles.tableRowDeduction}>
                  <View style={[styles.tableCol, customWidth.large]}>
                    <Text style={[styles.tableCell, styles.deductionsection]}>
                      Amount of Wages Earned
                    </Text>
                  </View>
                  <View style={[styles.tableCell, customWidth.large]}>
                    <Text
                      style={[
                        styles.tableCell,
                        styles.deductionsection,
                        styles.tableDeductionCell,
                      ]}
                    >
                      Deductions
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRowDeduction}>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>Basic Wages</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>HRA</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>OT Wages</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>Total Wages</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>PF</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>Professional Tax</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>ESIC</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>LWF</Text>
                  </View>
                  <View style={[styles.tableCol1, styles.tableDeductionCol]}>
                    <Text style={styles.tableCell}>Coupon</Text>
                  </View>
                  <View
                    style={[
                      styles.tableCol1,
                      styles.tableDeductionCol,
                      { borderRightWidth: "0" },
                    ]}
                  >
                    <Text style={styles.tableCell}>Adv.</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.tableCol, customWidth.small]}>
              <Text style={styles.tableCell}>Total Deduction</Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={styles.tableCell}>Net Amount</Text>
            </View>
            <View style={[styles.tableCol, customWidth.extraSmall]}>
              <Text
                style={[
                  styles.tableCell,
                  textRotate.rotate,
                  { width: "6vh", marginLeft: "-11pt" },
                ]}
              >
                Signature
              </Text>
            </View>
          </View>

          <View
            key={item.serialNo}
            style={[styles.tableRow, { maxHeight: "20pt" }]}
          >
            <View style={[styles.tableCol, styles.srnowrapper]}>
              <Text style={styles.tableCell}>{item.serialNo}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text style={styles.tableCell}>{item.registerNo}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              {/* <Text
               style={[
                  styles.tableCell,
                  {
                    verflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                ]}
              >{item.pfAccountNo}</Text> */}
               <Text
                style={[
                  styles.tableCell,
                  {
                    verflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                  textRotate.textoverflow,
                ]}
              >
                {item.pfAccountNo}
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.mediuamMid]}>
              <Text
                style={[
                  styles.tableCell,
                  {
                    verflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                ]}
              >
                {item.name}
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "6.9%" }]}>
              <Text style={[styles.tableCell, textRotate.textoverflow]}>
                {item.fatherName}
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.extraSmall]}>
              <Text style={[styles.tableCell, textRotate.textoverflow]}>
                {item.gender}
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={[styles.tableCell, textRotate.textoverflow]}>
                {item.RoleName}
              </Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={styles.tableCell}>{item.daysWorked}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.extraSmall]}>
              <Text style={styles.tableCell}>{item.pl}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text style={styles.tableCell}>{item.holidays}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.verySmall]}>
              <Text style={styles.tableCell}>{item.hraFix}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={styles.tableCell}>{item.rateofwage}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={styles.tableCell}>{item.otHoursWorked}</Text>
            </View>
            <View style={[styles.tableCol, { width: "6.1%" }]}>
              <Text style={styles.tableCell}>{item.basicWages}</Text>
            </View>
            <View style={[styles.tableCol, { width: "2.7%" }]}>
              <Text style={styles.tableCell}>{item.hra}</Text>
            </View>
            <View style={[styles.tableCol, { width: "5.1%" }]}>
              <Text style={styles.tableCell}>{item.otwages}</Text>
            </View>
            <View style={[styles.tableCol, { width: "5.9%" }]}>
              <Text style={styles.tableCell}>{item.totalWages}</Text>
            </View>
            <View style={[styles.tableCol, { width: "1.8%" }]}>
              <Text style={styles.tableCell}>{item.pf}</Text>
            </View>
            <View style={[styles.tableCol, { width: "7.6%" }]}>
              <Text style={styles.tableCell}>{item.pt}</Text>
            </View>
            <View style={[styles.tableCol, { width: "2.9%" }]}>
              <Text style={styles.tableCell}>{item.esic}</Text>
            </View>
            <View style={[styles.tableCol, { width: "2.6%" }]}>
              <Text style={styles.tableCell}>{item.serialNo}</Text>
            </View>
            <View style={[styles.tableCol, { width: "4%" }]}>
              <Text style={styles.tableCell}>{item.coupon}</Text>
            </View>
            <View style={[styles.tableCol, { width: "2.4%" }]}>
              <Text style={styles.tableCell}>{item.adv}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.small]}>
              <Text style={styles.tableCell}>{item.totalDeduction}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.Smallmid]}>
              <Text style={styles.tableCell}>{item.netAmount}</Text>
            </View>
            <View style={[styles.tableCol, customWidth.extraSmall]}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
        </View>
      </View>
    </>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
