import { motion } from 'framer-motion';
import { useState } from 'react';
import { format, addDays } from 'date-fns';

function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    mfgDate: '',
    expDate: '',
    batchNo: '',
    manufacturer: '',
    supplier: '',
    tags: [],
    stock: 0,
    minStock: 0,
    price: 0,
  });

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Analgesics',
      stock: 500,
      minStock: 100,
      mfgDate: '2023-12-01',
      expDate: '2024-12-01',
      batchNo: 'BATCH001',
      manufacturer: 'ABC Pharma',
      supplier: 'XYZ Distributors',
      tags: ['fever', 'headache', 'pain'],
      price: 2.5,
    },
    {
      id: 2,
      name: 'Amoxicillin',
      category: 'Antibiotics',
      stock: 200,
      minStock: 50,
      mfgDate: '2023-11-01',
      expDate: '2024-05-01',
      batchNo: 'BATCH002',
      manufacturer: 'XYZ Healthcare',
      supplier: 'ABC Distributors',
      tags: ['infection', 'antibiotics'],
      price: 5.75,
    },
  ]);

  const categories = [
    'All',
    'Analgesics',
    'Antibiotics',
    'Antacids',
    'Vitamins',
    'Others',
  ];

  const tags = [
    'fever',
    'headache',
    'pain',
    'infection',
    'stomach',
    'cold',
    'cough',
  ];

  const handleAddMedicine = () => {
    setInventory([
      ...inventory,
      {
        id: inventory.length + 1,
        ...newMedicine,
      },
    ]);
    setShowAddModal(false);
    setNewMedicine({
      name: '',
      category: '',
      mfgDate: '',
      expDate: '',
      batchNo: '',
      manufacturer: '',
      supplier: '',
      tags: [],
      stock: 0,
      minStock: 0,
      price: 0,
    });
  };

  const handleTagChange = (tag) => {
    const updatedTags = newMedicine.tags.includes(tag)
      ? newMedicine.tags.filter((t) => t !== tag)
      : [...newMedicine.tags, tag];
    setNewMedicine({ ...newMedicine, tags: updatedTags });
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
              {categories.map((category) => (
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
        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Medicine</h2>
              <div className="form-group">
                <label>Medicine Name</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newMedicine.category}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Manufacturing Date</label>
                  <input
                    type="date"
                    value={newMedicine.mfgDate}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, mfgDate: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    value={newMedicine.expDate}
                    onChange={(e) =>
                      setNewMedicine({ ...newMedicine, expDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Batch Number</label>
                <input
                  type="text"
                  value={newMedicine.batchNo}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, batchNo: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Manufacturer</label>
                <input
                  type="text"
                  value={newMedicine.manufacturer}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      manufacturer: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  value={newMedicine.supplier}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, supplier: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Tags</label>
                <div className="tags-container">
                  {tags.map((tag) => (
                    <label key={tag} className="tag-checkbox">
                      <input
                        type="checkbox"
                        checked={newMedicine.tags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Initial Stock</label>
                  <input
                    type="number"
                    value={newMedicine.stock}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Minimum Stock</label>
                  <input
                    type="number"
                    value={newMedicine.minStock}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        minStock: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={newMedicine.price}
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={handleAddMedicine}>Add Medicine</button>
                <button onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="inventory-stats">
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <h3>Total Items</h3>
            <p>{inventory.length}</p>
          </motion.div>
          <motion.div className="stat-card warning" whileHover={{ scale: 1.05 }}>
            <h3>Low Stock</h3>
            <p>
              {inventory.filter((item) => item.stock <= item.minStock).length}
            </p>
          </motion.div>
          <motion.div className="stat-card danger" whileHover={{ scale: 1.05 }}>
            <h3>Expiring Soon</h3>
            <p>
              {
                inventory.filter(
                  (item) =>
                    new Date(item.expDate) <= addDays(new Date(), 30)
                ).length
              }
            </p>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
            <h3>Total Value</h3>
            <p>
              ₹
              {inventory
                .reduce((sum, item) => sum + item.price * item.stock, 0)
                .toFixed(2)}
            </p>
          </motion.div>
        </div>

        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Batch No</th>
                <th>Mfg Date</th>
                <th>Exp Date</th>
                <th>Supplier</th>
                <th>Tags</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory
                .filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    (filterCategory === 'all' ||
                      item.category.toLowerCase() === filterCategory)
                )
                .map((item) => (
                  <tr
                    key={item.id}
                    className={item.stock <= item.minStock ? 'low-stock' : ''}
                  >
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td>{item.batchNo}</td>
                    <td>{item.mfgDate}</td>
                    <td>{item.expDate}</td>
                    <td>{item.supplier}</td>
                    <td>
                      <div className="tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>₹{item.price.toFixed(2)}</td>
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