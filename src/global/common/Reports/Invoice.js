import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";

import InvoiceItemsTable from "./InvoiceItemsTable";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: 1.5,
    flexDirection: "column",
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <InvoiceItemsTable invoice={invoice} />
    </Page>
  </Document>
);

export default Invoice;
