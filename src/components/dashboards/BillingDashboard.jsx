import { motion } from 'framer-motion';
import { useState } from 'react';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function BillingDashboard() {
  const [billItems, setBillItems] = useState([{ id: 1, name: '', quantity: 1, price: 0 }]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    doctorName: '',
    prescriptionNo: ''
  });
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });

  const addItem = () => {
    setBillItems([
      ...billItems,
      {
        id: billItems.length + 1,
        name: '',
        quantity: 1,
        price: 0
      }
    ]);
  };

  const updateItem = (id, field, value) => {
    setBillItems(billItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id) => {
    if (billItems.length > 1) {
      setBillItems(billItems.filter(item => item.id !== id));
    }
  };

  const calculateTotal = () => {
    const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    return {
      subtotal: subtotal.toFixed(2),
      gst: gst.toFixed(2),
      total: (subtotal + gst).toFixed(2)
    };
  };

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Generate Bill</h1>
        <div className="quick-actions">
          <button className="action-button" onClick={handlePrint}>Print Bill</button>
          <button className="action-button">Save Draft</button>
        </div>
      </motion.div>

      <div className="dashboard-content" ref={printRef}>
        <div className="billing-form">
          <div className="customer-info">
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder="Enter customer name" 
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="Enter phone number" 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Doctor's Name</label>
                <input 
                  type="text" 
                  value={customerInfo.doctorName}
                  onChange={(e) => setCustomerInfo({...customerInfo, doctorName: e.target.value})}
                  placeholder="Enter doctor's name" 
                />
              </div>
              <div className="form-group">
                <label>Prescription No.</label>
                <input 
                  type="text" 
                  value={customerInfo.prescriptionNo}
                  onChange={(e) => setCustomerInfo({...customerInfo, prescriptionNo: e.target.value})}
                  placeholder="Enter prescription number" 
                />
              </div>
            </div>
          </div>

          <div className="medicine-list">
            <h3>Medicines</h3>
            {billItems.map((item) => (
              <div key={item.id} className="medicine-item">
                <input 
                  type="text" 
                  placeholder="Medicine name"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Quantity"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                />
                <input 
                  type="number" 
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                />
                <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                >×</button>
              </div>
            ))}
            <button className="add-medicine" onClick={addItem}>+ Add Medicine</button>
          </div>

          <div className="bill-summary">
            <div className="summary-item">
              <span>Bill Date</span>
              <span>{format(new Date(), 'dd/MM/yyyy')}</span>
            </div>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{calculateTotal().subtotal}</span>
            </div>
            <div className="summary-item">
              <span>GST (18%)</span>
              <span>₹{calculateTotal().gst}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount</span>
              <span>₹{calculateTotal().total}</span>
            </div>
          </div>

          <button className="generate-bill">Generate & Save Bill</button>
        </div>
      </div>
    </div>
  );
}

export default BillingDashboard;