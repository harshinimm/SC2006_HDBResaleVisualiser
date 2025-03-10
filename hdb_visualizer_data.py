import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import itertools

# Load the data
df = pd.read_csv("hdb_resale_prices_data.csv")

# Data cleaning
df.dropna(inplace=True)
df.drop_duplicates(inplace=True)
df['resale_price'] = pd.to_numeric(df['resale_price'], errors='coerce')
df['block'] = df['block'].astype(str)
df['month'] = pd.to_datetime(df['month'], errors='coerce')
df['month'] = df['month'].dt.strftime('%Y-%m')
df['remaining_lease'] = pd.to_datetime(df['month'], errors='coerce')
df['year'] = df['month'].str[:4].astype(int)

# Available towns for comparison
towns = ['ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH', 'BUKIT PANJANG', 
         'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG', 'CLEMENTI', 'GEYLANG', 'HOUGANG', 
         'JURONG EAST', 'JURONG WEST', 'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL', 
         'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES', 'TOA PAYOH', 'WOODLANDS', 
         'YISHUN']
print("Available towns for comparison: ")
print(", ".join(towns))

# User input for towns to compare
user_input = input("Enter the towns to compare, separated by a comma (e.g., 'GEYLANG, YISHUN'): ")

# Clean user input and split into two towns
user_towns = [town.strip().upper() for town in user_input.split(',')]

# Check if the user input is valid
if len(user_towns) == 2 and all(town in towns for town in user_towns):
    town1, town2 = user_towns
    print(f"Comparing yearly prices for {town1} and {town2}...")

    # Filter data for the selected towns
    df_filtered = df[df['town'].isin([town1, town2])]

    # Group the data by year and town and calculate the average resale price
    yearly_prices = df_filtered.groupby(['year', 'town'])['resale_price'].mean().reset_index()

    # Plot the line chart for the two towns' yearly prices
    plt.figure(figsize=(12, 6))
    sns.lineplot(data=yearly_prices, x='year', y='resale_price', hue='town', marker='o', palette='tab10')
    plt.title(f"Yearly Resale Prices Comparison: {town1} vs {town2}")
    plt.xlabel("Year")
    plt.ylabel("Average Resale Price")
    plt.legend(title="Town", loc='upper left')
    plt.grid(True)
    plt.show()

    # Price stats comparison
    price_stats = df_filtered.groupby(['town'])['resale_price'].agg(
        Mean='mean',
        Median='median',
        Mode=lambda x: x.mode()[0]  # Mode (most frequent)
    ).reset_index()

    price_stats_melted = price_stats.melt(id_vars='town', value_vars=['Mean', 'Median', 'Mode'], 
                                          var_name='Price Type', value_name='Resale Price')

    # Plotting price stats comparison for selected towns
    plt.figure(figsize=(10, 6))
    sns.barplot(x='town', y='Resale Price', hue='Price Type', data=price_stats_melted, palette="muted")
    plt.title(f"Price Comparison: {town1} vs {town2} (Mean, Median, Mode)")
    plt.xlabel("Town")
    plt.ylabel("Resale Price")
    plt.legend(title="Price Type")
    plt.show()

else:
    print("Invalid input. Please enter two valid towns from the list provided.")

# Yearly price stats for all towns
yearly_stats = df.groupby('year')['resale_price'].agg(['mean', 'median', lambda x: x.mode()[0], 'count'])
yearly_stats.columns = ['Mean Price', 'Median Price', 'Mode Price', 'Transaction Count']

mean_price = df['resale_price'].mean()
median_price = df['resale_price'].median()
mode_price = df['resale_price'].mode()[0]

print(f"Mean (Average) Resale Price: {mean_price:.2f}")
print(f"Median Resale Price: {median_price:.2f}")
print(f"Mode (Most Frequent) Resale Price: {mode_price:.2f}")

