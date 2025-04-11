from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .ai_prediction import predict_prices_for_town
import pandas as pd
import os
import json

# Path to the CSV file (adjust if it's in /data folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "hdb_resale_prices_data.csv")  # Adjust path if needed

# Load and prepare data
if not os.path.exists(DATA_FILE):
    raise FileNotFoundError("Data file not found. Ensure 'hdb_resale_prices_data.csv' is available.")

df = pd.read_csv(DATA_FILE)
df.dropna(inplace=True)
df.drop_duplicates(inplace=True)
df['resale_price'] = pd.to_numeric(df['resale_price'], errors='coerce')
df['month'] = pd.to_datetime(df['month'], errors='coerce')
df['year'] = df['month'].dt.year
df['town'] = df['town'].str.upper()
df['flat_type'] = df['flat_type'].str.upper()

@api_view(['GET'])
def get_towns(request):
    towns = df['town'].unique().tolist()
    return Response({'towns': towns}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_years(request):
    years = df['year'].unique().tolist()
    return Response({'years': sorted(years)}, status=status.HTTP_200_OK)

@api_view(['GET'])
def resale_analysis(request):
    towns = request.GET.getlist('towns')
    analysis_type = request.GET.get('type', 'price_trends')
    start_year = request.GET.get('start_year')
    end_year = request.GET.get('end_year')
    room_type = request.GET.get('room_type')  # Optional

    if not towns:
        return Response({'error': 'No towns selected'}, status=status.HTTP_400_BAD_REQUEST)

    filtered_df = df[df['town'].isin([t.upper() for t in towns])]

    if room_type:
        filtered_df = filtered_df[filtered_df['flat_type'] == room_type.upper().strip().replace("-", " ")]

    if start_year and end_year:
        filtered_df = filtered_df[
            (filtered_df['year'] >= int(start_year)) & 
            (filtered_df['year'] <= int(end_year))
        ]

    print("📊 Filtered Data Preview:")
    print(filtered_df.head())

    if filtered_df.empty:
        return Response([], status=status.HTTP_200_OK)

    if analysis_type == "price_trends":
        if room_type:
            # Multi-district, single room type → group by town
            result = filtered_df.groupby(['town', 'year'])['resale_price'].mean().reset_index()
        else:
            # Single district, multiple room types → group by flat_type
            result = filtered_df.groupby(['flat_type', 'year'])['resale_price'].mean().reset_index()

    elif analysis_type == "volatility":
        result = filtered_df.groupby(['town', 'year'])['resale_price'].std().reset_index()

    else:
        return Response({'error': 'Invalid analysis type.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(result.to_dict(orient='records'), status=status.HTTP_200_OK)


@api_view(['GET'])
def resale_comparison(request):
    towns = request.GET.getlist('towns')
    start_month = request.GET.get('start_year')  # It's actually full YYYY-MM now
    end_month = request.GET.get('end_year')

    if not towns or not start_month or not end_month:
        return Response({'error': 'Missing required parameters.'}, status=status.HTTP_400_BAD_REQUEST)

    # Convert to datetime
    try:
        start_date = pd.to_datetime(start_month)
        end_date = pd.to_datetime(end_month)
    except ValueError:
        return Response({'error': 'Invalid date format. Use YYYY-MM.'}, status=status.HTTP_400_BAD_REQUEST)

    # Filter based on new month column
    filtered_df = df[
        (df['town'].isin([t.upper() for t in towns])) &
        (df['month'] >= start_date) &
        (df['month'] <= end_date)
    ]

    print("📊 resale_comparison - Filtered Data:")
    print(filtered_df[["month", "town", "resale_price"]].head())

    if filtered_df.empty:
        return Response([], status=status.HTTP_200_OK)

    result = (
        filtered_df.groupby('town')['resale_price']
        .mean()
        .reset_index()
        .rename(columns={'resale_price': 'avg_price'})
    )

    return Response(result.to_dict(orient='records'), status=status.HTTP_200_OK)

@api_view(['GET'])
def comparison_graph(request):
    towns = request.GET.getlist('towns')
    start_month = request.GET.get('start_year')  # Expected: YYYY-MM
    end_month = request.GET.get('end_year')      # Expected: YYYY-MM
    interval = request.GET.get('interval', 'month')  # Optional: 'month' (default) or 'year'

    if not towns or not start_month or not end_month:
        return Response({'error': 'Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        start_date = pd.to_datetime(start_month)
        end_date = pd.to_datetime(end_month)
    except ValueError:
        return Response({'error': 'Invalid date format. Use YYYY-MM.'}, status=status.HTTP_400_BAD_REQUEST)

    # Filter data based on user selection
    filtered_df = df[
        (df['town'].isin([t.upper() for t in towns])) &
        (df['month'] >= start_date) &
        (df['month'] <= end_date)
    ]

    if filtered_df.empty:
        return Response([], status=status.HTTP_200_OK)

    # Add a time period column (month or year)
    if interval == 'year':
        filtered_df['period'] = filtered_df['month'].dt.year.astype(str)
    else:
        filtered_df['period'] = filtered_df['month'].dt.to_period('M').astype(str)

    # Group by period and town, compute average resale price
    grouped = (
        filtered_df.groupby(['period', 'town'])['resale_price']
        .mean()
        .reset_index()
        .rename(columns={'period': 'date', 'resale_price': 'avg_price'})
    )

    # Return as JSON
    return Response(grouped.to_dict(orient='records'), status=status.HTTP_200_OK)

@api_view(['GET'])
def resale_roomtype_trends(request):
    print("🔍 API HIT: resale_roomtype_trends🔥🔥🔥")
    town = request.GET.get('town')
    start_year = request.GET.get('start_year')
    end_year = request.GET.get('end_year')
    if not town:
        return Response({'error': 'Missing town parameter.'}, status=status.HTTP_400_BAD_REQUEST)

    # Filter for the selected town
    filtered_df = df[df['town'] == town.upper()]

    # Filter by year range if provided
    if start_year and end_year:
        filtered_df = filtered_df[
            (filtered_df['year'] >= int(start_year)) & 
            (filtered_df['year'] <= int(end_year))
        ]
    print("📊 Filtered Data Preview:")
    print(filtered_df.head())

    if filtered_df.empty:
        return Response([], status=status.HTTP_200_OK)
    

    # Group by year and room type, get average resale price
    result = (
        filtered_df.groupby(['year', 'flat_type'])['resale_price']
        .mean()
        .reset_index()
        .rename(columns={'resale_price': 'avg_price'})
        .sort_values(['year', 'flat_type'])
    )

    print("📈 Grouped Average Prices by Room Type:")
    for flat_type in result['flat_type'].unique():
        print(f"\n🏠 {flat_type}")
        flat_group = result[result['flat_type'] == flat_type]
        for _, row in flat_group.iterrows():
            print(f"  Year {int(row['year'])}: ${int(row['avg_price']):,}")

    return Response(result.to_dict(orient='records'), status=status.HTTP_200_OK)

@api_view(['GET'])
def raw_data_by_town(request):
    town = request.GET.get('town')
    room_type = request.GET.get('room_type')

    print("🚨 API Endpoint Hit: /api/resale/raw_data_by_town")
    print(f"📥 Received parameters: town={town}, room_type={room_type}")

    if not town:
        print("❌ Missing required parameter: town.")
        return Response({'error': 'Missing required parameter (town).'}, status=status.HTTP_400_BAD_REQUEST)

    start_date = pd.to_datetime('2017-01')
    end_date = pd.to_datetime('2025-12')

    filtered_df = df[
        (df['town'] == town.upper()) &
        (df['month'] >= start_date) &
        (df['month'] <= end_date)
    ]

    if room_type:
        filtered_df = filtered_df[filtered_df['flat_type'].str.upper() == room_type.upper()]

    print(f"🔎 Filtered {len(filtered_df)} records for town={town.upper()}, room_type={room_type or 'Any'}")
    print(filtered_df[["month", "block", "street_name", "flat_type", "resale_price"]].head())

    if filtered_df.empty:
        print("⚠️ No matching records found.")
        return Response([], status=status.HTTP_200_OK)
    
    filtered_df['month'] = filtered_df['month'].dt.strftime('%Y-%m')

    return Response(filtered_df.to_dict(orient='records'), status=status.HTTP_200_OK)

@api_view(['GET'])
def ai_price_prediction(request):
    town = request.GET.get('town')
    flat_type = request.GET.get('flat_type')

    if not town:
        return Response({'error': 'Missing required parameter: town'}, status=status.HTTP_400_BAD_REQUEST)

    result = predict_prices_for_town(df, town, years=5, base_year=2025, flat_type=flat_type)
    print(f"🔍 API Request: town={town}, flat_type={flat_type}")
    print("📤 Data sent to frontend:", json.dumps(result, indent=2))  # Pretty print JSON
    if "error" in result:
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    return Response(result, status=status.HTTP_200_OK)