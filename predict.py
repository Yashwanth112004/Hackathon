from telethon import TelegramClient
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import pandas as pd
import requests
import plotly.graph_objs as go
from dash import Dash, dcc, html, Input, Output
from threading import Thread

# Telegram API credentials
API_ID = '23210104'  # Replace with your API ID
API_HASH = '256e5fb02b6b9c70721e3be279efe828'  # Replace with your API HASH
TELEGRAM_BOT_TOKEN = '8000459448:AAGFHDICyNkZuMZGrvv9iUl7pktLKyZuvCc'  # Replace with your bot token
TELEGRAM_CHANNEL = '@cryptotrading'  # Correct channel username

# Create a TelegramClient using Telethon
client = TelegramClient('bot_session', API_ID, API_HASH)

# Initialize the CryptoCompare API
def fetch_crypto_data():
    url = f"https://min-api.cryptocompare.com/data/v2/news/?api_key=442d12895ae23cbad7fa642562f657409f773022bcab42ac6c901580ebbb6fe6"
    response = requests.get(url)
    if response.status_code == 200:
        news_data = response.json()
        return news_data['Data']
    else:
        print("Error fetching cryptocurrency data.")
        return []

# Store Telegram Messages
telegram_messages = []

# Fetch Telegram messages using Telethon
async def fetch_telegram_messages():
    global telegram_messages
    try:
        async for message in client.iter_messages(TELEGRAM_CHANNEL, limit=500):  # Limit can be adjusted
            if message.text:
                telegram_messages.append({'text': message.text, 'created_at': message.date})
    except Exception as e:
        print(f"Error fetching messages from Telegram: {e}")

# Combine Data
def aggregate_data(crypto_data, telegram_data):
    df_crypto = pd.DataFrame(crypto_data)
    df_telegram = pd.DataFrame(telegram_data)
    df = pd.concat([df_crypto, df_telegram], ignore_index=True)
    return df

# Initialize Telegram Bot
def start(update, context):
    update.message.reply_text("Bot started! I'm here to fetch cryptocurrency and telegram messages.")

# Telegram Bot Updater
updater = Updater(TELEGRAM_BOT_TOKEN, use_context=True)
dispatcher = updater.dispatcher
dispatcher.add_handler(CommandHandler("start", start))

# Live Chart with Dash
app = Dash(__name__)

app.layout = html.Div([
    html.H1("Live Cryptocurrency Mentions"),
    dcc.Interval(id='interval-update', interval=60000, n_intervals=0),  # Auto-refresh every minute
    dcc.Graph(id='live-chart'),
])

@app.callback(
    Output('live-chart', 'figure'),
    [Input('interval-update', 'n_intervals')]
)
def update_chart(n_intervals):
    try:
        # Fetch Crypto Data
        crypto_data = fetch_crypto_data()
        
        # Fetch Telegram Data
        telegram_data = telegram_messages  # Using the globally stored messages
        
        # Combine Data
        df = aggregate_data(crypto_data, telegram_data)

        if df.empty:
            return go.Figure().update_layout(
                title="No data available",
                xaxis_title="Time (hour)",
                yaxis_title="Mentions"
            )

        # Process data
        df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')
        df['hour'] = df['created_at'].dt.hour
        mentions = df.groupby('hour').size()

        # Create Live Chart
        figure = go.Figure()
        figure.add_trace(go.Scatter(x=mentions.index, y=mentions.values, mode='lines+markers'))
        figure.update_layout(
            title="Live Mentions Over Time",
            xaxis_title="Time (hour)",
            yaxis_title="Mentions"
        )
        return figure
    except Exception as e:
        print(f"Error in update_chart: {e}")
        return go.Figure().update_layout(
            title="Error occurred while updating chart",
            xaxis_title="Time (hour)",
            yaxis_title="Mentions"
        )

# Start the Telegram client in a separate thread
def start_telegram_client():
    client.start()
    client.loop.run_until_complete(fetch_telegram_messages())

# Run the Dash server and Telegram client concurrently
if __name__ == '__main__':
    # Start the Telegram client in a separate thread
    telegram_thread = Thread(target=start_telegram_client)
    telegram_thread.start()
    
    # Start the Dash app
    app.run_server(debug=True)