# Q1, Q3, IQR and outliers
Q1 = df['resale_price'].quantile(0.25)
Q3 = df['resale_price'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = df[(df['resale_price'] < lower_bound) | (df['resale_price'] > upper_bound)]
print(f"Number of outliers detected: {outliers.shape[0]}")
print(outliers[['month', 'town', 'flat_type', 'resale_price']])

# Display top 10 most frequent prices
price_counts = df['resale_price'].value_counts()
print("Displaying the top 10 highest prices")
print(price_counts.head(10))

# Boxplot for resale prices (detecting outliers and distribution)
plt.figure(figsize=(8, 4))
sns.boxplot(x=df['resale_price'])
plt.title("Boxplot of Resale Prices (Detecting Outliers)")
plt.show()

sns.kdeplot(df['resale_price'], linestyle="dashed", color="red")
plt.title("Dashed KDE Plot")
plt.show()

# Top 10 most expensive towns
top_towns = df.groupby('town')['resale_price'].mean().sort_values(ascending=False).head(10)
sns.barplot(x=top_towns.values, y=top_towns.index, hue=top_towns.index, palette="viridis", legend=False)
plt.title("Top 10 Most Expensive Towns (Avg Resale Price)")
plt.xlabel("Average Resale Price")
plt.ylabel("Town")
plt.show()

# Plot trend of mean and median resale prices over the years
plt.figure(figsize=(10, 5))
sns.lineplot(data=yearly_stats[['Mean Price', 'Median Price']])
plt.title("Yearly Trend of Resale Prices")
plt.xlabel("Year")
plt.ylabel("Price")
plt.legend(["Mean Price", "Median Price"])
plt.show()

# Bar plot of transaction count per year
plt.figure(figsize=(10, 5))
sns.barplot(x=yearly_stats.index, y=yearly_stats['Transaction Count'], palette="coolwarm")
plt.title("Number of Resale Transactions Per Year")
plt.xlabel("Year")
plt.ylabel("Number of Transactions")
plt.xticks(rotation=45)
plt.show()

# Violin plot for resale prices by flat type
plt.figure(figsize=(10, 6))
sns.violinplot(x='flat_type', y='resale_price', data=df, palette="muted")
plt.title("Violin Plot of Resale Prices by Room Type (Flat Type)")
plt.xlabel("Room Type (Flat Type)")
plt.ylabel("Resale Price")
plt.show()

# KDE plot for remaining lease
sns.kdeplot(x=df['remaining_lease'], linestyle='dashed', color='blue')
plt.title("KDE Plot of Remaining Lease (Detecting Outliers)")
plt.show()

# Yearly heatmap of the prices
pivot_table = df.pivot_table(values='resale_price', index='flat_type', columns='year', aggfunc='mean')
plt.figure(figsize=(12, 6))
sns.heatmap(pivot_table, cmap="coolwarm", annot=True, fmt=".0f")
plt.title("Heatmap of Average Resale Prices by Year & Flat Type")
plt.xlabel("Year")
plt.ylabel("Flat Type")
plt.show()

# Yearly price volatility
yearly_volatility = df.groupby('year')['resale_price'].std().reset_index()
plt.figure(figsize=(10, 5))
sns.lineplot(x='year', y='resale_price', data=yearly_volatility, marker='o', color='purple')
plt.title("Yearly Resale Price Volatility (Standard Deviation)")
plt.xlabel("Year")
plt.ylabel("Price Standard Deviation")
plt.grid(True)
plt.show()

# Most expensive and cheapest year
max_year = yearly_stats['Mean Price'].idxmax()
min_year = yearly_stats['Mean Price'].idxmin()
print(f"Most Expensive Year: {max_year} with an average resale price of {yearly_stats.loc[max_year, 'Mean Price']:.2f}")
print(f"Cheapest Year: {min_year} with an average resale price of {yearly_stats.loc[min_year, 'Mean Price']:.2f}")

# Yearly prices by flat type
plt.figure(figsize=(12, 6))
sns.lineplot(x='year', y='resale_price', hue='flat_type', data=df, estimator='mean', ci=None, palette="tab10")
plt.title("Yearly Trend of Resale Prices by Flat Type")
plt.xlabel("Year")
plt.ylabel("Average Resale Price")
plt.legend(title="Flat Type", bbox_to_anchor=(1.05, 1), loc='upper left')
plt.show()

# Rate at which the resale prices are changing
yearly_stats['Price Growth Rate (%)'] = yearly_stats['Mean Price'].pct_change() * 100
print(yearly_stats[['Mean Price', 'Price Growth Rate (%)']])

plt.figure(figsize=(10, 5))
sns.barplot(x=yearly_stats.index, y=yearly_stats['Price Growth Rate (%)'], palette="coolwarm")
plt.axhline(0, color='black', linestyle='dashed')
plt.title("Yearly Growth Rate of Resale Prices (%)")
plt.xlabel("Year")
plt.ylabel("Price Growth Rate (%)")
plt.show()

# Correlation matrix
corr_matrix = df[['resale_price', 'remaining_lease']].corr()
sns.heatmap(corr_matrix, annot=True, cmap="coolwarm", fmt=".2f", center=0)
plt.title("Correlation Matrix (Resale Price vs Remaining Lease)")
plt.show()



