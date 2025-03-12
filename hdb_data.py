import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("hdb_resale_prices_data.csv")
df.dropna(inplace=True)
df.drop_duplicates(inplace=True)
df['resale_price'] = pd.to_numeric(df['resale_price'], errors='coerce')
df['block'] = df['block'].astype(str)
df['month'] = pd.to_datetime(df['month'], errors='coerce')
df['year'] = df['month'].dt.year
towns = df['town'].unique().tolist()
print("Available towns for comparison:")
print(", ".join(towns))
user_input = input("Enter the towns to compare, separated by a comma: ")
user_towns = [town.strip().upper() for town in user_input.split(',')]
valid_towns = [town for town in user_towns if town in towns]
if not valid_towns:
    print("Invalid input. Please enter valid towns from the list provided.")
    exit()
df_filtered = df[df['town'].isin(valid_towns)]

while True:
    print("Select the data you want to analyze:")
    print("1: Average Price Trends")
    print("2: Most Expensive and Cheapest Year")
    print("3: Price Volatility")
    print("4: Number of Transactions Per Year")
    print("5: Exit")
    option = input("Enter the number corresponding to your choice: ")

    if option == '1':
        yearly_prices = df_filtered.groupby(['year', 'town'])['resale_price'].mean().reset_index()
        plt.figure(figsize=(12, 6))
        sns.lineplot(data=yearly_prices, x='year', y='resale_price', hue='town', marker='o', palette='tab10')
        plt.title(f"Yearly Resale Prices Comparison for Selected Towns")
        plt.xlabel("Year")
        plt.ylabel("Average Resale Price")
        plt.legend(title="Town", loc='upper left')
        plt.grid(True)
        plt.show()
    elif option == '2':
        yearly_prices = df_filtered.groupby(['year', 'town'])['resale_price'].mean().reset_index()
        most_expensive = yearly_prices.loc[yearly_prices.groupby('town')['resale_price'].idxmax()]
        cheapest = yearly_prices.loc[yearly_prices.groupby('town')['resale_price'].idxmin()]
        print("Most Expensive Year for Each Selected Town:")
        print(most_expensive[['town', 'year', 'resale_price']])
        print("Cheapest Year for Each Selected Town:")
        print(cheapest[['town', 'year', 'resale_price']])
    elif option == '3':
        volatility = df_filtered.groupby(['year', 'town'])['resale_price'].std().reset_index()
        plt.figure(figsize=(12, 6))
        sns.lineplot(data=volatility, x='year', y='resale_price', hue='town', marker='o', palette='tab10')
        plt.title(f"Price Volatility Over Years for Selected Towns")
        plt.xlabel("Year")
        plt.ylabel("Price Volatility (Standard Deviation)")
        plt.legend(title="Town", loc='upper left')
        plt.grid(True)
        plt.show()
    elif option == '4':
        transactions = df_filtered.groupby(['year', 'town']).size().reset_index(name='transaction_count')
        plt.figure(figsize=(12, 6))
        sns.barplot(data=transactions, x='year', y='transaction_count', hue='town', palette='tab10')
        plt.title(f"Number of Transactions Per Year for Selected Towns")
        plt.xlabel("Year")
        plt.ylabel("Number of Transactions")
        plt.legend(title="Town", loc='upper left')
        plt.grid(True)
        plt.show()
    elif option == '5':
        break
    else:
        print("Invalid option selected.")
