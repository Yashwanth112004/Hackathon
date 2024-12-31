import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
dataset = pd.read_csv("Social_Network_Ads.csv")

# Prepare data
X = dataset.iloc[:, [2, 3]].values
Y = dataset.iloc[:, 4].values
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)

# Scale features
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=300, criterion='entropy', random_state=0)
model.fit(X_train, Y_train)

# Save model and scaler
joblib.dump(model, 'random_forest_model.pkl')
joblib.dump(sc_X, 'scaler.pkl')

print("Model and scaler saved successfully.")
