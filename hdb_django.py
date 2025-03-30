from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "hdb_resale_prices_data.csv")
df = pd.read_csv(DATA_PATH)

df.dropna(inplace=True)
df.drop_duplicates(inplace=True)
df['resale_price'] = pd.to_numeric(df['resale_price'], errors='coerce')
df['month'] = pd.to_datetime(df['month'], errors='coerce')
df['year'] = df['month'].dt.year

def get_available_towns():
    return df['town'].unique().tolist()

@api_view(['GET'])
def available_towns(request):
    towns = get_available_towns()
    return Response({"towns": towns})

@api_view(['GET'])
def resale_analysis(request):
    towns = request.GET.getlist('towns')
    analysis_type = request.GET.get('type')
    
    df_filtered = df[df['town'].isin(towns)]
    
    if analysis_type == 'price_trends':
        result = df_filtered.groupby(['year', 'town'])['resale_price'].mean().reset_index()
    elif analysis_type == 'volatility':
        result = df_filtered.groupby(['year', 'town'])['resale_price'].std().reset_index()
    else:
        return Response({"error": "Invalid analysis type"}, status=400)
    
    return Response(result.to_dict(orient='records'))
