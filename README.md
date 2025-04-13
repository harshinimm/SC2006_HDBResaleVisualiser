Project Description:
The HDB Resale Price Visualizer is a full-stack, web-based analytics tool designed to assist HDB resale buyers, real estate analysts, and housing policy stakeholders in making data-informed decisions. Built with React for the frontend and CSV-based data integration on the backend, the system enables users to explore historical trends and gain actionable insights into Singapore’s HDB resale market.

💡 Core Features
📍 Google Maps Integration
Provides an intuitive spatial interface where users can visualize HDB locations by town and property type.

📊 Interactive Visualizations
Utilizes line charts and median trend graphs to show price fluctuations across years, flat types, and town zones.

🔍 Dynamic Filtering
Users can filter data in real-time based on criteria like town, flat model, storey range, or lease commencement year.

📁 CSV-Driven Insights
The application reads from a cleaned and structured CSV dataset sourced from government open data, transforming it into digestible visual feedback.

🧠 Technical Value Proposition
Client-Centric Decision Support:
Enables potential buyers to assess affordability and investment value before committing to a purchase.

Data Transparency:
Bridges the gap between raw data and consumer understanding through easy-to-interpret analytics.

Domain-Specific Visualization:
Tailored to urban housing dynamics, providing insights on property volatility, neighborhood trends, and median shifts.

🛠️ Behind the Scenes (Engineering Perspective)
Frontend:
Built with React, the UI ensures modularity, responsiveness, and ease of interaction.

Backend:
The CSV dataset acts as a pseudo-database, parsed and filtered in real time using JavaScript logic to serve relevant chart data.
Django REST Framework used to develop and connect backend API to support frontend functionalities such as retrieving data from CSV and adding User data.
SQlite.3 database utilised to store User data, with encryption on User password to improve security.

Chart Rendering:
Utilizes libraries such as Chart.js or Recharts to render responsive and animated visualizations.




