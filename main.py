from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import numpy as np
import joblib

# Load the model and scaler
model = joblib.load('random_forest_model.pkl')  # Ensure this file exists in the directory
scaler = joblib.load('scaler.pkl')  # Ensure this file exists in the directory

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to avoid CORS issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static directory to serve HTML files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Define input data schema
class PredictionInput(BaseModel):
    feature1: float
    feature2: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the ML Model API"}

@app.post("/predict")
def predict(data: PredictionInput):
    try:
        # Extract features and scale them
        features = np.array([[data.feature1, data.feature2]])
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction = model.predict(scaled_features)

        # Return the prediction
        return {"prediction": int(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
