# 🏠 HDB Resale Price Visualizer – Data Analysis Script

This Python script is a **command-line-based data analysis tool** for visualizing **HDB resale price trends** across different towns in Singapore. Powered by `pandas`, `seaborn`, and `matplotlib`, it provides a flexible way to explore resale price insights such as trend comparisons, price volatility, and transaction frequencies.

---

## 🔍 Features

- 📈 **Average Price Trends by Town and Year**
- 🏆 **Most Expensive and Cheapest Years** per town
- 📉 **Price Volatility (Standard Deviation)**
- 📊 **Number of Transactions Per Year**
- 🎯 **Interactive Town Selection**
- ✅ **Cleaned Dataset Handling** (NaN & duplicates removed)

---

## 🧑‍💻 Tech Stack

- **Python 3.8+**
- **pandas** – data wrangling
- **seaborn & matplotlib** – data visualization
- **NumPy** – numerical ops

---

## 📦 Dataset

- The script uses an HDB resale dataset in `.csv` format.
- Make sure the file is named: `hdb_resale_prices_data.csv`
- Columns expected include:  
  `month`, `town`, `flat_type`, `block`, `resale_price`, etc.

> 📁 Place the CSV file in the **same directory** as the script.

---

## 🚀 How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hdb-resale-visualizer.git
   cd hdb-resale-visualizer

