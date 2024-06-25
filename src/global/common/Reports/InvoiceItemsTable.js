import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableRow from './InvoiceTableRow';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 0,
        borderBottom:0,
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableRow items={invoice} />        
    </View>
  );
  
  export default InvoiceItemsTable