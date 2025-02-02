import { motion } from 'framer-motion';
import { useState } from 'react';
import { format, addDays } from 'date-fns';

function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Analgesics',
      stock: 500,
      minStock: 100,
      expiryDate: format(addDays(new Date(), 365), 'yyyy-MM-dd'),
      price: 2.50,
      manufacturer: 'ABC Pharma'
    },
    {
      id: 2,
      name: 'Amoxicillin',
      category: 'Antibiotics',
      stock: 200,
      minStock: 50,
      expiryDate: format(addDays(new Date(), 180), 'yyyy-MM-dd'),
      price: 5.75,
      manufacturer: 'XYZ Healthcare'
    }
  ]);

  const categories = ['All', 'Analgesics', 'Antibiotics', 'Antacids', 'Vitamins', 'Others'];

  const getLowStockCount = () => inventory.filter(item => item.stock <= item.minStock).length;
  const getExpiringCount = () => {
    const thirtyDaysFromNow = addDays(new Date(), 30);
    return inventory.filter(item => new Date(item.expiryDate) <= thirtyDaysFromNow).length;
  };

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Inventory Management</h1>
        <div className="inventory-controls">
          <div className="search-filter">
            <input 
              type="text" 
              placeholder="Search medicines..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button 
            className="action-button"
            onClick={() => setShowAddModal(true)}
          >
            Add New Medicine
          </button>
        </div>
      </motion.div>

      <div className="dashboard-content">
        <div className="inventory-stats">
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Total Items</h3>
            <p>{inventory.length}</p>
          </motion.div>
          <motion.div 
            className="stat-card warning"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Low Stock</h3>
            <p>{getLowStockCount()}</p>
          </motion.div>
          <motion.div 
            className="stat-card danger"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Expiring Soon</h3>
            <p>{getExpiringCount()}</p>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Total Value</h3>
            <p>₹{inventory.reduce((sum, item) => sum + (item.price * item.stock), 0).toFixed(2)}</p>
          </motion.div>
        </div>

        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Min. Stock</th>
                <th>Expiry Date</th>
                <th>Price</th>
                <th>Manufacturer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory
                .filter(item => 
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (filterCategory === 'all' || item.category.toLowerCase() === filterCategory)
                )
                .map(item => (
                  <tr key={item.id} className={item.stock <= item.minStock ? 'low-stock' : ''}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td>{item.minStock}</td>
                    <td>{item.expiryDate}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>{item.manufacturer}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="restock-btn">Restock</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InventoryDashboard;