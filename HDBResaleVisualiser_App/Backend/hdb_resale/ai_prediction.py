import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def predict_prices_for_town(df, town, years=5, base_year=2025, flat_type=None):
    filtered_df = df[df['town'] == town.upper().strip()]
    
    if flat_type:
        filtered_df = filtered_df[filtered_df['flat_type'] == flat_type.upper().replace("-", " ")]

    if filtered_df.empty:
        return {"error": f"No data found for {town}"}

    # Group by year and get average
    yearly_avg = filtered_df.groupby('year')['resale_price'].mean().reset_index()

    if len(yearly_avg) < 3:
        return {"error": f"Not enough data to make prediction for {town}"}

    X = yearly_avg['year'].values.reshape(-1, 1)
    y = yearly_avg['resale_price'].values

    model = LinearRegression()
    model.fit(X, y)

    future_years = np.array([base_year + i for i in range(years)]).reshape(-1, 1)
    predicted_prices = model.predict(future_years)

    return {
        "town": town,
        "predictions": [
            {"year": int(year), "predicted_price": round(price, 2)}
            for year, price in zip(future_years.flatten(), predicted_prices)
        ]
    }

